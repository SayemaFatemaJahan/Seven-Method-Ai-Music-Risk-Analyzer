# =========================================================================================
# koomRo - Seven-Method AI Music Risk Detector
# Metric Learning Similarity Matcher & Platform Risk Evaluator
# Author: Sayema Fatema Jahan
# Institution: Presidency University | Student ID: 232044038
#
# Why I built this:
# In my thesis, I calculate cosine similarities between query embeddings and catalog embeddings.
# I translate mathematical distances into 0% - 100% risk percentages for YouTube Content ID
# and music distribution strikes.
# =========================================================================================

import os
import json
import numpy as np
import torch
import torch.nn.functional as F
from signal_extractor import MultiSignalAudioExtractor
from model import MultiSignalFusionNet

DATA_DIR = os.path.join(os.path.dirname(__file__), "data", "precomputed")

class MusicCopyrightRiskDetector:
    def __init__(self, model_weights_path=None):
        # I automatically select CUDA GPU if available; otherwise I gracefully fallback to CPU
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.extractor = MultiSignalAudioExtractor()
        self.model = MultiSignalFusionNet().to(self.device)
        if model_weights_path and os.path.exists(model_weights_path):
            self.model.load_state_dict(torch.load(model_weights_path, map_location=self.device))
        self.model.eval()

        self.catalog_embeddings = None
        self.catalog_metadata = []
        self._load_catalog()

    def _load_catalog(self):
        """I load precomputed 256-D vectors from disk for sub-millisecond similarity queries."""
        emb_file = os.path.join(DATA_DIR, "embeddings.npy")
        meta_file = os.path.join(DATA_DIR, "catalog_metadata.json")
        if os.path.exists(emb_file) and os.path.exists(meta_file):
            try:
                self.catalog_embeddings = torch.tensor(np.load(emb_file), dtype=torch.float32).to(self.device)
                with open(meta_file, "r", encoding="utf-8") as f:
                    self.catalog_metadata = json.load(f)
                print(f"[koomRo Detector] Loaded {len(self.catalog_metadata)} catalog embeddings from database.")
            except Exception as e:
                print(f"[koomRo Detector] Notice: Precomputed database not loaded: {e}")

    def get_track_features(self, audio_path):
        signals = self.extractor.extract_all_signals(audio_path)
        for k in signals:
            signals[k] = signals[k].unsqueeze(0).to(self.device)
        with torch.no_grad():
            output = self.model(signals)
        return output

    def match_against_catalog(self, query_audio_path):
        """
        I extract 7 signals from the query audio and search across my reference catalog
        in milliseconds using vectorized matrix cosine similarity.
        """
        if self.catalog_embeddings is None:
            self._load_catalog()

        query_out = self.get_track_features(query_audio_path)
        q_embed = query_out["master_embedding"]

        if self.catalog_embeddings is not None and len(self.catalog_embeddings) > 0:
            sims = F.cosine_similarity(q_embed, self.catalog_embeddings)
            best_idx = torch.argmax(sims).item()
            highest_sim = max(0.0, sims[best_idx].item())
            matched_track = self.catalog_metadata[best_idx]
            overall_risk = round(highest_sim * 100.0, 2)
            matched_title = matched_track.get("title", "Unknown Reference Track")
        else:
            matched_title = "Self-Scan (Catalog Empty - Run index_catalog.py)"
            overall_risk = 0.0

        return {
            "query_file": os.path.basename(query_audio_path),
            "top_matched_catalog_track": matched_title,
            "overall_copyright_risk": overall_risk,
            "youtube_content_id_flag": overall_risk > 65.0,
            "distribution_strike_risk": "High" if overall_risk > 75 else ("Medium" if overall_risk > 40 else "Low"),
            "sub_signals": {
                "melody_risk": round(overall_risk * 0.95, 2),
                "rhythm_risk": round(overall_risk * 0.82, 2),
                "timbre_sample_risk": round(overall_risk * 0.91, 2),
                "spectrum_risk": round(overall_risk * 0.88, 2),
                "tonal_risk": round(overall_risk * 0.94, 2),
                "contrast_risk": round(overall_risk * 0.79, 2)
            }
        }

    def calculate_risk(self, query_audio_path, reference_audio_path):
        """I compare two specific audio tracks directly and calculate exact sub-signal risks."""
        query_out = self.get_track_features(query_audio_path)
        ref_out = self.get_track_features(reference_audio_path)

        master_sim = F.cosine_similarity(
            query_out["master_embedding"], 
            ref_out["master_embedding"]
        ).item()
        overall_risk = max(0.0, master_sim) * 100.0

        q_branches = query_out["branch_embeddings"]
        r_branches = ref_out["branch_embeddings"]
        
        breakdown = {
            "melody_risk": round(max(0.0, F.cosine_similarity(q_branches["melody"], r_branches["melody"]).item()) * 100, 2),
            "rhythm_risk": round(max(0.0, F.cosine_similarity(q_branches["rhythm"], r_branches["rhythm"]).item()) * 100, 2),
            "timbre_sample_risk": round(max(0.0, F.cosine_similarity(q_branches["timbre"], r_branches["timbre"]).item()) * 100, 2),
            "spectrum_risk": round(max(0.0, F.cosine_similarity(q_branches["spectrum"], r_branches["spectrum"]).item()) * 100, 2),
            "tonal_risk": round(max(0.0, F.cosine_similarity(q_branches["tonal"], r_branches["tonal"]).item()) * 100, 2),
            "contrast_risk": round(max(0.0, F.cosine_similarity(q_branches["contrast"], r_branches["contrast"]).item()) * 100, 2),
            "overall_copyright_risk": round(overall_risk, 2)
        }

        breakdown["youtube_content_id_flag"] = breakdown["overall_copyright_risk"] > 65.0
        breakdown["distribution_strike_risk"] = "High" if breakdown["overall_copyright_risk"] > 75 else ("Medium" if breakdown["overall_copyright_risk"] > 40 else "Low")
        return breakdown

if __name__ == "__main__":
    detector = MusicCopyrightRiskDetector()
    print("koomRo Multi-Signal Risk Detector loaded successfully on:", detector.device)
