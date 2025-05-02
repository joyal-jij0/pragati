import os 
import logging 
import cv2 
import numpy as np 
from ultralytics import YOLO 
import supervision as sv 
from groq import Groq 
import json 

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

def get_llm_response(class_counts: dict[str, int]) -> dict: 
    client = Groq() 
    user_content = json.dumps({"class counts": class_counts}, indent=4)
    completion = client.chat.completions.create(
        model = "meta-llama/llama-4-maverick-17b-128e-instruct",
        messages=[
            {
                "role": "system",
                "content": "You are the best Indian Agricultural Crop Doctor in Town. You are provided the crop diseases with its no in a json format you are to output Disease Details in one line, symptoms in 3 points, causes in 3 points and treatment in 3 points. All in a json format. If there are multiple diseases still provide one json with these only."
            },
            {
                "role": "user",
                "content": user_content
            }
        ],
        temperature=1, 
        max_completion_tokens=1024,
        top_p=1, 
        stream=False, 
        response_format={"type": "json_object"},
        stop=None, 
    )
    llm_response = completion.choices[0].message.content 
    
    try:
        return json.loads(llm_response) 
    except Exception: 
        return {"errror": "Failed to parse LLM response", "raw": llm_response}