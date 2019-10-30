import React,  { Component } from 'react';
import classes from './CenterPortion.module.css';
import Functions from '../../containers/Other/Other';

class CenterPortion extends Component {

    render() {
        const current = this.props.weatherData.current;
        const hourly = this.props.weatherData.hourly;
        const timezone = this.props.weatherData.timezone;
        const humidity = (current.humidity * 100).toFixed(0);
        const precipitation = (current.precipProbability * 100).toFixed(0);

        const weatherIcon = Functions.getWeatherIcon(current.icon);
        let tempUnit, distanceUnit, speedUnit, visibility, windSpeed;

        if (this.props.units === 'Fahrenheit') {
            tempUnit = 'F';
            distanceUnit = 'miles';
            speedUnit = 'mph';
            visibility = current.visibility / 1.609;
            windSpeed = current.windSpeed / 1.609;
        } else {
            tempUnit = 'C';
            distanceUnit = 'km';
            speedUnit = 'km/h';
            visibility = current.visibility;
            windSpeed = current.windSpeed;
        }

        let hourlyWeather = hourly.weatherData.map(el => {
            let weatherIconHourly = Functions.getWeatherIcon(el.icon);
            let hour = new Date(el.time * 1000).toLocaleString("en-US", {timeZone: '' + timezone});
            hour = new Date(hour).getHours();

            return (
                <div className={classes.NextWeather} key={el.time}>
                    <i className={weatherIconHourly}></i>
                    <p>{Functions.changeTempUnitsHandler(el.temperature, this.props.units)}&deg;{tempUnit}</p>
                    <p>{Functions.convertTimeFormat(hour)}</p>
                </div>
            );
        })

        return (
            <div className={classes.CenterPortion}>
    
                <div className={classes.WeatherPrimary}>
                    <i className={weatherIcon}></i><h1>{Functions.changeTempUnitsHandler(current.temperature, this.props.units)}&deg;{tempUnit}</h1>
                    <p>{current.summary}</p>
                    <p>Feels Like: {Functions.changeTempUnitsHandler(current.feelsLike, this.props.units)}&deg;{tempUnit}</p>
                    <h2>{this.props.weatherData.cityName}</h2>
                </div>
    
                <div className={classes.WeatherSecondary}>
                    <p><b>Humidity:</b> {humidity}<span>%</span></p>
                    <p><b>Precipitation:</b> {precipitation}<span>%</span></p>
                    <p><b>Visibility:</b> {(Math.round(visibility)).toFixed(0)}<span> {distanceUnit}</span></p>
                    <p><b>Wind Speed:</b> {(Math.round(windSpeed)).toFixed(0)}<span> {speedUnit}</span></p>
                    <p><b>UV Index:</b> {current.uvIndex}</p>
                </div>

                <div className={classes.WeatherHourly}>
                    <p><b>Looking ahead:</b> {hourly.summary}</p>
                    <div>
                        {hourlyWeather}
                    </div>
                </div>
            </div>
        );
    }
};

export default CenterPortion;