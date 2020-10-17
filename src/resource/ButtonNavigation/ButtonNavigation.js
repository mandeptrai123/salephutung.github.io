
import React from 'react'
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

// import css
import './css/ButtonNavigation.css';

function ButtonNavigation(props) {
    console.log(props.link)

    const style = {
        backgroundColor: props.bgColor,
        boxShadow: props.boxShadow
    }

    return(
        <Router>
            <Link to={props.link} className='btn-click-me' style={style}>
                {props.content}
                {/* <button type='button' className='btn-click-me' style={style}>{props.content}</button> */}
            </Link>
        </Router>
    );
}

export default ButtonNavigation;