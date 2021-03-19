from bs4 import BeautifulSoup
import time, urllib.request, requests

url = "https://www.worldometers.info/coronavirus/"
response = requests.get(url)

soup = BeautifulSoup(response.text, "html.parser")

numberContainers = soup.select(".maincounter-number")

spanTags = []
for container in numberContainers:
    spanTags.append(container.findChildren("span"))

numbers = []
for container in spanTags:
    numbers.append(container[0].decode_contents())

for number in numbers:
    print(number)