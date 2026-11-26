# =========================================================================================
# koomRo - Seven-Method AI Music Risk Detector
# Multi-Signal Acoustic Feature Extractor (Methods 1 through 6)
# Author: Sayema Fatema Jahan
# Institution: Presidency University | Student ID: 232044038
#
# Why I built this:
# In my thesis, I extract 6 distinct acoustic signals to capture melody, rhythm, timbre,
# and harmony before feeding them into my Method 7 deep attention neural network.
# =========================================================================================

import librosa
import numpy as np
import torch

class MultiSignalAudioExtractor:
    """
    I extract 6 distinct acoustic signals from an audio file:
    1. Chroma CQT (Harmonic / Pitch Class)
    2. Mel-Spectrogram (Perceptual Time-Frequency Energy)
    3. MFCC (Timbre / Vocal Formants)
    4. Tempogram (Rhythmic Cadence / Tempo)
    5. Tonnetz (Tonal Centroid Space)
    6. Spectral Contrast (Texture / Brightness)
    """
    def __init__(self, sample_rate=22050, duration=30.0, n_mels=128, n_mfcc=20):
        # I standardize sampling rate and audio duration to ensure uniform tensor dimensions
        self.sr = sample_rate
        self.duration = duration
        self.target_length = int(sample_rate * duration)
        self.n_mels = n_mels
        self.n_mfcc = n_mfcc

    def load_and_preprocess(self, audio_path):
        """I load audio, convert it to mono, resample, pad/trim, and peak-normalize."""
        y, _ = librosa.load(audio_path, sr=self.sr, mono=True, duration=self.duration)
        if len(y) < self.target_length:
            y = np.pad(y, (0, self.target_length - len(y)), mode='constant')
        else:
            y = y[:self.target_length]
        
        # I normalize amplitude peaks to [-1.0, 1.0] to prevent volume bias in my neural network
        max_val = np.max(np.abs(y))
        if max_val > 0:
            y = y / max_val
        return y

    def extract_all_signals(self, audio_path):
        y = self.load_and_preprocess(audio_path)

        # Method 1: Chroma CQT (I detect melodic and chord progression plagiarism)
        chroma = librosa.feature.chroma_cqt(y=y, sr=self.sr, n_chroma=12)

        # Method 2: Mel-Spectrogram (I capture 128 perceptual time-frequency energy bands)
        mel_spec = librosa.feature.melspectrogram(y=y, sr=self.sr, n_mels=self.n_mels)
        mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)

        # Method 3: MFCC (I capture singer timbre and synthesizer sample identity)
        mfcc = librosa.feature.mfcc(y=y, sr=self.sr, n_mfcc=self.n_mfcc)

        # Method 4: Tempogram (I isolate drum loop swing, BPM, and rhythmic syncopation)
        onset_env = librosa.onset.onset_strength(y=y, sr=self.sr)
        tempogram = librosa.feature.tempogram(onset_envelope=onset_env, sr=self.sr)

        # Method 5: Tonnetz (I map chords to 6-D tonal space invariant to pitch shift)
        tonnetz = librosa.feature.tonnetz(y=y, sr=self.sr)

        # Method 6: Spectral Contrast (I evaluate valley-to-peak dynamic brightness)
        contrast = librosa.feature.spectral_contrast(y=y, sr=self.sr)

        # I convert all extracted matrices into PyTorch float tensors: (1, Freq, Time)
        signals = {
            "chroma": torch.tensor(chroma, dtype=torch.float32).unsqueeze(0),
            "mel_spec": torch.tensor(mel_spec_db, dtype=torch.float32).unsqueeze(0),
            "mfcc": torch.tensor(mfcc, dtype=torch.float32).unsqueeze(0),
            "tempogram": torch.tensor(tempogram, dtype=torch.float32).unsqueeze(0),
            "tonnetz": torch.tensor(tonnetz, dtype=torch.float32).unsqueeze(0),
            "contrast": torch.tensor(contrast, dtype=torch.float32).unsqueeze(0)
        }
        return signals
