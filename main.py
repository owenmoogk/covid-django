import requests
from bs4 import BeautifulSoup

class Data:
    def __init__(self):
        self.data = None
        self.getData()
    
    def getData(self):
        response = requests.get("https://www.worldometers.info/coronavirus/")
        self.data = BeautifulSoup(response.text, "html.parser")
        return(self.data)

    def getTotalCases(self):
        return(self.data.select(".maincounter-number")[0].findChildren('span')[0].decode_contents())

    def getTotalDeaths(self):
        return(self.data.select(".maincounter-number")[1].findChildren('span')[0].decode_contents())

    def getTotalRecovered(self):
        return(self.data.select(".maincounter-number")[2].findChildren('span')[0].decode_contents())

    def getTableHeadings(self, tableSelector):
        headings = self.data.select(tableSelector)[0].find_all('th')
        headings = [ele.text.strip() for ele in headings]
        return(headings)

    def getCountryData(self, country):
        headings = self.getTableHeadings("#main_table_countries_today")
        rows = self.data.select("#main_table_countries_today")[0].find_all('tr')
        data = {}
        for row in rows:
            cols = row.find_all('td')
            cols = [ele.text.strip() for ele in cols]
            countryData = [ele for ele in cols if ele]
            if not countryData:
                continue
            if countryData[1] == country:
                for i in range(len(countryData)):
                    data[headings[i]] = countryData[i]
                return(data)
        return(None)


def main():
    data = Data()
    print(data.getTotalCases())
    print(data.getTotalDeaths())
    print(data.getCountryData("Spain"))

main()