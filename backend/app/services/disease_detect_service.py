import os 
import logging 
import cv2 
import numpy as np 
from ultralytics import YOLO 
import supervision as sv 

logger = logging.getLogger(__name__) 

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "ml_models", "best.pt")

if not os.path.exists(MODEL_PATH):
    logger.error(f"Disease model not found at {MODEL_PATH}")
    raise RuntimeError(f"Disease model file missing: {MODEL_PATH}")

try:
    model = YOLO(MODEL_PATH)
    logger.info(f"Loaded YOLO model from {MODEL_PATH}")
except Exception as e:
    logger.error(f"Failed to load YOLO model: {e}")
    raise

COLOR_MAP = {
    "Blight": sv.Color(255, 0, 0),
    "Brown Spot": sv.Color(0, 0, 255),
    "False Smut": sv.Color(0, 255, 0),
    "Healthy": sv.Color(255, 255, 0),
    "Leaf Smut": sv.Color(128, 0, 128),
    "Rice blast": sv.Color(255, 165, 0),
    "Stem Rot": sv.Color(255, 0, 255),
    "Tungro": sv.Color(0, 255, 255),
    "Background": sv.Color(255, 255, 255),
}

def detect_image(path: str) -> dict[str, int]:
    image = cv2.imread(path) 
    if image is None: 
        logger.error(f"Could not load image at {path}") 
        raise RuntimeError("Failed to load image") 
    
    image = cv2.resize(image, (1280, 720)) 

    results = model(image)[0] 
    detections = sv.Detections.from_ultralytics(results) 

    counts: dict[str, int] = {} 
    for cid in detections.class_id: 
        name = results.names[cid] 
        counts[name] = counts.get(name, 0) + 1 

    logger.debug(f"Detection counts: {counts}")
    return counts 