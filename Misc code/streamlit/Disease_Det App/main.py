import os
import json
from PIL import Image

import numpy as np
import tensorflow as tf
import streamlit as st

# Load the pre-trained model
model_path = "DiseaseDetection.h5"
model = tf.keras.models.load_model(model_path)

# Load the class names
class_indices = json.load(open("class_indices.json"))


# Function to Load and Preprocess the Image using Pillow
def load_and_preprocess_image(image_path, target_size=(224, 224)):
    # Load the image
    img = Image.open(image_path)
    # Resize the image
    img = img.resize(target_size)
    # Convert the image to a numpy array
    img_array = np.array(img)
    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    # Scale the image values to [0, 1]
    img_array = img_array.astype('float32') / 255.
    return img_array


# Function to Predict the Class of an Image
def predict_image_class(model, image_path, class_indices):
    preprocessed_img = load_and_preprocess_image(image_path)
    predictions = model.predict(preprocessed_img)
    predicted_class_index = np.argmax(predictions, axis=1)[0]
    predicted_class_name = class_indices[str(predicted_class_index)]
    return predicted_class_name


# Streamlit App with page configuration and layout settings
st.set_page_config(page_title="Plant Disease Classifier", page_icon="🌿", layout="wide")

# Apply custom background CSS with white text for the uploaded image and classification result
page_bg_img = """
<style>
    [data-testid="stAppViewContainer"] {
        background-image: url('https://img.freepik.com/premium-photo/green-field-background-perfect-agriculture-outdoor-adventure-promotions-concept-agriculture-outdoor-adventure-green-field-promotions_918839-303663.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
        color: #f0f0f0;
    }

    [data-testid="stSidebar"] {
        background-color: #2E7D32;
    }

    h1 {
        color: #1B2631; /* Dark color for the main title */
        text-align: center;
    }

    h3 {
        color: #283747; /* Darker subtitle */
        text-align: center;
    }

    h4 {
        color: #FFFFFF; /* Full white for section titles */
    }

    .prediction {
        color: #FFD700; /* Light yellow for prediction text */
        text-align: center;
        font-size: 1.2em; /* Slightly larger text for emphasis */
    }

    .stButton>button {
        background-color: #4CAF50;
        color: white;
        border-radius: 10px;
        padding: 10px;
        transition: 0.3s ease;
    }

    .stButton>button:hover {
        background-color: #66BB6A;
        color: white;
    }

    footer {
        visibility: hidden;
    }
</style>
"""
st.markdown(page_bg_img, unsafe_allow_html=True)

# Main title in dark color
st.title('🌱 Plant Disease Classifier 🌿')

# Subtitle in dark color
st.markdown("<h3>Upload an image to classify plant diseases and improve agriculture with AI 🌾</h3>", unsafe_allow_html=True)

# File uploader
uploaded_image = st.file_uploader("Upload an image of the plant...", type=["jpg", "jpeg", "png"])

# Check if an image has been uploaded
if uploaded_image is not None:
    # Load and display the uploaded image
    image = Image.open(uploaded_image)
    col1, col2 = st.columns(2)

    with col1:
        st.markdown("<h4>Uploaded Image</h4>", unsafe_allow_html=True)
        resized_img = image.resize((250, 250))
        st.image(resized_img, caption='Uploaded Image', use_column_width=False, width=250)

    with col2:
        st.markdown("<h4>Classification Result</h4>", unsafe_allow_html=True)
        if st.button('🌿 Classify', help='Click to predict the plant disease'):
            with st.spinner('Classifying...'):
                # Preprocess the uploaded image and predict the class
                prediction = predict_image_class(model, uploaded_image, class_indices)
                st.markdown(f"<p class='prediction'>🌟 Prediction: {str(prediction)}</p>", unsafe_allow_html=True)
        else:
            st.markdown("<p style='text-align: center; color: lightgray;'>Click the button to classify the disease.</p>", unsafe_allow_html=True)

# Add a visual footer
st.markdown("<hr style='border:2px solid #8BC34A;'>", unsafe_allow_html=True)
