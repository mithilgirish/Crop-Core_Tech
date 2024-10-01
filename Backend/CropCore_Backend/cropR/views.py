import os
import pickle
import numpy as np
import pandas as pd
import logging
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CropRecommendationSerializer

logger = logging.getLogger(__name__)

class CropRecommendationView(APIView):
    def post(self, request):
        logger.info(f"Received request data: {request.data}")
        serializer = CropRecommendationSerializer(data=request.data)
        
        if not serializer.is_valid():
            logger.error(f"Serializer errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Construct absolute path to the model file
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            model_path = os.path.join(base_dir, '..', 'AI', 'CropR', 'crop_recommendation_model.pkl')
            logger.info(f"Attempting to load model from: {model_path}")
            
            # Load the model
            with open(model_path, 'rb') as file:
                model = pickle.load(file)
            
            # Prepare input data
            input_data = np.array([[
                serializer.validated_data['N'],
                serializer.validated_data['P'],
                serializer.validated_data['K'],
                serializer.validated_data['temperature'],
                serializer.validated_data['humidity'],
                serializer.validated_data['ph'],
                serializer.validated_data['rainfall']
            ]])
            
            feature_names = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
            input_df = pd.DataFrame(input_data, columns=feature_names)

            logger.info(f"Input data: {input_df}")
            
            # Make prediction
            prediction = model.predict(input_df)
            logger.info(f"Model prediction: {prediction}")
            
            # Save recommendation to database
            recommendation = serializer.save(recommended_crop=prediction[0])
            
            if recommendation:
                return Response({
                    'recommended_crop': prediction[0],
                    }, status=status.HTTP_201_CREATED)
            else:
                logger.error("Failed to save recommendation.")
                return Response({
                    'error': 'Failed to save the recommendation.'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        except FileNotFoundError:
            logger.error(f"Model file not found at path: {model_path}")
            return Response({
                'error': 'Model file not found. Please check the file path.'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        except Exception as e:
            logger.exception("An unexpected error occurred")
            return Response({
                'error': f'An error occurred: {str(e)}'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
