import streamlit as st
import numpy as np
import pickle

# Load your trained model and encoders
with open('crop_yield_model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('label_encoder_crop.pkl', 'rb') as f:
    crop_encoder = pickle.load(f)

with open('label_encoder_state.pkl', 'rb') as f:
    state_encoder = pickle.load(f)

with open('label_encoder_season.pkl', 'rb') as f:
    season_encoder = pickle.load(f)

# Title of the web app
st.title("Crop Yield Prediction")

# Feature inputs
st.subheader("Enter the following details to predict the crop yield:")

# Taking inputs from the user
crop = st.selectbox("Crop", options=crop_encoder.classes_)
season = st.selectbox("Season", options=season_encoder.classes_)
state = st.selectbox("State", options=state_encoder.classes_)
area = st.number_input("Area (hectares)", min_value=0.0, step=0.1)
annual_rainfall = st.number_input("Annual Rainfall (mm)", min_value=0.0, step=0.1)
fertilizer = st.number_input("Fertilizer Usage (kg/ha)", min_value=0.0, step=0.1)
pesticide = st.number_input("Pesticide Usage (kg/ha)", min_value=0.0, step=0.1)

# Predict button
if st.button("Predict Yield"):
    # Encode categorical variables
    crop_encoded = crop_encoder.transform([crop])[0]
    season_encoded = season_encoder.transform([season])[0]
    state_encoded = state_encoder.transform([state])[0]

    # Prepare the feature vector for prediction
    features = np.array([[crop_encoded, season_encoded, state_encoded, area, annual_rainfall, fertilizer, pesticide]])

    # Predict yield using the loaded model
    predicted_yield = model.predict(features)

    # Display the predicted result
    st.subheader(f"Predicted Crop Yield: {predicted_yield[0]:.2f} tonnes/ha")

    # Optionally calculate and display the total production
    total_production = predicted_yield[0] * area
    st.write(f"Estimated Total Production: {total_production:.2f} tonnes")

# Add a note about the model's limitations
st.markdown("**Note:** This prediction is based on historical data and may not account for all current factors affecting crop yield.")