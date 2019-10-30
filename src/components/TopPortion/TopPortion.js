import React from 'react';
import classes from './TopPortion.module.css';

const topPortion = props => (
    <div className={classes.TopPortion}>
        <div>
            <span onClick={props.clickedC} className={classes.Span} >C </span>
            | 
            <span onClick={props.clickedF} className={classes.Span}> F</span>
        </div>
    </div>
);

export default topPortion;