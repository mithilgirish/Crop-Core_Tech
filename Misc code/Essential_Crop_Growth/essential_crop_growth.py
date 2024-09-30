import pandas as pd

data = {
    'Crop': ['Rice', 'Sugarcane', 'Cotton', 'Potato', 'Maize', 'Tomato', 'Onion', 'Tea'],
    'Rainfall': [
        'High (needs plenty of water)',
        'Mid (moderate rainfall)',
        'Low (light rainfall)',
        'Mid (moderate water)',
        'Mid (moderate rainfall)',
        'Mid (moderate water)',
        'Low (low to moderate water)',
        'High (heavy rainfall)'
    ],
    'Soil Type': [
        'Clay soil',
        'Loamy soil',
        'Black soil',
        'Sandy soil',
        'Well-drained soil',
        'Sandy loam soil',
        'Well-drained soil',
        'Acidic soil'
    ],
    'Season': [
        'Rainy season',
        'Start of summer',
        'Spring',
        'Cool weather',
        'Start of summer',
        'Warm weather',
        'Cool weather',
        'Spring'
    ],
    'Duration': [
        '4-5 months',
        '12-18 months',
        '6-8 months',
        '3-4 months',
        '3-4 months',
        '2-3 months',
        '5-6 months',
        '3-4 years (to start harvesting)'
    ],
    'Temperature': [
        '20-30°C (Optimal)',
        '20-40°C (Optimal)',
        '25-35°C (Optimal)',
        '15-25°C (Optimal)',
        '18-27°C (Optimal)',
        '20-25°C (Optimal)',
        '15-25°C (Optimal)',
        '20-30°C (Optimal)'
    ],
    'Water Management': [
        'Standing water (High)',
        'Frequent irrigation (Mid)',
        'Well-drained soil (Low)',
        'Frequent watering (Mid)',
        'Good drainage (Low)',
        'Consistent moisture (Mid)',
        'Water when dry (Low)',
        'Consistent moisture (Mid)'
    ],
    'Fertilizer': [
        'Nitrogen-rich',
        'Phosphorus-rich',
        'Potassium-rich',
        'Nitrogen and phosphorus',
        'Nitrogen and potassium',
        'Nitrogen and phosphorus',
        'Phosphorus-rich',
        'Balanced for tea plants'
    ],
    'Harvesting': [
        'When grains are hard and golden',
        'When stalks turn yellowish-brown',
        'When bolls open fully',
        'When leaves turn yellow and die',
        'When cobs are dry and kernels hard',
        'When fruits are red and firm',
        'When tops fall over and bulbs mature',
        'Young leaves every 7-15 days'
    ]
}

df = pd.DataFrame(data)

print(df)
