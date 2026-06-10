from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import os

app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model("plant_disease_model.h5")

class_names = [
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Tomato_healthy",
    
]

solutions = {
    "Potato___Early_blight": "Apply Mancozeb fungicide. Remove infected leaves and avoid overhead watering.",
    "Potato___Late_blight": "Apply Chlorothalonil or Copper-based fungicide. Remove infected plants and improve air circulation.",
    "Tomato___healthy": "Plant is healthy. No pesticide required. Continue regular watering and monitoring."
    
}

def preprocess_image(image):
    image = image.resize((224, 224))
    image = np.array(image)
    image = image / 255.0
    image = np.expand_dims(image, axis=0)
    return image

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        if not data or "image" not in data:
            return jsonify({
                "message": "Image path is required"
            }), 400

        image_path = data["image"]

        # backend/uploads/image.jpg
        full_path = os.path.join(
            "..",
            "backend",
            image_path
        )

        if not os.path.exists(full_path):
            return jsonify({
                "message": "Image not found",
                "path": full_path
            }), 404

        image = Image.open(full_path).convert("RGB")

        processed_image = preprocess_image(image)

        predictions = model.predict(processed_image)

        predicted_index = np.argmax(predictions[0])
        confidence = round(float(np.max(predictions[0])) * 100, 2)

        disease = class_names[predicted_index]

        solution = solutions.get(
            disease,
            "Consult agriculture expert for suitable treatment."
        )

        return jsonify({
            "disease": disease.replace("___", " ").replace("_", " "),
            "confidence": f"{confidence}%",
            "solution": solution
        })

    except Exception as e:
        return jsonify({
            "message": "Prediction failed",
            "error": str(e)
        }), 500

@app.route("/", methods=["GET"])
def home():
    return "AI Service Running with Real Model"

if __name__ == "__main__":
    app.run(port=5001, debug=True)