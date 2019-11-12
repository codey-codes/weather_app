const functions = {
    changeTempUnitsHandler: (input, units) => {
        if (units === 'Fahrenheit') {
            return Math.round(((input * 1.8) + 32));
        } else return Math.round(input);
    },
    getWeatherIcon: condition => { 
        let icon = "";
        switch (condition) {
            case "clear-day":
                icon = "fas fa-sun";
                break;
            case "clear-night":
                icon = "fas fa-moon";
                break;
            case "partly-cloudy-day":
                icon = "fas fa-cloud-sun";
                break;
            case "partly-cloudy-night":
                icon = "fas fa-cloud-moon";
                break;
            case "rain":
                icon = "fas fa-cloud-rain";
                break;
            case "snow":
                icon = "far fa-snowflake";
                break;
            case "sleet":
                icon = "fas fa-cloud-showers-heavy";
                break;
            case "wind":
                icon = "fas fa-wind";
                break;
            case "fog":
                icon = "fas fa-smog";
                break;
            case "cloudy":
                icon = "fas fa-cloud";
                break;
            case "hail":
                icon = "fas fa-ellipsis-h";
                break;
            case "thunderstorm":
                icon = "fas fa-bolt";
                break;
            case "tornado":
                icon = "fas fa-wind";
                break;
            default:
                break;
        }
        return icon;
    },
    getDayName: value => {
        if (value === 0) value = 'Sun'
        if (value === 1) value = 'Mon'
        if (value === 2) value = 'Tue'
        if (value === 3) value = 'Wed'
        if (value === 4) value = 'Thu'
        if (value === 5) value = 'Fri'
        if (value === 6) value = 'Sat'
        return value;
    },
    convertTimeFormat: time => {
        if (time === 0) time = 12 + 'AM';
        else if (time > 12) time = (time - 12) + 'PM';
        else if (time === 12) time = time + 'PM';
        else time = time + 'AM';
        return time;
    }
};

export default functions;