import streamlit as st
import pandas as pd
import numpy as np
import pickle

# Load the saved model
with open('model.pkl', 'rb') as file:
    loaded_model = pickle.load(file)

# Load the saved LabelEncoders
with open('label_encoder_crop.pkl', 'rb') as file:
    le_crop = pickle.load(file)
with open('label_encoder_state.pkl', 'rb') as file:
    le_state = pickle.load(file)
with open('label_encoder_season.pkl', 'rb') as file:
    le_season = pickle.load(file)

# Extract feature names from the model
feature_names = loaded_model.feature_names_in_

# Function to safely encode labels
def safe_transform(encoder, label):
    try:
        return encoder.transform([label])[0]
    except ValueError:
        # Return a default value (e.g., -1) for unseen labels
        return -1

# Streamlit app
st.markdown(
    """
    <style>
    body {
        background-color: #f4f4f4;  /* Light background color */
        color: #2e7d32;  /* Dark green text */
        font-family: 'Arial', sans-serif;
    }
    h1 {
        color: #1b5e20;  /* Darker green for title */
        text-align: center;
    }
    .stButton > button {
        background-color: #66bb6a;  /* Button color */
        color: white;
        border-radius: 5px;
        padding: 10px 20px;
        margin-top: 20px;
    }
    .stButton > button:hover {
        background-color: #43a047;  /* Button hover color */
    }
    .input-field {
        margin-bottom: 20px;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

st.title('🌾 Crop Yield Prediction')

# Create input fields for each feature
user_input = {}
for feature in feature_names:
    if feature == 'Crop':
        user_input[feature] = st.selectbox('🌱 Select Crop', le_crop.classes_)
    elif feature == 'State':
        user_input[feature] = st.selectbox('🏞️ Select State', le_state.classes_)
    elif feature == 'Season':
        user_input[feature] = st.selectbox('🌦️ Select Season', le_season.classes_)
    else:
        user_input[feature] = st.number_input(f'📊 Enter {feature}', min_value=0.0, key=feature)

if st.button('🔮 Predict Yield'):
    # Encode the categorical inputs
    user_input['Crop'] = safe_transform(le_crop, user_input['Crop'])
    user_input['State'] = safe_transform(le_state, user_input['State'])
    user_input['Season'] = safe_transform(le_season, user_input['Season'])

    # Prepare the input data for prediction
    user_features = pd.DataFrame([user_input], columns=feature_names)

    # Make the prediction
    prediction = loaded_model.predict(user_features)
    
    st.success(f"🌾 Predicted Yield: {prediction[0]:.2f} kg/ha")  # Assuming yield is in kg/ha

st.sidebar.header('About')
st.sidebar.info('This app predicts crop yield based on various factors using a Random Forest model. 🌾')

# Footer information
st.sidebar.write("🔗 Visit our website for more information.")
