# =========================================================================================
# koomRo - Seven-Method AI Music Risk Detector
# Triplet Metric Learning Training Pipeline (GPU / CPU)
# Author: Sayema Fatema Jahan
# Institution: Presidency University | Student ID: 232044038
#
# Why I built this:
# In my thesis, I train my 7-Signal Multi-Branch Network using Triplet Margin Loss:
#   - Anchor: Original Master Recording
#   - Positive: Plagiarized / Covered / Pitch-Shifted / Sampled version of the Anchor
#   - Negative: Completely Unrelated Song
# This teaches my network to minimize the distance between derivative works while maximizing
# the distance to unrelated tracks.
# =========================================================================================

import os
import glob
import random
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import librosa
from signal_extractor import MultiSignalAudioExtractor
from model import MultiSignalFusionNet

BASE_DATA_DIR = os.path.join(os.path.dirname(__file__), "data", "raw_audio")
ANCHOR_DIR = os.path.join(BASE_DATA_DIR, "anchors_original")
POSITIVE_DIR = os.path.join(BASE_DATA_DIR, "positives_modified")
NEGATIVE_DIR = os.path.join(BASE_DATA_DIR, "negatives_unrelated")
REFERENCE_DIR = os.path.join(BASE_DATA_DIR, "reference_tracks")
CHECKPOINT_DIR = os.path.join(os.path.dirname(__file__), "checkpoints")

class ExplicitTripletDataset(Dataset):
    """
    I load explicitly separated audio files from my folders:
    - anchors_original/
    - positives_modified/
    - negatives_unrelated/
    """
    def __init__(self, anchor_files, positive_files, negative_files, extractor):
        self.anchors = anchor_files
        self.positives = positive_files
        self.negatives = negative_files
        self.extractor = extractor

    def __len__(self):
        return len(self.anchors)

    def __getitem__(self, idx):
        a_path = self.anchors[idx % len(self.anchors)]
        p_path = self.positives[idx % len(self.positives)]
        n_path = random.choice(self.negatives)

        a_sig = self.extractor.extract_all_signals(a_path)
        p_sig = self.extractor.extract_all_signals(p_path)
        n_sig = self.extractor.extract_all_signals(n_path)

        return a_sig, p_sig, n_sig

class AutoAugmentAudioDataset(Dataset):
    """
    If I haven't manually created modified songs, this dataset automatically synthesizes
    plagiarized variations of my original tracks via pitch-shifting and time-stretching.
    """
    def __init__(self, audio_files, extractor, samples_per_epoch=50):
        self.audio_files = audio_files
        self.extractor = extractor
        self.samples_per_epoch = samples_per_epoch

    def __len__(self):
        return self.samples_per_epoch

    def _augment(self, y, sr):
        choice = random.random()
        if choice < 0.33:
            # I simulate key transposition / pitch shifting (+/- 1.5 semitones)
            n_steps = random.uniform(-1.5, 1.5)
            return librosa.effects.pitch_shift(y=y, sr=sr, n_steps=n_steps)
        elif choice < 0.66:
            # I simulate tempo warping (speed altered by +/- 10%)
            rate = random.uniform(0.9, 1.1)
            return librosa.effects.time_stretch(y=y, rate=rate)
        else:
            # I inject background acoustic noise
            noise = np.random.randn(len(y)) * 0.005
            return y + noise

    def _extract_signals_from_waveform(self, y, sr):
        target_len = int(sr * self.extractor.duration)
        if len(y) < target_len:
            y = np.pad(y, (0, target_len - len(y)), mode='constant')
        else:
            y = y[:target_len]
        max_val = np.max(np.abs(y))
        if max_val > 0:
            y = y / max_val

        chroma = librosa.feature.chroma_cqt(y=y, sr=sr, n_chroma=12)
        mel_spec = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=self.extractor.n_mels)
        mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)
        mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=self.extractor.n_mfcc)
        onset_env = librosa.onset.onset_strength(y=y, sr=sr)
        tempogram = librosa.feature.tempogram(onset_envelope=onset_env, sr=sr)
        tonnetz = librosa.feature.tonnetz(y=y, sr=sr)
        contrast = librosa.feature.spectral_contrast(y=y, sr=sr)

        return {
            "chroma": torch.tensor(chroma, dtype=torch.float32).unsqueeze(0),
            "mel_spec": torch.tensor(mel_spec_db, dtype=torch.float32).unsqueeze(0),
            "mfcc": torch.tensor(mfcc, dtype=torch.float32).unsqueeze(0),
            "tempogram": torch.tensor(tempogram, dtype=torch.float32).unsqueeze(0),
            "tonnetz": torch.tensor(tonnetz, dtype=torch.float32).unsqueeze(0),
            "contrast": torch.tensor(contrast, dtype=torch.float32).unsqueeze(0)
        }

    def __getitem__(self, idx):
        anchor_path = random.choice(self.audio_files)
        y_anchor, sr = librosa.load(anchor_path, sr=self.extractor.sr, mono=True, duration=self.extractor.duration)

        other_files = [f for f in self.audio_files if f != anchor_path]
        neg_path = random.choice(other_files) if other_files else anchor_path
        y_neg, _ = librosa.load(neg_path, sr=self.extractor.sr, mono=True, duration=self.extractor.duration)

        y_pos = self._augment(y_anchor.copy(), sr)

        return (
            self._extract_signals_from_waveform(y_anchor, sr),
            self._extract_signals_from_waveform(y_pos, sr),
            self._extract_signals_from_waveform(y_neg, sr)
        )

def get_audio_files(directory):
    extensions = ("*.mp3", "*.wav", "*.flac", "*.ogg", "*.m4a")
    files = []
    for ext in extensions:
        files.extend(glob.glob(os.path.join(directory, ext)))
    return files

def train_koomro_model(epochs=5, batch_size=2):
    """
    I initiate training on GPU (CUDA) or CPU.
    """
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print("=" * 70)
    print("koomRo - AI MUSIC RISK DETECTOR TRAINING PIPELINE")
    print("Author: Sayema Fatema Jahan | Presidency University (ID: 232044038)")
    print("=" * 70)
    print(f"TRAINING HARDWARE: {device}")
    if torch.cuda.is_available():
        print(f"  GPU Name: {torch.cuda.get_device_name(0)}")
        print(f"  CUDA Compute Capability: {torch.cuda.get_device_capability(0)}")
    else:
        print("  Torch running on CPU. (Lightweight 484K parameter model runs smoothly on CPU)")

    extractor = MultiSignalAudioExtractor()

    # 1. Check if user provided explicit triplet folders
    anchors = get_audio_files(ANCHOR_DIR)
    positives = get_audio_files(POSITIVE_DIR)
    negatives = get_audio_files(NEGATIVE_DIR)
    reference = get_audio_files(REFERENCE_DIR)

    if anchors and positives and negatives:
        print(f"Dataset Mode: EXPLICIT TRIPLETS FOUND ({len(anchors)} anchors, {len(positives)} positives, {len(negatives)} negatives)")
        dataset = ExplicitTripletDataset(anchors, positives, negatives, extractor)
    else:
        # Fallback to pool of audio files + automatic data augmentation
        pool = anchors + reference
        if len(pool) < 2:
            print("\nCANNOT TRAIN YET: Insufficient audio files found!")
            print("Please insert audio files into either:")
            print(f"  1. Explicit Triplet Folders:\n     - Anchors:   {ANCHOR_DIR}\n     - Positives: {POSITIVE_DIR}\n     - Negatives: {NEGATIVE_DIR}")
            print(f"  2. Or Reference Catalog:\n     - Catalog:   {REFERENCE_DIR}")
            print("\nDrop at least 2 .mp3 or .wav songs into any of these folders and re-run!")
            print("=" * 70)
            return

        print(f"Dataset Mode: AUTO-AUGMENTATION on {len(pool)} available track(s)")
        dataset = AutoAugmentAudioDataset(pool, extractor, samples_per_epoch=20)

    dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)
    model = MultiSignalFusionNet(embedding_dim=256).to(device)
    optimizer = optim.AdamW(model.parameters(), lr=1e-4, weight_decay=1e-4)
    criterion = nn.TripletMarginLoss(margin=0.3, p=2)

    os.makedirs(CHECKPOINT_DIR, exist_ok=True)
    print(f"\nStarting {epochs} training epochs...")
    for epoch in range(1, epochs + 1):
        model.train()
        total_loss = 0.0

        for a_batch, p_batch, n_batch in dataloader:
            optimizer.zero_grad()
            for k in a_batch:
                a_batch[k] = a_batch[k].to(device)
                p_batch[k] = p_batch[k].to(device)
                n_batch[k] = n_batch[k].to(device)

            a_emb = model(a_batch)["master_embedding"]
            p_emb = model(p_batch)["master_embedding"]
            n_emb = model(n_batch)["master_embedding"]

            loss = criterion(a_emb, p_emb, n_emb)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()

        avg_loss = total_loss / max(1, len(dataloader))
        print(f"Epoch [{epoch}/{epochs}] - Triplet Margin Loss: {avg_loss:.4f}")

    checkpoint_file = os.path.join(CHECKPOINT_DIR, "best_model.pt")
    torch.save(model.state_dict(), checkpoint_file)
    print("=" * 70)
    print(f"TRAINING COMPLETE! Model weights saved to: {checkpoint_file}")
    print("=" * 70)

if __name__ == "__main__":
    train_koomro_model(epochs=5, batch_size=2)
