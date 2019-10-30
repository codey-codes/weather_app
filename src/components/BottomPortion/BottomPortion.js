import React, { Component } from 'react';
import Functions from '../../containers/Other/Other';
import classes from './BottomPortion.module.css';

class BottomPortion extends Component {

    render() {
        const daily = this.props.weatherData;
        let weatherIcon = '', tempUnit = '';
        if (this.props.units === 'Fahrenheit') tempUnit = 'F';    
        else tempUnit = 'C';

        const dailyWeather = daily.weatherData.map(el => {
            let day = new Date(el.time * 1000).getDay();
            day = Functions.getDayName(day);
            weatherIcon = Functions.getWeatherIcon(el.icon);
            return (
                <div className={classes.NextWeather} key={day}>
                    <i className={weatherIcon}></i>
                    <p>
                        {Functions.changeTempUnitsHandler(el.temperatureHigh, this.props.units)}&deg;{tempUnit}
                        /
                        {Functions.changeTempUnitsHandler(el.temperatureLow, this.props.units)}&deg;{tempUnit}
                    </p>
                    <p>{day}</p>
                </div>
            );
        })

        return (
            <div className={classes.BottomPortion}>
                <p><b>Next few days:</b> {daily.summary}</p>
                <div>
                    {dailyWeather}
                </div>
            </div>
        );
    };
};

export default BottomPortion;