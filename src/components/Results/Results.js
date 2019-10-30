import React from 'react';
import classes from './Results.module.css';

const results = props => {
    if (props.error) return <p className={classes.Error}>{props.error}</p>
    else return <p className={classes.NoError} onClick={props.clicked}>{props.locationName}</p>
};

export default results;