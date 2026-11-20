import os
import json
import glob
import numpy as np
import torch
import librosa
from signal_extractor import MultiSignalAudioExtractor
from model import MultiSignalFusionNet

AUDIO_DIR = os.path.join(os.path.dirname(__file__), "data", "raw_audio", "reference_tracks")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "data", "precomputed")

def index_all_reference_tracks():
    """
    Scans the reference_tracks folder, extracts the 7 signals for each audio file,
    computes their 256-D AI embeddings, and saves them for fast (sub-millisecond) retrieval.
    """
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Supported audio extensions
    extensions = ("*.mp3", "*.wav", "*.flac", "*.ogg", "*.m4a")
    audio_files = []
    for ext in extensions:
        audio_files.extend(glob.glob(os.path.join(AUDIO_DIR, ext)))

    if not audio_files:
        print("=" * 60)
        print("NO AUDIO FILES FOUND YET!")
        print(f"Drop your .mp3 or .wav reference songs into:\n  {AUDIO_DIR}")
        print("Then run this script again: python index_catalog.py")
        print("=" * 60)
        return

    print(f"Found {len(audio_files)} audio file(s) to index. Initializing AI engine...")
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    extractor = MultiSignalAudioExtractor()
    model = MultiSignalFusionNet().to(device)
    model.eval()

    embeddings_list = []
    metadata_list = []

    for idx, filepath in enumerate(audio_files, 1):
        filename = os.path.basename(filepath)
        print(f"[{idx}/{len(audio_files)}] Processing: {filename}...")

        try:
            # 1. Extract 6 acoustic signals
            signals = extractor.extract_all_signals(filepath)
            for k in signals:
                signals[k] = signals[k].unsqueeze(0).to(device)

            # 2. Compute 7th method (master embedding)
            with torch.no_grad():
                out = model(signals)
                master_vec = out["master_embedding"].cpu().numpy().flatten()

            embeddings_list.append(master_vec)

            # 3. Quick metadata estimation (duration, bpm)
            duration = librosa.get_duration(path=filepath)
            
            # Use filename as title, e.g., "ayub_bachchu_shei_tumi.mp3" -> "Ayub Bachchu Shei Tumi"
            clean_title = os.path.splitext(filename)[0].replace("_", " ").title()

            metadata_list.append({
                "id": f"REF_{idx:04d}",
                "filename": filename,
                "title": clean_title,
                "duration_seconds": round(duration, 2),
                "filepath": filepath
            })
        except Exception as e:
            print(f"  Error processing {filename}: {e}")

    if embeddings_list:
        # Save embeddings matrix as NumPy binary (.npy)
        embeddings_matrix = np.array(embeddings_list, dtype=np.float32)
        emb_path = os.path.join(OUTPUT_DIR, "embeddings.npy")
        np.save(emb_path, embeddings_matrix)

        # Save metadata as JSON
        meta_path = os.path.join(OUTPUT_DIR, "catalog_metadata.json")
        with open(meta_path, "w", encoding="utf-8") as f:
            json.dump(metadata_list, f, indent=2)

        print("=" * 60)
        print(f"SUCCESS: Successfully indexed {len(metadata_list)} track(s)!")
        print(f"Embeddings saved to: {emb_path} (Shape: {embeddings_matrix.shape})")
        print(f"Metadata saved to:   {meta_path}")
        print("=" * 60)

if __name__ == "__main__":
    index_all_reference_tracks()
