import streamlit as st
import pandas as pd
import numpy as np
import pickle
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

# Load the saved model
with open('crop_recommendation_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Custom CSS for styling
st.markdown(
    """
    <style>
    body {
        background-image: url('bg.avif');
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center;
        color: #2e7d32;  /* Dark green font color */
        font-family: 'Arial', sans-serif;  /* Font style */
    }
    h1, h2, h3 {
        color: #1b5e20;  /* Darker green for headers */
    }
    .stButton>button {
        background-color: #66bb6a;  /* Button color */
        color: white;  /* Button text color */
        border-radius: 5px;  /* Rounded button corners */
        padding: 10px;  /* Button padding */
    }
    .stButton>button:hover {
        background-color: #43a047;  /* Button hover color */
    }
    .input-field {
        border: 1px solid #66bb6a;  /* Input field border color */
        border-radius: 5px;  /* Rounded input corners */
        padding: 10px;  /* Input field padding */
    }
    .icon {
        vertical-align: middle;
        margin-right: 8px;  /* Space between icon and text */
    }
    </style>
    """,
    unsafe_allow_html=True,
)

# Set the title of the app
st.title("🌾 Crop Recommendation System")

# Create input fields for user input
st.header("🔍 Enter the following details:")

# User inputs for the features
n = st.number_input("Nitrogen (N) in kg/ha", min_value=0.0, key='nitrogen', help="Enter nitrogen value.")
p = st.number_input("Phosphorus (P) in kg/ha", min_value=0.0, key='phosphorus', help="Enter phosphorus value.")
k = st.number_input("Potassium (K) in kg/ha", min_value=0.0, key='potassium', help="Enter potassium value.")
temperature = st.number_input("Temperature in °C", min_value=0.0, key='temperature', help="Enter temperature.")
humidity = st.number_input("Humidity (%)", min_value=0.0, key='humidity', help="Enter humidity percentage.")
ph = st.number_input("pH value of the soil", min_value=0.0, key='ph_value', help="Enter pH value of soil.")
rainfall = st.number_input("Rainfall in mm", min_value=0.0, key='rainfall', help="Enter rainfall in mm.")

# Prepare the input for prediction
sample_input = np.array([[n, p, k, temperature, humidity, ph, rainfall]])
feature_names = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
sample_df = pd.DataFrame(sample_input, columns=feature_names)

# Button to predict
if st.button("🔮 Predict"):
    # Make prediction
    prediction = model.predict(sample_df)
    st.success(f"🌱 Recommended crop: {prediction[0]}")

# Display accuracy score (optional)
if st.button("📈 Check Model Accuracy"):
    # Load the dataset
    crop_recommendation_df = pd.read_csv('Crop_recommendation.csv')
    
    # Split features and target
    features = crop_recommendation_df[crop_recommendation_df.columns.drop("label")]
    target = crop_recommendation_df["label"]
    
    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.1, random_state=42)
    
    # Make predictions and check the score
    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)
    st.info(f"✅ Model Accuracy Score: {accuracy:.2f}")

# Footer
st.write("📜 This application provides crop recommendations based on soil and weather conditions.")
