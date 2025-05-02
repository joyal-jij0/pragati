import io 
import numpy as np 
import torch 
import timm 
import logging 
import os 

from PIL import Image 
from app.utils.image_utils import valid_transform 
from app.utils.pest_name import pest_name as PEST_NAME_MAP 

logger = logging.getLogger(__name__) 

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "ml_models", "pest_model.pth") 

if not os.path.exists(MODEL_PATH): 
    logger.errro(f"Peset model not found at {MODEL_PATH}") 
    raise RuntimeError(f"Pest model file missign :{MODEL_PATH}") 

_device = torch.device("cuda" if torch.cuda.is_available() else "cpu") 

if _device.type == "cuda": 
    logger.info(f"CUDA is available. Using GPU: {torch.cuda.get_device_name(0)}")
else: 
    logger.info("CUDA not available. Using CPU") 

try:

    class InsectModel(torch.nn.Module):
        def __init__(self, num_classes: int): 
            super().__init__() 
            self.model = timm.create_model(
                "vit_base_patch16_224",
                pretrained=True, 
                num_classes = num_classes
            )

        def forward(self, x:torch.Tensor) -> torch.Tensor:
            return self.model(x) 
    
    _classes = [str(i) for i in range(1, 41)] 
    logger.info(f"Intiliazing InsectModel with {len(_classes)} classes") 
    _model = InsectModel(num_classes=len(_classes)) 

    logger.info(f"Loading model weights from {MODEL_PATH}") 
    state = torch.load(MODEL_PATH, map_location=_device) 
    _model.load_state_dict(state) 
    _model.to(_device).eval() 
    logger.info("Pest model loaded and set to eval() mode") 

except Exception as e: 
    logger.error(f"Failed to load pest mode: {e}", exc_info=True) 
    raise 

class PredictService: 
    @staticmethod 
    def predict(img_bytes: bytes) -> str: 

        try: 
            image = Image.open(io.BytesIO(img_bytes)).convert("RGB") 
            logger.debug("input image decoded succesfully") 

        except Exception as e: 
            logger.error(f"Failed to decode image bytes: {e}")
            raise RuntimeError("Invalid image data") 
        
        arr = np.array(image) 
        tr = valid_transform() 
        sample = tr(image=arr)["image"] 
        logger.debug(f"Applied valid_transform, tensor shape: {sample.shape}") 

        tensor = sample.float().unsqueeze(0).to(_device) / 255.0 
        logger.debug(f"Tensor moved to {_device}, batch shape: {tensor.shape}") 

        with torch.no_grad():
            logits = _model(tensor) 
            logger.debug("Model forward pass complete") 
            idx = torch.argmax(logits, dim=1).item() 
            logger.info(f"Raw model output logits, selected class index: {idx}") 

        class_id = _classes[idx] 
        pest_name = PEST_NAME_MAP.get(class_id, class_id) 
        logger.info(f"Mapped class '{class_id}' to pest name '{pest_name}' ")
        return pest_name