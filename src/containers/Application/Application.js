import React, { Component } from 'react';
import axios from 'axios';

import Config from '../Config/Config';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Results from '../../components/Results/Results';

import TopPortion from '../../components/TopPortion/TopPortion';
import CenterPortion from '../../components/CenterPortion/CenterPortion';
import BottomPortion from '../../components/BottomPortion/BottomPortion';
import Footer from '../../components/Footer/Footer';

import classes from './Application.module.css';

class Application extends Component {
    state = {
        homepage: true,
        searchTerm: '',
        showResults: false,
        showSpinner: false,
        city: null,
        units: 'Celsius',
        weatherData: {
            cityName: null,
            timezone: null,
            current: {
                feelsLike: null,
                humidity: null,
                icon: null,
                precipIntensity: null,
                precipProbability: null,
                summary: null,
                temperature: null,
                time: null,
                uvIndex: null,
                visibility: null,
                windSpeed: null
            },
            hourly: {
                weatherData: [],
                summary: null
            },
            daily: {
                weatherData: [],
                summary: null
            }
        },
        error: null
    }

    renderResultsHandler = query => {   // the method to show search results only
        axios.get('https://api.opencagedata.com/geocode/v1/json?key=' + Config.OpenCageKey + '&q=' + query)
        .then(response => { 
            if (response.data.total_results !== 0) {
                this.setState({ 
                    showResults: true, 
                    city: response.data.results, 
                    showSpinner: false, 
                    error: null 
                });
            }

            if (response.status !== 200) {
                this.setState({ 
                    showResults: true, 
                    error: 'Server not available at the moment. Please try again later.', 
                    showSpinner: false, 
                    city: null 
                })
            }

            if (response.status === 200 && response.data.total_results === 0) {
                this.setState({ 
                    showResults: true, 
                    error: 'No location found. Please try another term.', 
                    showSpinner: false, 
                    city: null 
                })
            }
        })
        .catch(err => {
            console.log('Error is: ' + err);
            this.setState({ 
                showResults: true, 
                error: 'Server not available at the moment. Please try again later.', 
                showSpinner: false, 
                city: null 
            }) 
        });
    }

    showResultsHandler = query => {     // just to display spinner until data is loaded
        this.setState({ showResults: true, showSpinner: true });
        this.renderResultsHandler(query);
    }

    weatherDataHandler = (query, cityName, timezone) => {   // the main method for loading weather data for a specific location
        const link = `${Config.Proxy}https://api.darksky.net/forecast/${Config.DarkSkyKey}/${query}?exclude=minutely,%20flags,%20alerts&units=ca`;
        axios.get(link)
        .then(response => {
            if (response.status === 200) {
                const currently = response.data.currently;
                const hourly = [], daily = [];
                for (let i = 0; i <= 5; i++) {
                    hourly[i] = response.data.hourly.data[i];
                    daily[i] = response.data.daily.data[i];
                }
    
                this.setState({
                    homepage: false, 
                    showResults: false,
                    showSpinner: false,
                    weatherData: {
                        cityName: cityName.split(',')[0],
                        timezone: timezone,
                        current: {
                            feelsLike: currently.apparentTemperature,
                            humidity: currently.humidity,
                            icon: currently.icon,
                            precipIntensity: currently.precipIntensity,
                            precipProbability: currently.precipProbability,
                            summary: currently.summary,
                            temperature: currently.temperature,
                            time: currently.time,
                            uvIndex: currently.uvIndex,
                            visibility: currently.visibility,
                            windSpeed: currently.windSpeed
                        },
                        hourly: {
                            weatherData: hourly,
                            summary: response.data.hourly.summary
                        },
                        daily: {
                            weatherData: daily,
                            summary: response.data.daily.summary
                        }
                    }
                });
                this.props.backgroundChanged(response.data.currently.icon);
            } else {
                this.setState({ error: 'Server not available at the moment. Please try again later.', showSpinner: false })
            }
        })
        .catch(err => {
            this.setState({ error: 'Server not available at the moment. Please try again later.', showSpinner: false });
            console.log('Error occured: ', err)
        });
    }

    showWeatherPageHandler = (key, name, timezone) => {     // just to display spinner until data is loaded
        this.setState({ showSpinner: true });
        this.weatherDataHandler(key, name, timezone);
    }

    switchUnits = unit => {
        if (unit === 'Celsi') this.setState({ units: 'Celsius' })
        else this.setState({ units: 'Fahrenheit' })
    }

    inputValueHandler = query => {  // updates the state as the data is entered in the input field
        this.setState({ searchTerm: query })
    }

    keyPressHandler = query => {    // as the name suggests, for handling Enter key in input field
        if (query.keyCode === 13) this.showResultsHandler(this.state.searchTerm);
    }

    render() {
        // the following variables are used to display/hide specific pages
        let homeClass = [classes.HomePageStyles, classes.Show].join(' '); 
        let resultsClass = [classes.Results, classes.Hide].join(' ');
        let weatherClass = [classes.WeatherPageStyles, classes.Hide].join(' ');

        let resultsList = '';
        let resultContent = <Spinner />;    // show spinner if there are no results

        if (!this.state.homepage) {    
            homeClass = [classes.HomePageStyles, classes.Hide].join(' ');
            weatherClass = [classes.WeatherPageStyles, classes.Show].join(' ');
        }

        if (this.state.showResults) resultsClass = [classes.Results, classes.Show].join(' ');

        if (this.state.city && !this.state.error) {     // if there is no error, we will load the location list. If there is an error, we can load the error message
            resultsList = this.state.city.map(el => {
                let keyDefined = el.geometry.lat + ',' + el.geometry.lng;   // making this a specific key and for each location and also can be used as a query for the API
                return (
                    <Results 
                        key={keyDefined}
                        error={false}
                        locationName={el.formatted}
                        clicked={() => this.showWeatherPageHandler(keyDefined, el.formatted, el.annotations.timezone.name)}
                    />
                )
            });
        } else resultsList = <Results error={this.state.error} />;
    
        if (!this.state.showSpinner) {
            resultContent = (
                <div className={classes.Child}>
                    <h3>Search Results</h3>
                    {resultsList} 
                </div>   
            );
        };

        return (
            <div className={classes.Application}>
                <div className={homeClass}>
                    <div>
                        <Input
                            changed={term => this.inputValueHandler(term.target.value)}
                            content={'Search by city name'}
                            pressed={term => this.keyPressHandler(term)}
                        />
                        <Button 
                            content={'Search'}
                            clicked={() => this.showResultsHandler(this.state.searchTerm)}
                        />
                    </div>
                    <div className={resultsClass}>
                        {resultContent}
                    </div>
                </div>

                <div className={weatherClass}>
                    <TopPortion
                        clickedC={() => this.switchUnits('Celsi')}
                        clickedF={() => this.switchUnits('Faren')}
                    />
                    <CenterPortion
                        weatherData={this.state.weatherData}
                        units={this.state.units}
                    />
                    <BottomPortion
                        weatherData={this.state.weatherData.daily}
                        units={this.state.units}
                    />
                    <Footer />
                </div>
            </div>
        );
    };
};

export default Application;