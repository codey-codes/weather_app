import React, { Component } from 'react';
import classes from './Background.module.css';
import Video from '../../assets/videos/default.mp4';

class Background extends Component {

    render() {
        let backgroundVideo = (
            <video className={classes.Video} autoPlay loop muted play="true">
                <source src={Video} type="video/mp4"></source>
                Video Playback Failed!
            </video>
        );

        let backgroundClass = '';

        switch (this.props.condition) {
            case 'clear-night':
                backgroundClass = [classes.Image, classes.ClearNight].join(' ');
                break;
            case 'clear-day':
                backgroundClass = [classes.Image, classes.Clear].join(' ');
                break;
            case 'snow':
                backgroundClass = [classes.Image, classes.Snow].join(' ');
                break;
            case 'cloudy':
                backgroundClass = [classes.Image, classes.Cloudy].join(' ');
                break;
            case 'partly-cloudy-day':
                backgroundClass = [classes.Image, classes.CloudyDay].join(' ');
                break;
            case 'partly-cloudy-night':
                backgroundClass = [classes.Image, classes.CloudyNight].join(' ');
                break;
            case 'rain':
                backgroundClass = [classes.Image, classes.Rain].join(' ');
                break;
            case 'wind':
                backgroundClass = [classes.Image, classes.Windy].join(' ');
                break;
            case 'sleet':
                backgroundClass = [classes.Image, classes.Snow].join(' ');
                break;
            case 'fog':
                backgroundClass = [classes.Image, classes.Fog].join(' ');
                break;
            case 'hail':
                backgroundClass = [classes.Image, classes.Hail].join(' ');
                break;
            case 'thunderstorm':
                backgroundClass = [classes.Image, classes.Thunder].join(' ');
                break;
            case 'tornado':
                backgroundClass = [classes.Image, classes.Tornado].join(' ');
                break;
            default:
                break;
        }

        return (
            <div classes={classes.Background}>
                {backgroundClass ? <div className={backgroundClass}></div> : backgroundVideo}
            </div>
        );
    };
};

export default Background;