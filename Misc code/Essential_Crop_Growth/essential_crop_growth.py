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
    'Seed Rate': [
        '60-80 kg per hectare',
        'Stem cuttings',
        '15-20 kg per hectare',
        '25-30 quintals per hectare',
        '20-25 kg per hectare',
        '200-250 grams per hectare',
        '4-5 kg per hectare',
        'N/A'
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
    'Weeding': [
        'Regularly',
        'Regularly',
        'Regularly',
        'Keep weed-free',
        'Regularly',
        'Keep weed-free',
        'Keep weed-free',
        'N/A'
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
    ],
    'Disease Management': [
        'Monitor for Blast, Sheath Blight',
        'Monitor for Red Rot, Smut',
        'Check for Fusarium Wilt, Bacterial Blight',
        'Watch for Late Blight, Early Blight',
        'Monitor for Corn Rust, Blight',
        'Check for Late Blight, Mosaic Virus',
        'Monitor for Downy Mildew, Basal Rot',
        'Check for Blister Blight, Root Rot'
    ],
    'Pest Control': [
        'Watch for Rice Weevil',
        'Protect against Sugarcane Borer',
        'Monitor for Bollworms',
        'Manage Colorado Potato Beetle',
        'Watch for Maize Weevil',
        'Manage Tomato Hornworms',
        'Watch for Onion Maggots',
        'Monitor for Tea Mites'
    ]
}

df = pd.DataFrame(data)

print(df)
