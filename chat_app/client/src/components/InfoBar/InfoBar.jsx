import React, {useState, useEffect} from 'react';
import './InfoBar.css'


const InfoBar = (props) => {
   

   return(
        <div className="infoBar">
            <div className="leftInnerContainer">
                <h3>{props.room}</h3>
            </div>
            <div className="rigthInnerContainer">
                <a href="/">Leave</a>
            </div>
        
    </div>
    )}

export default InfoBar;