import os 
import requests 

def download_from_drive(drive_url, destination):
    if "drive.google.com" in drive_url:
        if"uc?id" in drive_url:
            file_id = drive_url.split("uc?id=")[-1].split("&")[0]
        elif "/file/d/" in drive_url: 
            file_id = drive_url.split("/file/d/")[1].split("/")[0]
        else: 
            raise ValueError("Invalid Google Drive URL format")
        download_url = f"https://drive.google.com/uc?export=download&id={file_id}" 
    else: 
        download_url = drive_url 

    with requests.get(download_url, stream=True) as r:
        r.raise_for_status()
        with open(destination, "wb") as f:
            for chunk in r.iter_content(chunk_size=8192):
                if chunk: 
                    f.write(chunk) 

if __name__ == "__main__": 
    DRIVE_LINK = "https://drive.google.com/file/d/1LHtu93nd3vINk-IkQUy9DAlJfW6b3Dke/view?usp=sharing"
    BASE_DIR = os.path.dirname(os.path.abspath(__file__)) 
    MODEL_DIR = os.path.join(BASE_DIR, "ml_models") 
    os.makedirs(MODEL_DIR, exist_ok=True) 
    DEST_PATH = os.path.join(MODEL_DIR, "market_price_model.pkl") 

    print(f"Downloading model to {DEST_PATH} ...") 
    download_from_drive(DRIVE_LINK, DEST_PATH) 
    print("Download complete") 