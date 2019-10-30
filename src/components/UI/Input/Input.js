import React from 'react';
import classes from './Input.module.css';

const input = props => <input onKeyDown={props.pressed} onChange={props.changed} className={classes.Input} placeholder={props.content} autoComplete="off" autoFocus ></input>;

export default input;