import os 
import pandas as pd 
from app.schemas.market_price import MarketPriceInput 
from app.utils.ml_models import load_model

MODEL_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
    "ml_models", "market_price_model.pkl"
)

print(f"Resolved MODEL_PATH: {MODEL_PATH}")
print(f"File exists: {os.path.exists(MODEL_PATH)}")

model = load_model(MODEL_PATH)

def predict_market_price(input_data: MarketPriceInput):
    if model is None:
        raise RuntimeError("Model not loaded") 
    date_obj = input_data.date
    features = {
        "year": date_obj.year,
        "month": date_obj.month,
        "day_of_week": date_obj.weekday(),
        "day_of_month": date_obj.day,
        "State": input_data.state,
        "District": input_data.district,
        "Commodity": input_data.commodity,
        "Variety": input_data.variety,
        "Grade": input_data.grade
    }
    df = pd.DataFrame([features])
    prediction = model.predict(df)
    return prediction[0]

