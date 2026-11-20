import os
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from signal_extractor import MultiSignalAudioExtractor
from model import MultiSignalFusionNet

class AudioTripletDataset(Dataset):
    """
    Dataset loader for Triplet training:
    Anchor: Original song
    Positive: Plagiarized/Augmented version of Anchor (pitch shift, time stretch, sample)
    Negative: Completely unrelated different song
    """
    def __init__(self, triplets, extractor):
        """
        triplets: List of tuples (anchor_path, positive_path, negative_path)
        """
        self.triplets = triplets
        self.extractor = extractor

    def __len__(self):
        return len(self.triplets)

    def __getitem__(self, idx):
        anchor_p, pos_p, neg_p = self.triplets[idx]
        
        anchor_signals = self.extractor.extract_all_signals(anchor_p)
        pos_signals = self.extractor.extract_all_signals(pos_p)
        neg_signals = self.extractor.extract_all_signals(neg_p)

        return anchor_signals, pos_signals, neg_signals

def train_one_epoch(model, dataloader, optimizer, criterion, device):
    model.train()
    total_loss = 0.0

    for batch_idx, (anchor_b, pos_b, neg_b) in enumerate(dataloader):
        optimizer.zero_grad()

        # Send signal dictionaries to device
        for k in anchor_b:
            anchor_b[k] = anchor_b[k].to(device)
            pos_b[k] = pos_b[k].to(device)
            neg_b[k] = neg_b[k].to(device)

        # Forward passes
        a_embed = model(anchor_b)["master_embedding"]
        p_embed = model(pos_b)["master_embedding"]
        n_embed = model(neg_b)["master_embedding"]

        # Triplet loss enforces: dist(a, p) + margin < dist(a, n)
        loss = criterion(a_embed, p_embed, n_embed)
        loss.backward()
        optimizer.step()

        total_loss += loss.item()

    return total_loss / max(1, len(dataloader))

def main():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device for training: {device}")

    model = MultiSignalFusionNet(embedding_dim=256).to(device)
    optimizer = optim.AdamW(model.parameters(), lr=1e-4, weight_decay=1e-4)
    criterion = nn.TripletMarginLoss(margin=0.3, p=2)

    # Save initial untrained checkpoints or setup dataset path
    os.makedirs("checkpoints", exist_ok=True)
    torch.save(model.state_dict(), "checkpoints/initial_model.pt")
    print("Initial model checkpoint saved to checkpoints/initial_model.pt")

if __name__ == "__main__":
    main()
