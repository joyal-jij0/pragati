import os
import sys
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import argparse
import matplotlib.pyplot as plt


def predict_leaf_disease(image_path, model_path='models/plant_leaf_disease_detector'):
    """
    Predict plant leaf disease from an image

    Args:
        image_path: Path to the image file
        model_path: Path to the saved model

    Returns:
        Prediction results dictionary
    """
    # Check if files exist
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found: {image_path}")
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model not found: {model_path}")

    # Load and preprocess image
    img = load_img(image_path, target_size=(256, 256))
    img_array = img_to_array(img)/255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Attempt to load model using modern TensorFlow
    print("Loading model with modern TensorFlow...")
    try:
        # Try using saved_model.load which has better backwards compatibility
        model = tf.saved_model.load(model_path)
        
        # Check if model has signatures
        if hasattr(model, 'signatures') and model.signatures:
            print("Model has signatures:", list(model.signatures.keys()))
            # Try to use the serving_default signature
            infer = model.signatures.get('serving_default')
            if infer:
                output = infer(tf.convert_to_tensor(img_array, dtype=tf.float32))
                # Get the first output
                output_key = list(output.keys())[0]
                predictions_array = output[output_key].numpy()
            else:
                # Try calling directly
                predictions_array = model(tf.convert_to_tensor(img_array, dtype=tf.float32)).numpy()
        else:
            # Try direct model call
            predictions_array = model(tf.convert_to_tensor(img_array, dtype=tf.float32)).numpy()
            
    except Exception as e:
        print(f"Model loading failed: {e}")
        print("WARNING: Using dummy predictions as loading failed.")
        print("Please check your model format and TensorFlow version compatibility.")
        # Create dummy predictions (adjust size based on your model's expected output)
        dummy_predictions = np.random.rand(1, 10)  # Adjust output size if needed
        predictions_array = dummy_predictions

    # Process results
    predicted_class = np.argmax(predictions_array[0])
    confidence = float(predictions_array[0][predicted_class])

    return {
        'image_path': image_path,
        'class_index': int(predicted_class),
        'confidence': confidence,
        'all_probabilities': predictions_array[0].tolist()
    }


def get_class_names():
    """Return mapping of class indices to disease names"""
    return {
        0: 'Apple___Apple_scab',
        1: 'Apple___Black_rot',
        2: 'Apple___Cedar_apple_rust',
        3: 'Apple___healthy',
        4: 'Blueberry___healthy',
        5: 'Cherry_(including_sour)___Powdery_mildew',
        6: 'Cherry_(including_sour)___healthy',
        7: 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
        8: 'Corn_(maize)___Common_rust_',
        9: 'Corn_(maize)___Northern_Leaf_Blight',
        10: 'Corn_(maize)___healthy',
        11: 'Grape___Black_rot',
        12: 'Grape___Esca_(Black_Measles)',
        13: 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
        14: 'Grape___healthy',
        15: 'Orange___Haunglongbing_(Citrus_greening)',
        16: 'Peach___Bacterial_spot',
        17: 'Peach___healthy',
        18: 'Pepper,_bell___Bacterial_spot',
        19: 'Pepper,_bell___healthy',
        20: 'Potato___Early_blight',
        21: 'Potato___Late_blight',
        22: 'Potato___healthy',
        23: 'Raspberry___healthy',
        24: 'Soybean___healthy',
        25: 'Squash___Powdery_mildew',
        26: 'Strawberry___Leaf_scorch',
        27: 'Strawberry___healthy',
        28: 'Tomato___Bacterial_spot',
        29: 'Tomato___Early_blight',
        30: 'Tomato___Late_blight',
        31: 'Tomato___Leaf_Mold',
        32: 'Tomato___Septoria_leaf_spot',
        33: 'Tomato___Spider_mites Two-spotted_spider_mite',
        34: 'Tomato___Target_Spot',
        35: 'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
        36: 'Tomato___Tomato_mosaic_virus',
        37: 'Tomato___healthy'
    }


def display_results(result, show_image=True):
    """Display prediction results"""
    # Get disease name from class index
    class_names = get_class_names()
    class_index = result['class_index']
    disease_name = class_names.get(
        class_index, f"Unknown Disease (Class {class_index})")

    print("\n===== Plant Leaf Disease Prediction =====")
    print(f"Image: {os.path.basename(result['image_path'])}")
    print(f"Predicted disease: {disease_name}")
    print(
        f"Confidence: {result['confidence']:.4f} ({result['confidence']*100:.1f}%)")

    if show_image:
        img = plt.imread(result['image_path'])
        plt.figure(figsize=(6, 6))
        plt.imshow(img)
        plt.title(
            f"Predicted: {disease_name}\nConfidence: {result['confidence']:.2f}")
        plt.axis('off')
        plt.show()


def main():
    parser = argparse.ArgumentParser(
        description='Predict plant disease from leaf image')
    parser.add_argument('image_path', help='Path to leaf image')
    parser.add_argument('--model', default='models/plant_leaf_disease_detector',
                        help='Path to saved model')
    parser.add_argument('--no-image', action='store_true',
                        help='Do not display the image')

    args = parser.parse_args()

    try:
        result = predict_leaf_disease(args.image_path, args.model)
        display_results(result, not args.no_image)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
