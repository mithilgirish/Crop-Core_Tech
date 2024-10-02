import streamlit as st
import pandas as pd
import pickle

# Load the model
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

# Define the mapping for fertility
fertility_mapping = {
    0: 'Less Fertile',
    1: 'Medium Fertile',
    2: 'High Fertile'
}

# Function to predict soil fertility
def predict_with_input(user_input):
    input_data = pd.DataFrame([user_input])
    prediction = model.predict(input_data)
    mapped_output = fertility_mapping.get(prediction[0], 'Unknown')
    return mapped_output

# Streamlit app
st.set_page_config(page_title="Soil Fertility Prediction", layout="centered")
st.title("🌱 Soil Fertility Prediction 🌱")
st.write("Enter the soil parameters below:")

# User input fields with customized styling
st.markdown("""
<style>
    .stTextInput>div>input {
        background-color: #f9f9f9;
        border: 1px solid #4CAF50;
        border-radius: 5px;
        padding: 10px;
    }
    .stTextInput>div>label {
        color: #4CAF50;
        font-weight: bold;
    }
    .stButton>button {
        background-color: #4CAF50;
        color: white;
        padding: 15px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }
    .stButton>button:hover {
        background-color: #45a049;
    }
    .stSuccess {
        color: #4CAF50;
        font-weight: bold;
        font-size: 18px;
    }
    footer {
        text-align: center;
        background-color: #4CAF50; /* Green background */
        color: black; /* Black text */
        padding: 10px;
        border-radius: 5px;
        margin-top: 20px;
    }
</style>
""", unsafe_allow_html=True)

# User input fields with icons
st.markdown("### Soil Parameters 🌾")
N = st.number_input("🌿 Nitrogen (N)", min_value=0, value=100)
P = st.number_input("🌼 Phosphorus (P)", min_value=0, value=20)
K = st.number_input("🌾 Potassium (K)", min_value=0, value=30)
pH = st.number_input("🧪 Soil pH", min_value=0.0, value=6.5)
EC = st.number_input("⚡ Electrical Conductivity (EC)", min_value=0.0, value=1.2)
OC = st.number_input("🍂 Organic Carbon (OC)", min_value=0.0, value=2.0)
S = st.number_input("🌍 Sulfur (S)", min_value=0.0, value=5.0)
Zn = st.number_input("🧱 Zinc (Zn)", min_value=0.0, value=0.5)
Fe = st.number_input("🔩 Iron (Fe)", min_value=0.0, value=1.0)
Cu = st.number_input("🪙 Copper (Cu)", min_value=0.0, value=0.3)
Mn = st.number_input("🔧 Manganese (Mn)", min_value=0.0, value=0.4)
B = st.number_input("🌙 Boron (B)", min_value=0.0, value=0.2)

# Prepare the user input for prediction
user_input = {
    'N': N,
    'P': P,
    'K': K,
    'pH': pH,
    'EC': EC,
    'OC': OC,
    'S': S,
    'Zn': Zn,
    'Fe': Fe,
    'Cu': Cu,
    'Mn': Mn,
    'B': B
}

# Button for prediction
if st.button("🔮 Predict Fertility"):
    output = predict_with_input(user_input)
    st.success(f'Predicted Output: {output}')

# Footer
st.markdown("""
    <footer>
        <p>© 2024 Soil Fertility Prediction App</p>
    </footer>
""", unsafe_allow_html=True)
