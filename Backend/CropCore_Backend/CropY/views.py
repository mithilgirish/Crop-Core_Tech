from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import StateRainfall
from .serializers import StateRainfallSerializer, PredictionInputSerializer
import joblib
import numpy as np
from django.shortcuts import get_object_or_404

# Function to safely transform labels using the label encoder
def safe_transform(encoder, label):
    try:
        return encoder.transform([label])[0]
    except ValueError:
        return -1  # Default for unknown labels

@api_view(['POST'])
def predict_yield(request):
    serializer = PredictionInputSerializer(data=request.data)
    if serializer.is_valid():
        try:
            # Load the model and label encoders
            model_path = r'..\AI\CropY\model.pkl'
            crop_le_path = r'..\AI\CropY\label_encoder_crop.pkl'
            state_le_path = r'..\AI\CropY\label_encoder_state.pkl'
            season_le_path = r'..\AI\CropY\label_encoder_season.pkl'
            
            model = joblib.load(model_path)
            crop_le = joblib.load(crop_le_path)
            state_le = joblib.load(state_le_path)
            season_le = joblib.load(season_le_path)
        except FileNotFoundError as e:
            return Response({"error": f"File not found: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            # Extract data from the validated serializer
            crop = serializer.validated_data['crop']
            season = serializer.validated_data['season']
            state = serializer.validated_data['state']
            area = serializer.validated_data['area']
            fertilizer = serializer.validated_data['fertilizer']
            pesticide = serializer.validated_data['pesticide']

            # Encode the user inputs using the loaded label encoders
            crop_encoded = safe_transform(crop_le, crop)
            season_encoded = safe_transform(season_le, season)
            state_encoded = safe_transform(state_le, state)

            if crop_encoded == -1:
                return Response({"error": f"Unknown crop: {crop}"}, status=status.HTTP_400_BAD_REQUEST)
            if season_encoded == -1:
                return Response({"error": f"Unknown season: {season}"}, status=status.HTTP_400_BAD_REQUEST)
            if state_encoded == -1:
                return Response({"error": f"Unknown state: {state}"}, status=status.HTTP_400_BAD_REQUEST)

            # Fetch rainfall data from the StateRainfall model
            try:
                rainfall_data = StateRainfall.objects.get(state=state)
                rainfall = rainfall_data.annual_rainfall
            except StateRainfall.DoesNotExist:
                return Response({"error": f"No rainfall data found for the state: {state}"}, status=status.HTTP_400_BAD_REQUEST)

            # Prepare input data for the model
            input_data = np.array([[crop_encoded, season_encoded, state_encoded, area, rainfall, fertilizer, pesticide]]).reshape(1, -1)

            # Make the prediction using the trained model
            prediction = model.predict(input_data)[0]

            return Response({"predicted_yield": prediction}, status=status.HTTP_200_OK)
        
        except ValueError as ve:
            return Response({"error": f"Value error: {str(ve)}"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_dropdown_data(request):
    crops = [
        'Arecanut', 'Arhar/Tur', 'Castor seed', 'Coconut', 'Cotton(lint)',
        'Dry chillies', 'Gram', 'Jute', 'Linseed', 'Maize', 'Mesta',
        'Niger seed', 'Onion', 'Other Rabi pulses', 'Potato',
        'Rapeseed & Mustard', 'Rice', 'Sesamum', 'Small millets',
        'Sugarcane', 'Sweet potato', 'Tapioca', 'Tobacco', 'Turmeric',
        'Wheat', 'Bajra', 'Black pepper', 'Cardamom', 'Coriander',
        'Garlic', 'Ginger', 'Groundnut', 'Horse-gram', 'Jowar', 'Ragi',
        'Cashewnut', 'Banana', 'Soyabean', 'Barley', 'Khesari', 'Masoor',
        'Moong(Green Gram)', 'Other Kharif pulses', 'Safflower',
        'Sannhamp', 'Sunflower', 'Urad', 'Peas & beans (Pulses)',
        'Other oilseeds', 'Other Cereals', 'Cowpea(Lobia)',
        'Oilseeds total', 'Guar seed', 'Other Summer Pulses', 'Moth'
    ]  
    season = ["Rabi", "Kharif", "Whole Year", "Summer", "Autumn", "Winter"]
    states = StateRainfall.objects.values_list('state', flat=True)

    return Response({
        "crops": crops,
        "season": season,
        "states": list(states)
    })
