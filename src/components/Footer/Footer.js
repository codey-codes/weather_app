import React from 'react';
import classes from './Footer.module.css';

const footer = () => (
    <div className={classes.Footer}>
        <span><a href="https://github.com/codey-codes/weather_app" target="_blank" rel='noreferrer noopener'>GitHub</a> </span>
        <span> | <a href="https://darksky.net/poweredby/" target="_blank" rel='noreferrer noopener'> DarkSky </a></span>
        <span> | <a href="https://opencagedata.com/" target="_blank" rel='noreferrer noopener'> OpenCage</a></span>
    </div>
);

export default footer;