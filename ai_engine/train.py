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

AUDIO_DIR = os.path.join(os.path.dirname(__file__), "data", "raw_audio", "reference_tracks")
CHECKPOINT_DIR = os.path.join(os.path.dirname(__file__), "checkpoints")

class AutoAugmentAudioDataset(Dataset):
    """
    Automated Triplet Dataset for Copyright Detection Training:
    - Anchor: Original audio track
    - Positive: Synthesized plagiarized sample (pitch shifted +/- 2 semitones, time stretched, or noise injected)
    - Negative: A completely different track from the catalog
    """
    def __init__(self, audio_files, extractor, samples_per_epoch=50):
        self.audio_files = audio_files
        self.extractor = extractor
        self.samples_per_epoch = samples_per_epoch

    def __len__(self):
        return self.samples_per_epoch

    def _augment(self, y, sr):
        """Applies realistic copyright-evasion augmentations."""
        choice = random.random()
        if choice < 0.33:
            # Pitch shift (+/- 1.5 semitones)
            n_steps = random.uniform(-1.5, 1.5)
            return librosa.effects.pitch_shift(y=y, sr=sr, n_steps=n_steps)
        elif choice < 0.66:
            # Time stretch (tempo altered by 5-10%)
            rate = random.uniform(0.9, 1.1)
            return librosa.effects.time_stretch(y=y, rate=rate)
        else:
            # Add subtle acoustic background noise
            noise = np.random.randn(len(y)) * 0.005
            return y + noise

    def _extract_signals_from_waveform(self, y, sr):
        # Trim or pad to fixed duration
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
        # 1. Pick anchor
        anchor_path = random.choice(self.audio_files)
        y_anchor, sr = librosa.load(anchor_path, sr=self.extractor.sr, mono=True, duration=self.extractor.duration)

        # 2. Pick negative (must be a different song)
        other_files = [f for f in self.audio_files if f != anchor_path]
        neg_path = random.choice(other_files) if other_files else anchor_path
        y_neg, _ = librosa.load(neg_path, sr=self.extractor.sr, mono=True, duration=self.extractor.duration)

        # 3. Create positive by augmenting anchor
        y_pos = self._augment(y_anchor.copy(), sr)

        return (
            self._extract_signals_from_waveform(y_anchor, sr),
            self._extract_signals_from_waveform(y_pos, sr),
            self._extract_signals_from_waveform(y_neg, sr)
        )

def train_model(epochs=10, batch_size=4):
    extensions = ("*.mp3", "*.wav", "*.flac", "*.ogg")
    audio_files = []
    for ext in extensions:
        audio_files.extend(glob.glob(os.path.join(AUDIO_DIR, ext)))

    if len(audio_files) < 2:
        print("=" * 65)
        print("CANNOT TRAIN YET: NEED AT LEAST 2 AUDIO FILES!")
        print(f"Drop at least 2 .mp3 or .wav songs into:\n  {AUDIO_DIR}")
        print("Why? Training requires comparing songs against each other!")
        print("=" * 65)
        return

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print("=" * 65)
    print(f"TRAINING DEVICE: {device}")
    if device.type == "cpu":
        print("  (Running on CPU. Model has only 484K params, perfectly fine for CPU!)")
    print(f"FOUND {len(audio_files)} REFERENCE TRACKS FOR TRAINING.")
    print("=" * 65)

    extractor = MultiSignalAudioExtractor()
    dataset = AutoAugmentAudioDataset(audio_files, extractor, samples_per_epoch=20)
    dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

    model = MultiSignalFusionNet(embedding_dim=256).to(device)
    optimizer = optim.AdamW(model.parameters(), lr=1e-4, weight_decay=1e-4)
    criterion = nn.TripletMarginLoss(margin=0.3, p=2)

    os.makedirs(CHECKPOINT_DIR, exist_ok=True)
    best_loss = float("inf")

    print(f"Starting training for {epochs} epochs...")
    for epoch in range(1, epochs + 1):
        model.train()
        epoch_loss = 0.0

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
            epoch_loss += loss.item()

        avg_loss = epoch_loss / max(1, len(dataloader))
        print(f"Epoch [{epoch}/{epochs}] - Triplet Margin Loss: {avg_loss:.4f}")

        # Save checkpoint
        checkpoint_path = os.path.join(CHECKPOINT_DIR, "best_model.pt")
        torch.save(model.state_dict(), checkpoint_path)

    print("=" * 65)
    print(f"TRAINING COMPLETE! Model weights saved to: {checkpoint_path}")
    print("=" * 65)

if __name__ == "__main__":
    train_model(epochs=5, batch_size=2)
