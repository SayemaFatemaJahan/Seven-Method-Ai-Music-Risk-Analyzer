# =========================================================================================
# koomRo - Seven-Method AI Music Risk Detector
# Method 7: Multi-Branch Deep Attention Fusion Network (PyTorch)
# Author: Sayema Fatema Jahan
# Institution: Presidency University | Student ID: 232044038
#
# Why I built this:
# In my thesis, I developed this deep neural architecture to combine all 6 acoustic signal
# branches using multi-head self-attention. It projects signals into a 256-dimensional
# metric embedding space to calculate calibrated copyright risk percentages.
# =========================================================================================

import torch
import torch.nn as nn
import torch.nn.functional as F

class SignalCNNBranch(nn.Module):
    """
    I designed this convolutional sub-network to extract deep acoustic features
    from 2D time-frequency signal representations.
    """
    def __init__(self, in_channels=1, feature_dim=64):
        super(SignalCNNBranch, self).__init__()
        self.conv1 = nn.Conv2d(in_channels, 32, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm2d(32)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.bn2 = nn.BatchNorm2d(64)
        self.pool = nn.AdaptiveAvgPool2d((1, 1))
        self.fc = nn.Linear(64, feature_dim)

    def forward(self, x):
        # x shape: (Batch, 1, Freq, Time)
        x = F.relu(self.bn1(self.conv1(x)))
        x = F.max_pool2d(x, 2)
        x = F.relu(self.bn2(self.conv2(x)))
        x = self.pool(x)
        x = torch.flatten(x, 1)
        return self.fc(x)

class MultiSignalFusionNet(nn.Module):
    """
    Method 7: My Master Multi-Signal Attention Fusion Network (koomRo)
    I feed 6 acoustic signals through 6 dedicated parallel CNN branches,
    and fuse them via multi-head self-attention.
    """
    def __init__(self, embedding_dim=256):
        super(MultiSignalFusionNet, self).__init__()
        
        # I allocate 6 dedicated neural branches for each acoustic domain
        self.chroma_branch = SignalCNNBranch(1, feature_dim=64)     # Melody / Pitch
        self.mel_branch = SignalCNNBranch(1, feature_dim=64)        # Perceptual Spectrum
        self.mfcc_branch = SignalCNNBranch(1, feature_dim=64)       # Timbre / Vocal
        self.tempo_branch = SignalCNNBranch(1, feature_dim=64)      # Rhythm / Beats
        self.tonnetz_branch = SignalCNNBranch(1, feature_dim=64)    # Tonal Space
        self.contrast_branch = SignalCNNBranch(1, feature_dim=64)   # Spectral Texture

        # I use multi-head self-attention to dynamically weigh the importance of each signal
        self.attention = nn.MultiheadAttention(embed_dim=64, num_heads=4, batch_first=True)
        
        # I project the fused representations into a unified 256-D metric space
        self.projection_head = nn.Sequential(
            nn.Linear(64 * 6, 512),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(512, embedding_dim)
        )

    def forward(self, signals):
        # I compute branch embeddings for each signal
        e_chroma = self.chroma_branch(signals["chroma"])
        e_mel = self.mel_branch(signals["mel_spec"])
        e_mfcc = self.mfcc_branch(signals["mfcc"])
        e_tempo = self.tempo_branch(signals["tempogram"])
        e_tonnetz = self.tonnetz_branch(signals["tonnetz"])
        e_contrast = self.contrast_branch(signals["contrast"])

        # I stack the 6 signal tokens: (Batch, 6, 64)
        signal_tokens = torch.stack([e_chroma, e_mel, e_mfcc, e_tempo, e_tonnetz, e_contrast], dim=1)

        # I apply self-attention across all signals
        attn_out, _ = self.attention(signal_tokens, signal_tokens, signal_tokens)
        
        # I flatten and project to my master embedding
        flattened = attn_out.reshape(attn_out.size(0), -1)
        master_embedding = self.projection_head(flattened)
        
        # I L2-normalize the output vector to enable fast Cosine Similarity retrieval
        master_embedding = F.normalize(master_embedding, p=2, dim=1)
        
        return {
            "master_embedding": master_embedding,
            "branch_embeddings": {
                "melody": F.normalize(e_chroma, p=2, dim=1),
                "spectrum": F.normalize(e_mel, p=2, dim=1),
                "timbre": F.normalize(e_mfcc, p=2, dim=1),
                "rhythm": F.normalize(e_tempo, p=2, dim=1),
                "tonal": F.normalize(e_tonnetz, p=2, dim=1),
                "contrast": F.normalize(e_contrast, p=2, dim=1)
            }
        }
