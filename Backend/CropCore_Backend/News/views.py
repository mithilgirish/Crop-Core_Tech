# myapp/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from bs4 import BeautifulSoup
import requests
import pandas as pd

class LiveMintScraper(APIView):
    def get(self, request):
        url = "https://www.livemint.com/industry/agriculture"
        htmlfile = requests.get(url)
        soup = BeautifulSoup(htmlfile.text, "lxml")
        
        title = soup.find('h1', class_="listheading")
        te = soup.find_all('h2', class_="headline")
        textlist = []
        time_to_read_list = []
        links3 = []
        date_list = []

        for t in te:
            textlist.append(t.text.strip())

        timeinfo = soup.find_all('span', class_="fl date")
        for t in timeinfo:
            time_date_list = t.text.replace("\n", "").strip().split(".")
            if len(time_date_list) == 2:
                time_to_read_list.append(time_date_list[0].strip())
                date_list.append(time_date_list[1].strip())

        link_tag1 = soup.find_all('h2', class_='headline')
        for i in link_tag1:
            link_tag2 = i.find_all('a')
            for j in link_tag2:
                if j and 'href' in j.attrs:
                    links3.append(j['href'])

        img_links = []
        img_divs = soup.find_all('div', class_="thumbnail")
        for img_div in img_divs:
            a_tag = img_div.find('a', class_="imgSec")
            if a_tag:
                img_tag = a_tag.find('img')
                if img_tag and 'src' in img_tag.attrs:
                    img_links.append(img_tag['src'])

        # Create DataFrame
        df = pd.DataFrame({
            "headline": textlist,
            "link": links3,
            "time to read": time_to_read_list,
            "date": date_list,
            "img": img_links
        })

        # Convert DataFrame to JSON and return
        return Response(df.to_dict(orient='records'))

