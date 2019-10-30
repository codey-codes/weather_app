# Weather App

## Description: ##
This is my first React project which is a weather app that can be used to get basic weather information on thousands of locations all over the globe. This app allows users to search for weather information using a city name which will provide a list of possible cities for that name and the users will then be able to select which city, for weather information, they are looking for. 

## Features: ##
1. Thousands of locations can be searched for, using this app.
2. Basic weather information for the chosen city will be displayed. This information includes:
    2a. Current weather condition i.e. sunny, cloudy, rainy etc.
    2b. Current temperature
    2c. Current apparent temperature AKA Feels Like
    2d. Current humidity level in %
    2e. Current precipitaion in %
    2f. Wind speed
    2g. Visibility
    2h. UV Index
    2i. Weather conditions and temperatures for the next few hours
    2j. Weather conditions with high and low temperatures for the next six days
3. The search option works according to the algorithms used by OpenCage and always the most popular results are shown in order
4. The units can be converted within the app. The units available are SI (chosed by default) and Imperial.

## Usage: ##
As this is a single page website with old data getting replaced by new one, the 'Back' button will not take you back to the homepage. Please refresh the page if you want to search for a different location.

## POSSIBLE FUTURE UPDATES ##
1. Weather alerts is not a feature of this app yet. These severe weather alerts for US, Canada, European Union member nations and Israel can be added in future releases
2. Minute-by-minute data can be generated for more accurate forecast
3. Search by latitude and longitude can be added
4. More weather information can also be provided which may include storm warning, nearest storm distance, atmospheric pressure, cloud cover, dew point, precipitation rate, moon phase, sun rise/set and much more

## Other Notes: ##

### What is happening in the background ###
Two API services are used for this app, [DarkSky](https://darksky.net/poweredby/) and [OpenCage](https://opencagedata.com/). DarkSky is the primary source for all the weather information but unfortunately, this service does not provide searching for a location by name but by latitude and longitude data only. To address this issue, another API service was used, called OpenCage, that provides latitude and longitude details by searching for a city by its name. To make it more user-friendly, the search feature used in this app lets users to search by city name, hence using the OpenCage functionality. Thus, this app will call OpenCage API for data, only after user searches for a city and DarkSky will only be called for a specific city when user selects that city.

### Environments used: ###

1. ReactJS: used to develop this whole app which then automatically generates the HTML, CSS and JavaScript files
2. NodeJS: as a Node Package Manager (npm)