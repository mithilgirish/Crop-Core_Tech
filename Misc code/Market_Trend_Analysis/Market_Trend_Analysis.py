import requests
from bs4 import BeautifulSoup
import pandas as pd

url = "https://vegetablemarketprice.com/market/tamilnadu/today"

response = requests.get(url).text

soup = BeautifulSoup(response, "lxml")

crop_details_list = []

crop_details = soup.find_all("td")

for crop_detail in crop_details:
    crop_details_list.append(crop_detail.text)

crop_details_list = [i for i in crop_details_list if i != "\n\n\n"]

crop_names_list = crop_details_list[: 324: 5]
crop_wholesale_price_list = crop_details_list[1: 324: 5]
crop_retail_price_list = crop_details_list[2: 324: 5]
crop_units_list = crop_details_list[4: 324: 5]

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

crop_market_analysis_df = pd.DataFrame({"CROP NAME": crop_names_updated_list, "UNITS":crop_units_list, "WHOLESALE PRICE": crop_wholesale_price_list, "RETAIL PRICE": crop_retail_price_list})

print(crop_market_analysis_df)