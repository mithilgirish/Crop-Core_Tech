import pandas as pd

# Define the data with simplified descriptions
data = {
    'Scheme Name': [
        'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
        'Revised National Agricultural Insurance Scheme (R-NAIS)',
        'Weather-Based Crop Insurance Scheme (WBCIS)',
        'National Agricultural Insurance Scheme (NAIS)',
        'Kisan Credit Card (KCC) Insurance',
        'Crop Insurance for Organic Farmers'
    ],
    'Objective': [
        'Protects against crop loss due to natural disasters, pests, and diseases.',
        'Covers losses from natural disasters and crop failures.',
        'Insures crops against damage from weather events like drought or excessive rain.',
        'Provides coverage for losses from natural disasters and pests.',
        'Insurance for crops financed through Kisan Credit Card loans.',
        'Special insurance for crops grown using organic methods.'
    ],
    'Coverage': [
        'Losses before and after harvest.',
        'Losses before harvest.',
        'Based on weather conditions like rainfall and temperature.',
        'Covers losses from various natural causes and pests.',
        'For crops covered under Kisan Credit Card loans.',
        'Insurance designed for organic farming practices.'
    ],
    'Premium Subsidy': [
        'Yes, government subsidizes premiums.',
        'Yes, government subsidizes premiums.',
        'Yes, government subsidizes premiums.',
        'Yes, government subsidizes premiums.',
        'Yes, government subsidizes premiums.',
        'Yes, government subsidizes premiums.'
    ],
    'Claim Settlement Basis': [
        'Based on crop yield data and actual loss assessment.',
        'Based on area yield data and loss assessment.',
        'Based on weather index data for rainfall and temperature.',
        'Based on crop yield data and loss assessment.',
        'Linked to the Kisan Credit Card loan system.',
        'Tailored for organic farming techniques and crops.'
    ]
}

# Create the DataFrame
df = pd.DataFrame(data)

# Display the DataFrame
print(df)
