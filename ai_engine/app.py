# =========================================================================================
# koomRo - Seven-Method AI Music Risk Detector
# Backend API Server (FastAPI)
# Author: Sayema Fatema Jahan
# Institution: Presidency University | Student ID: 232044038
#
# In this server, I implement authentication via my custom KOOMRO_API_KEY and expose
# real-time endpoints for my 7-Signal Multi-Stream Neural Audio Risk Engine.
# =========================================================================================

import os
import shutil
from fastapi import FastAPI, UploadFile, File, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from matcher import MusicCopyrightRiskDetector

KOOMRO_API_KEY = os.getenv("KOOMRO_API_KEY", "koomro_sec_232044038_sfj_presidency")

app = FastAPI(
    title="koomRo - Seven-Method AI Music Risk Detector API",
    description="Multi-Signal Neural Audio Processing Engine by Sayema Fatema Jahan (Presidency University, ID: 232044038)",
    version="1.0.0"
)

# Enable CORS for my React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize my 7-signal detector
detector = MusicCopyrightRiskDetector()
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "temp_uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

def verify_api_key(koomro_api_key: str = Header(None, alias="koomro-api-key")):
    """
    I verify my custom API key to prevent unauthorized access to my GPU/CPU inference engine.
    Accepts header: 'koomro-api-key' (or standard Authorization token).
    """
    if koomro_api_key and koomro_api_key != KOOMRO_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid koomRo API Key. Access denied."
        )
    return True

@app.get("/")
def health_check():
    indexed_count = len(detector.catalog_metadata) if detector.catalog_metadata else 0
    return {
        "status": "online",
        "system": "koomRo Seven-Method Multi-Signal Neural Audio Risk Detector",
        "author": "Sayema Fatema Jahan",
        "institution": "Presidency University",
        "student_id": "232044038",
        "device": str(detector.device),
        "indexed_reference_tracks": indexed_count
    }

@app.post("/api/analyze")
async def analyze_audio(
    file: UploadFile = File(...),
    koomro_api_key: str = Header(None, alias="koomro-api-key")
):
    """
    I receive an audio file from my React frontend, verify my API key, extract all 7 signals,
    and search my reference catalog for copyright risk percentages.
    """
    verify_api_key(x_koomro_key)

    temp_path = os.path.join(UPLOAD_DIR, file.filename)
    try:
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Match against my precomputed catalog of reference tracks
        results = detector.match_against_catalog(temp_path)
        
        return {
            "success": True,
            "engine": "koomRo",
            "author": "Sayema Fatema Jahan (Presidency University - 232044038)",
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
