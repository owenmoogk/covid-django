from django.shortcuts import render
import requests, json
from threading import *
from .models import Data
# Create your views here.

# helper for covid stuff
def getNums():
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

    data = Data.objects.all()[0]
    data.cases = numbers[0]
    data.deaths = numbers[1]
    data.recovered = numbers[2]
    data.save()
    print("i got here")

def homeView(request):
    t1 = Thread(target=getNums)
    t1.start()
    data = Data.objects.all()[0]
    context = {
        "cases": data.cases,
        "deaths": data.deaths,
        "recovered": data.recovered
    }
    return render(request, "home.html", context)