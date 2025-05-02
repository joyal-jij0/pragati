import os
import requests


def download_file_from_dropbox(dropbox_url, destination):
    # Ensure direct download
    if dropbox_url.endswith("?dl=0"):
        dropbox_url = dropbox_url.replace("?dl=0", "?dl=1")
    elif not dropbox_url.endswith("?dl=1"):
        if "?" in dropbox_url:
            dropbox_url += "&dl=1"
        else:
            dropbox_url += "?dl=1"

    with requests.get(dropbox_url, stream=True) as r:
        r.raise_for_status()
        with open(destination, "wb") as f:
            for chunk in r.iter_content(32768):
                if chunk:
                    f.write(chunk)


if __name__ == "__main__":
    DROPBOX_LINK = "https://www.dropbox.com/scl/fi/jo0le1og7klyi3uu635d6/Market-Price-Model.pkl?rlkey=7hpfg918dg2krpojqtfjowpec&st=vq4wpao9&dl=1"
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    MODEL_DIR = os.path.join(BASE_DIR, "ml_models")
    os.makedirs(MODEL_DIR, exist_ok=True)
    DEST_PATH = os.path.join(MODEL_DIR, "market_price_model.pkl")
    print(f"Downloading model to {DEST_PATH} ...")
    download_file_from_dropbox(DROPBOX_LINK, DEST_PATH)
    print("Download complete.")
