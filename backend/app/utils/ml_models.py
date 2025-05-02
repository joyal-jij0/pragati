import joblib 

def load_model(MODEL_PATH):
    try:
        model = joblib.load(MODEL_PATH)
        return model 
    except Exception as e:
        print(f"Failed to load model: {e!r} (type: {type(e)})")
        return None 
    
