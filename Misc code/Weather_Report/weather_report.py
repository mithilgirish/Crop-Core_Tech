import requests

def get_weather(api_key, city_name):
    base_url = "http://api.openweathermap.org/data/2.5/weather"
    
    complete_url = f"{base_url}?q={city_name}&appid={api_key}&units=metric" 
    
    try:
        response = requests.get(complete_url)
        
        if response.status_code == 200:
            data = response.json()
            
            main = data['main']
            temperature = main['temp']
            pressure = main['pressure']
            humidity = main['humidity']
            weather_description = data['weather'][0]['description']
            
            print(f"City: {city_name}")
            print(f"Temperature: {temperature}°C")
            print(f"Pressure: {pressure} hPa")
            print(f"Humidity: {humidity}%")
            print(f"Weather Description: {weather_description.capitalize()}")
        
        else:
            print(f"Error: Unable to fetch weather data for {city_name}. Please check the city name or try again later.")
    
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")

if __name__ == "__main__":
    api_key = "your_api_key_here"
    
    city_name = input("Enter the city name: ")
    
    get_weather("1e1138a5659f5d4b50a10b733fc277b2", city_name)
