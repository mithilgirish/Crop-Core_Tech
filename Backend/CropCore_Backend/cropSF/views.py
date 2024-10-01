import os
import pickle
import pandas as pd
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SoilFertilitySerializer

class SoilFertilityPredictionView(APIView):
    def post(self, request):
        serializer = SoilFertilitySerializer(data=request.data)
        if serializer.is_valid():
            try:
                # Load the model
                base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
                model_path = os.path.join(base_dir, '..', 'AI', 'CropSF', 'model_SF.pkl')
                with open(model_path, 'rb') as f:
                    model = pickle.load(f)

                # Prepare input data
                input_data = pd.DataFrame([serializer.validated_data])

                # Make prediction
                prediction = model.predict(input_data)

                # Map prediction to fertility level
                fertility_mapping = {
                    0: 'Less Fertile',
                    1: 'Medium Fertile',
                    2: 'High Fertile'
                }
                fertility_level = fertility_mapping.get(prediction[0], 'Unknown')

                # Save prediction to database
                prediction_instance = serializer.save(predicted_fertility=fertility_level)

                return Response({
                    'predicted_fertility': fertility_level,
                }, status=status.HTTP_201_CREATED)

            except FileNotFoundError:
                return Response({
                    'error': 'Model file not found. Please check the file path.'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            except Exception as e:
                return Response({
                    'error': f'An error occurred: {str(e)}'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)