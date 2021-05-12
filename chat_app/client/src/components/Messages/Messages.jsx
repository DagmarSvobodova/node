import React, {useState, useEffect} from 'react';
//import ScrollToBottom from 'react-scroll';
import './Messages.css';
import Message from '../Message/Message';


const Messages = (props) => {
   

   return(
       <div>
           {props.messages.map((message, index) => 
           <div key={index}><Message message={message} name = {props.name}/></div>)}
       </div>
    )}

export default Messages;