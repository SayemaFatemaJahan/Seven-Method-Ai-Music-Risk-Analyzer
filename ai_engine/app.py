from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from matcher import MusicCopyrightRiskDetector
import shutil
import os

app = FastAPI(
    title="Seven Method AI Music Risk Detector API",
    description="Multi-Signal Neural Audio Processing Engine for Copyright Risk Detection"
)

# Enable CORS for React frontend (Vite port 5173 / 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize detector
detector = MusicCopyrightRiskDetector()
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "temp_uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def health_check():
    indexed_count = len(detector.catalog_metadata) if detector.catalog_metadata else 0
    return {
        "status": "online",
        "system": "Seven-Method Multi-Signal Neural Audio Risk Detector",
        "device": str(detector.device),
        "indexed_reference_tracks": indexed_count
    }

@app.post("/api/analyze")
async def analyze_audio(file: UploadFile = File(...)):
    """
    Receives an audio file from React, extracts the 7 signals,
    and searches the reference catalog for copyright risk matches.
    """
    temp_path = os.path.join(UPLOAD_DIR, file.filename)
    try:
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Match against precomputed catalog of reference tracks
        results = detector.match_against_catalog(temp_path)
        
        return {
            "success": True,
            "filename": file.filename,
            "results": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(temp_path):
            try:
                os.remove(temp_path)
            except Exception:
                pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
