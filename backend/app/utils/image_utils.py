import albumentations as A 
from albumentations.pytorch.transforms import ToTensorV2 

def valid_transform(): 
    return A.Compose([
        A.Resize(224, 224),
        ToTensorV2()
    ])