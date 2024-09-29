# market/views.py
from django.http import JsonResponse
import requests
from bs4 import BeautifulSoup
import pandas as pd
import logging

logger = logging.getLogger(__name__)

def get_market_prices(request):
    url = "https://vegetablemarketprice.com/market/tamilnadu/today"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes
    except requests.RequestException as e:
        logger.error(f"Failed to fetch data: {str(e)}")
        return JsonResponse({"error": f"Failed to fetch data: {str(e)}"}, status=500)

    try:
        # Parse the HTML content with BeautifulSoup
        soup = BeautifulSoup(response.text, "lxml")
        
        crop_details_list = []
        crop_details = soup.find_all("td")
        
        for crop_detail in crop_details:
            crop_details_list.append(crop_detail.text)
        
        # Filter out unwanted new lines
        crop_details_list = [i for i in crop_details_list if i != "\n\n\n"]
        
        # Extract relevant crop data
        crop_names_list = crop_details_list[:324:5]
        crop_wholesale_price_list = crop_details_list[1:324:5]
        crop_retail_price_list = crop_details_list[2:324:5]
        crop_units_list = crop_details_list[4:324:5]
        
        # Clean the crop names (remove anything inside parentheses)
        crop_names_updated_list = []
        for i in crop_names_list:
            crop_name_elements_list = []
            for j in i:
                if j == "(":
                    break
                else:
                    crop_name_elements_list.append(j)
            updated_crop_name = ''.join(crop_name_elements_list)
            crop_names_updated_list.append(updated_crop_name)
        
        # Create a DataFrame
        crop_market_analysis_df = pd.DataFrame({
            "CROP NAME": crop_names_updated_list,
            "UNITS": crop_units_list,
            "WHOLESALE PRICE": crop_wholesale_price_list,
            "RETAIL PRICE": crop_retail_price_list
        })
        
        # Convert the DataFrame to JSON-like format
        crop_market_analysis_json = crop_market_analysis_df.to_dict(orient="records")
        
        # Return the data as JSON response
        return JsonResponse(crop_market_analysis_json, safe=False)

    except Exception as e:
        logger.error(f"An error occurred while processing the data: {str(e)}")
        return JsonResponse({"error": f"An error occurred while processing the data: {str(e)}"}, status=500)