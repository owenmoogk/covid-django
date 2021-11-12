from django.shortcuts import render
from .models import Data
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from bs4 import BeautifulSoup 
import requests
from django.utils.timezone import datetime

# helper for covid stuff
def getNums():

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
    return

@api_view(['GET'])
def getData(request):

    # if the data has not been updated today then we need to do so.
    data = Data.objects.all()[0]
    if not str(data.lastUpdated) in str(datetime.today()):  
        getNums()

    context = {
        "cases": data.cases,
        "deaths": data.deaths,
        "recovered": data.recovered
    }
    return Response(context, status=status.HTTP_200_OK)