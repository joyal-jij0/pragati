import os 
from fastapi import UploadFile, HTTPException 

UPLOAD_FOLDER = os.path.join(os.getcwd(), "static", "uploads") 
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"} 

os.makedirs(UPLOAD_FOLDER, exist_ok=True) 

def allowed_file(filename: str) -> bool: 
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS 
    )

async def save_upload_file(upload_file: UploadFile) -> str: 
    if not allowed_file(upload_file.filename):
        raise HTTPException(status_code=400, detail="Invalid file type")

    destination = os.path.join(UPLOAD_FOLDER, upload_file.filename) 
    with open(destination, "wb") as f:
        f.write(await upload_file.read()) 
    return destination