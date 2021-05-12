import React, {useState, useEffect} from 'react';
import './Message.css'


const Message = (props) => {
   let isSentByCurrentUser = false;

   const trimedName = props.name.trim().toLowerCase();

   if(props.message.user === trimedName){
    isSentByCurrentUser = true;
   }
    

    return (
        isSentByCurrentUser ?
        <div className ="messageContainer justifyEnd" >
            <p className="sentText">{trimedName}</p>
            <div className ="messageBox backgroundBlue">
                <p className="messageText colorWhite">{props.message.text}</p>
                </div>
        </div> :
        <div className ="messageContainer justifyStart">
            <div className ="messageBox backgroundLight">
                <p className="messageText colorDark">{props.message.text}</p>
            </div>
            <p className="sentText ">{props.message.user}</p>
        </div>
    )}

export default Message;