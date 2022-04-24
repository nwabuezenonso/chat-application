//importing react
//react-scroll-to-bottom to scroll page to the bottom
import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
//import message for the message box
import Message from '../Message/Message';
//import css file
import './Messages.css';

//function with props and mapping messages with a set of jsx
//The second arguement is basically the index of the array
const Messages = ({messages, name}) =>(
    <ScrollToBottom className="messages">
        {messages.map( (message, i) => <div key={i}><Message message={message} name={name} /></div>)}
    </ScrollToBottom>
)

export default Messages;