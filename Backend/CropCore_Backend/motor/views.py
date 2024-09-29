from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
from django.http import JsonResponse

Motor = {"Power": 0, "WaterFlow": 0}
# API to receive sensor readings from ESP32
@api_view(['POST'])
def receive_sensor_data(request):
    # Assuming the ESP32 sends a JSON body with temperature, humidity, and moisture
    try:
        data = request.data
        temperatureC = data.get('temperatureC')
        humidity = data.get('humidity')
        moisturePercent = data.get('moisturePercent')

        # Handle the data (store in DB, process, etc.)
        # For simplicity, we'll just print it here.
        print(f"Received from ESP32 -> Temp: {temperatureC}°C, Humidity: {humidity}%, Moisture: {moisturePercent}%")

        return Response({"message": "Data received from ESP32"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# API to send motor control to ESP32
@api_view(['POST'])
def control_motor(request):
    # Example: {"command": "ON"} or {"command": "OFF"}
    try:
        command = request.data.get("command")
        if command not in ["ON", "OFF"]:
            return Response({"error": "Invalid command"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Assuming you'll use this response in the ESP32
        return Response({"motor_status": f"Motor turned {command}"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def update_motor(request, action):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            if action == 'power':
                motor_power = data.get('motorPower')
                Motor['Power'] = motor_power
                if motor_power is not None and 0 <= motor_power <= 100:
                    return JsonResponse({"motorPower": motor_power}, status=200)
                return JsonResponse({"error": "Invalid motor power value."}, status=400)

            elif action == 'waterflow':
                water_flow = data.get('waterFlow')
                Motor['WaterFlow'] = water_flow
                if water_flow is not None and 0 <= water_flow <= 10:
                    return JsonResponse({"waterFlow": water_flow}, status=200)
                return JsonResponse({"error": "Invalid water flow value."}, status=400)

            return JsonResponse({"error": "Invalid action."}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON."}, status=400)

    return JsonResponse({"error": "Invalid request method."}, status=405)

