import librosa
import numpy as np
import torch

class MultiSignalAudioExtractor:
    """
    Extracts 6 distinct acoustic signals from an audio file:
    1. Chroma CQT (Harmonic / Pitch Class)
    2. Mel-Spectrogram (Perceptual Time-Frequency Energy)
    3. MFCC (Timbre / Vocal Formants)
    4. Tempogram (Rhythmic Cadence / Tempo)
    5. Tonnetz (Tonal Centroid Space)
    6. Spectral Contrast (Texture / Brightness)
    """
    def __init__(self, sample_rate=22050, duration=30.0, n_mels=128, n_mfcc=20):
        self.sr = sample_rate
        self.duration = duration
        self.target_length = int(sample_rate * duration)
        self.n_mels = n_mels
        self.n_mfcc = n_mfcc

    def load_and_preprocess(self, audio_path):
        """Loads audio, converts to mono, resamples, and normalizes."""
        y, _ = librosa.load(audio_path, sr=self.sr, mono=True, duration=self.duration)
        if len(y) < self.target_length:
            y = np.pad(y, (0, self.target_length - len(y)), mode='constant')
        else:
            y = y[:self.target_length]
        
        # Peak normalization
        max_val = np.max(np.abs(y))
        if max_val > 0:
            y = y / max_val
        return y

    def extract_all_signals(self, audio_path):
        y = self.load_and_preprocess(audio_path)

        # 1. Chroma CQT (12 pitch classes x Time)
        chroma = librosa.feature.chroma_cqt(y=y, sr=self.sr, n_chroma=12)

        # 2. Mel-Spectrogram (128 bands x Time)
        mel_spec = librosa.feature.melspectrogram(y=y, sr=self.sr, n_mels=self.n_mels)
        mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)

        # 3. MFCC (20 coefficients x Time)
        mfcc = librosa.feature.mfcc(y=y, sr=self.sr, n_mfcc=self.n_mfcc)

        # 4. Tempogram (Rhythm & BPM grid)
        onset_env = librosa.onset.onset_strength(y=y, sr=self.sr)
        tempogram = librosa.feature.tempogram(onset_envelope=onset_env, sr=self.sr)

        # 5. Tonnetz (6 tonal dimensions x Time)
        tonnetz = librosa.feature.tonnetz(y=y, sr=self.sr)

        # 6. Spectral Contrast (7 bands x Time)
        contrast = librosa.feature.spectral_contrast(y=y, sr=self.sr)

        # Convert to PyTorch float tensors with Channel dimension: (1, Freq, Time)
        signals = {
            "chroma": torch.tensor(chroma, dtype=torch.float32).unsqueeze(0),
            "mel_spec": torch.tensor(mel_spec_db, dtype=torch.float32).unsqueeze(0),
            "mfcc": torch.tensor(mfcc, dtype=torch.float32).unsqueeze(0),
            "tempogram": torch.tensor(tempogram, dtype=torch.float32).unsqueeze(0),
            "tonnetz": torch.tensor(tonnetz, dtype=torch.float32).unsqueeze(0),
            "contrast": torch.tensor(contrast, dtype=torch.float32).unsqueeze(0)
        }
        return signals
