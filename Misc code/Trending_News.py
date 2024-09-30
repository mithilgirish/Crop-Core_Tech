from bs4 import BeautifulSoup
import requests
import pandas as pd
url="https://www.livemint.com/industry/agriculture"
htmlfile=requests.get(url)
soup=BeautifulSoup(htmlfile.text,"lxml")
title=soup.find('h1',class_="listheading")
te=soup.find_all('h2',class_="headline")
textlist=[]
time_to_read_list = []
links=[]
links2=[]
links3=[]
date_list = []
for t in te:
    textlist.append(t.text.strip())
timeinfo=soup.find_all('span',class_="fl date")
for t in timeinfo:

    time_date_list = t.text.replace("\n","").strip().split(".")

 
    if len(time_date_list) == 2:
        time_to_read_list.append(time_date_list[0].strip())
        date_list.append(time_date_list[1].strip())

link_tag1 = soup.find_all('h2',class_='headline')
for i in link_tag1:
    link_tag2=i.find_all('a')
    for j in link_tag2:
           if j and 'href' in j.attrs:
               links3.append(j['href'])

img_links = []

# Find all image containers
img_divs = soup.find_all('div', class_="thumbnail")

for img_div in img_divs:
    # Find the link containing the image
    a_tag = img_div.find('a', class_="imgSec")
    if a_tag:
        
        img_tag = a_tag.find('img')
        if img_tag and 'src' in img_tag.attrs:
            # Append the image URL to the list
            img_links.append(img_tag['src'])
print(img_links)

df = pd.DataFrame({"headline": textlist,"link":links3, "time to read": time_to_read_list, "date": date_list,"img":img_links})
print(df)