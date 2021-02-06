import requests
import json
import pyttsx3
import speech_recognition as sr
import re
import threading
import time


apiKey = "tYCPYkLDBOMs"
projectToken = "tBbFmaho1yGZ"
runToken = "tT4gB5uCHerv"

class Data:
    def __init__(self, apiKey, projectToken):
        self.apiKey = apiKey
        self.projectToken = projectToken
        self.params = {
            "apiKey": self.apiKey 
        }
        self.getData()
    
    def getData(self):
        response = requests.get(f"https://www.parsehub.com/api/v2/projects/{projectToken}/run", params=self.apiKey)
        self.data = json.loads(response.text)
        return(self.data)

    def getTotalCases(self):
        data = self.data["total"]
        for content in data:
            if content["name"] == "Coronavirus Cases:":
                return(content["number"])

    def getTotalDeaths(self):
        data = self.data["total"]
        for content in data:
            if content["name"] == "Deaths:":
                return(content["number"])

    def getCountryData(self, country):
        data = self.data['countries']
        for content in data:
            if content["name"].lower() == country.lower():
                return(content)
        return("0")

    def getListOfCountries(self):
        countries = []
        for country in self.data["countries"]:
            countries.append(country['name'].lower())
        return(countries)

def speak(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()

def getAudio():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        audio = r.listen(source)
        said = ""
        try:
            said = r.recognize_google(audio)
        except Exception as e:
            print("Exception:", str(e))
    return(said.lower())

# speak("hello")
# print(getAudio())

# print(data.data)
# print(data.getTotalCases())
# print(data.getTotalDeaths())
# print(data.getCountryData("canada"))
# print(data.getListOfCountries())

def main():
    data = Data(apiKey, projectToken)
    countryList = data.getListOfCountries()

    totalPatterns = {
        re.compile("[\w\s]+ total cases"):data.getTotalCases,
        re.compile("[\w\s]+ total [\w\s]+ cases"):data.getTotalCases,
        re.compile("[\w\s]+ total deaths"):data.getTotalDeaths,
        re.compile("[\w\s]+ total [\w\s]+ deaths"):data.getTotalDeaths,
    }
    countryPatterns = {
        re.compile("[\w\s]+ cases [\w\s]"): lambda country: data.getCountryData(country)["cases"],
        re.compile("[\w\s]+ deaths [\w\s]"): lambda country: data.getCountryData(country)["deaths"],
        re.compile("cases [\w\s]"): lambda country: data.getCountryData(country)["cases"],
        re.compile("deaths [\w\s]"): lambda country: data.getCountryData(country)["deaths"],
    }

    print("Started Program")
    endPhrase = "stop"

    while True:
        print("Listening...")
        text = getAudio()
        print(text)
        result = None

        for pattern, func in totalPatterns.items():
            if pattern.match(text):
                result = func()
                break

        for pattern, func in countryPatterns.items():
            if pattern.match(text):
                words = set(text.split(" "))
                for country in countryList:
                    if country in words:
                        result = func(country)
                        break

        if result:
            print(result)
            speak(result)

        if text.find(endPhrase) != -1:
            print("exit")
            break

main()