# Seven Method Multi-Signal AI Music Risk Detector

This directory contains the core PyTorch neural network and signal processing engine for your thesis:
**"Development of AI-based copyright music claim detection system using multi-signal neural audio processing"**

## Architecture

1. **Method 1 (Chroma CQT)**: Harmonic pitch classes (12 semi-tones) -> Melodic plagiarism detection.
2. **Method 2 (Mel-Spectrogram)**: Time-frequency energy distribution (128 bands).
3. **Method 3 (MFCC)**: Timbral cepstral coefficients (20 coefficients) -> Vocal and synthesizer sample detection.
4. **Method 4 (Tempogram)**: Onset rhythmic envelopes -> Beat & drum loop theft detection.
5. **Method 5 (Tonnetz)**: Tonal centroid projection (6 dimensions) -> Harmonic progression similarity.
6. **Method 6 (Spectral Contrast)**: Dynamic spectral valleys/peaks (7 bands) -> Sound design matching.
7. **Method 7 (Attention Deep Fusion)**: Multi-branch CNN + Multi-head self-attention joint metric projection.

## Files
- `signal_extractor.py`: Audio preprocessing and feature extraction using Librosa.
- `model.py`: PyTorch Multi-Branch Convolutional + Attention Network.
- `train.py`: Triplet margin loss metric training pipeline.
- `matcher.py`: Cosine similarity percentage calculator & YouTube/distribution strike risk evaluator.
- `app.py`: FastAPI server connecting this engine to the React frontend.
- `requirements.txt`: Python package dependencies.

## Setup Instructions

### 1. Create Virtual Environment
Open PowerShell inside this directory:
```powershell
cd "c:\Users\Neha\Downloads\Seven Method Music Risk Detector with AI\ai_engine"
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### 2. Install Dependencies
```powershell
pip install -r requirements.txt
```

### 3. Run FastAPI Backend
```powershell
python app.py
```
API runs on `http://127.0.0.1:8000`.
