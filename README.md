# Seven-Method AI Music Risk Detector

> **My Thesis Topic:** *Development of AI-Based Copyright Music Claim Detection System Using Multi-Signal Neural Audio Processing*

I developed this system to analyze audio files and predict copyright infringement risk percentages on YouTube (Content ID) and digital music distribution platforms (Spotify, Apple Music, etc.). 

Rather than relying on naive single-signal comparisons or generic metadata, I built a **Seven-Method Architecture** based on multi-signal neural audio processing. I extract six distinct acoustic signal streams capturing melody, harmony, rhythm, timbre, and acoustic texture, and fuse them using a deep multi-head self-attention neural network.

---

## The Seven Methods Explained

In my research, I decomposed musical copyright claims into distinct acoustic dimensions:

| Method # | Name | Acoustic Signal / Model | Copyright Dimension I Detect |
| :--- | :--- | :--- | :--- |
| **Method 1** | **Chroma CQT Harmonic Analyzer** | 12-Class Constant-Q Pitch Chroma | Melodic and chord progression plagiarism, even when transposed or re-recorded on different instruments. |
| **Method 2** | **Log-Mel Spectrogram Neural Stream** | 128-Band Perceptual Mel Filterbank | Overall time-frequency acoustic signature and perceptual audio energy overlap. |
| **Method 3** | **MFCC Timbral Stem Discriminator** | 20 Mel-Frequency Cepstral Coefficients | Vocal formants, singer identity, synthesizer presets, and direct master stem theft. |
| **Method 4** | **Tempogram & Metric Onset Analyzer** | Dynamic Onset Correlation Matrix | Beat theft, drum loop duplication, tempo swing, and groove syncopation. |
| **Method 5** | **Tonnetz Tonal Centroid Mapper** | 6-Dimensional Harmonic Vector Space | Geometric tonal movements in fifths and thirds; detects harmonic copying invariant to key transposition. |
| **Method 6** | **Spectral Contrast & Texture Stream** | 7-Band Valley-to-Peak Energy Ratios | Audio mastering dynamics, acoustic brightness, and sound design similarity. |
| **Method 7** | **Multi-Signal Deep Attention Fusion** | Multi-Branch CNN + Self-Attention | **My Master Ensemble:** Ingests all 6 signals, cross-evaluates them using multi-head attention, and projects a unified 256-D metric embedding with Triplet Margin Loss. |

---

## Project Structure

```text
Seven-Method-Ai-Music-Risk-Analyzer/
├── ai_engine/                         # My Python AI Neural Engine
│   ├── signal_extractor.py            # Methods 1-6 Librosa signal processing
│   ├── model.py                       # Method 7 PyTorch Multi-Branch Attention Fusion Network
│   ├── matcher.py                     # Metric learning cosine risk percentage calculator
│   ├── train.py                       # Triplet Margin Loss training pipeline
│   ├── app.py                         # FastAPI backend REST server
│   └── requirements.txt               # Python package dependencies
├── src/                               # My React 19 Frontend Dashboard
│   ├── components/                    # UI Components (AudioUploader, RiskMeter, WaveformViewer, etc.)
│   ├── data/                          # Method descriptors, code inspector data & reference catalog
│   ├── services/                      # Client-side audio engines & multi-method analyzers
│   └── types/                         # TypeScript interfaces
└── README.md
```

---

## How I Run My AI Engine Locally

### 1. How I Set Up My Python Virtual Environment
I navigate to my `ai_engine` folder and set up my isolated virtual environment:

```powershell
# Navigate into my AI directory
cd ai_engine

# Create my virtual environment
python -m venv venv

# Activate my virtual environment in PowerShell
.\venv\Scripts\Activate.ps1

# Upgrade pip
python -m pip install --upgrade pip

# Install my required dependencies
pip install -r requirements.txt
```

### 2. How I Train My Model
To train my multi-branch neural network using Triplet Margin Loss on GPU or CPU, I run:

```powershell
python train.py
```

> **Note on GPU:** I run inference locally on my CPU/GPU. For full multi-epoch training over large audio datasets, I use a Google Colab notebook with an NVIDIA T4 GPU (16GB VRAM) and save my checkpoints back to `ai_engine/checkpoints/`.

### 3. How I Launch My FastAPI Backend Server
To start my AI API server that connects directly to my React frontend:

```powershell
python app.py
```
My API runs at `http://127.0.0.1:8000`.

---

## How I Run My React Frontend

In a separate terminal, from the project root directory, I execute:

```powershell
# Install frontend dependencies
npm install

# Start the Vite development server
npm run dev
```

My frontend application opens at `http://localhost:5173` (or port specified by Vite).

---

## Reference Dataset (Protected Catalog)

Inside `src/data/bangladeshiSongs1000.ts`, I maintain a curated reference catalog of 1,000 songs seeded with iconic Bangladeshi masterpieces (Ayub Bachchu, James, Miles, Artcell, Rabindra Sangeet, Nazrul Geeti). 

When I upload a query song, my system extracts its 7 acoustic signals and performs metric similarity retrieval against this reference catalog to calculate the exact risk percentages for YouTube Content ID and distribution strikes.

---

## Author & Research
- **Author:** Sayema Fatema Jahan
- **Repository:** [Seven-Method-Ai-Music-Risk-Analyzer](https://github.com/SayemaFatemaJahan/Seven-Method-Ai-Music-Risk-Analyzer)
- **Thesis Focus:** Multi-Signal Neural Audio Processing for Music Copyright Claim Detection
