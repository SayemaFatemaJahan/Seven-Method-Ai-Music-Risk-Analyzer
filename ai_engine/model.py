import torch
import torch.nn as nn
import torch.nn.functional as F

class SignalCNNBranch(nn.Module):
    """Convolutional sub-network to extract deep features from a 2D time-frequency signal."""
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
    Method 7: Deep Multi-Signal Fusion Network
    Takes 6 acoustic signals, runs them in parallel through 6 feature extractors,
    and fuses them using self-attention into a unified copyright embedding.
    """
    def __init__(self, embedding_dim=256):
        super(MultiSignalFusionNet, self).__init__()
        
        # 6 Dedicated neural branches
        self.chroma_branch = SignalCNNBranch(1, feature_dim=64)     # Melody / Pitch
        self.mel_branch = SignalCNNBranch(1, feature_dim=64)        # Perceptual Spectrum
        self.mfcc_branch = SignalCNNBranch(1, feature_dim=64)       # Timbre / Vocal
        self.tempo_branch = SignalCNNBranch(1, feature_dim=64)      # Rhythm / Beats
        self.tonnetz_branch = SignalCNNBranch(1, feature_dim=64)    # Tonal Space
        self.contrast_branch = SignalCNNBranch(1, feature_dim=64)   # Spectral Texture

        # Self-Attention across the 6 sub-signal embeddings
        self.attention = nn.MultiheadAttention(embed_dim=64, num_heads=4, batch_first=True)
        
        # Final Projection Head into unified metric embedding space
        self.projection_head = nn.Sequential(
            nn.Linear(64 * 6, 512),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(512, embedding_dim)
        )

    def forward(self, signals):
        # Pass each signal through its respective branch
        e_chroma = self.chroma_branch(signals["chroma"])
        e_mel = self.mel_branch(signals["mel_spec"])
        e_mfcc = self.mfcc_branch(signals["mfcc"])
        e_tempo = self.tempo_branch(signals["tempogram"])
        e_tonnetz = self.tonnetz_branch(signals["tonnetz"])
        e_contrast = self.contrast_branch(signals["contrast"])

        # Stack into sequence of 6 signal vectors: (Batch, 6, 64)
        signal_tokens = torch.stack([e_chroma, e_mel, e_mfcc, e_tempo, e_tonnetz, e_contrast], dim=1)

        # Apply multi-signal attention
        attn_out, _ = self.attention(signal_tokens, signal_tokens, signal_tokens)
        
        # Flatten and project to final master embedding
        flattened = attn_out.reshape(attn_out.size(0), -1)
        master_embedding = self.projection_head(flattened)
        
        # L2-normalize master embedding for cosine distance matching
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
