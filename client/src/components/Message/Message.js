import React from 'react';

import './Message.css';


//if we are loading multiple files and we are also loading some logic we use braces
const Message = ({message: { user, text}, name}) =>{
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName){
        isSentByCurrentUser = true
    }

    return (
        //ternary operator (meaning if it is true then it render something)
        isSentByCurrentUser 
        ? (
            <div className="messageContainer justifyEnd">
                <p className='sentText pr-10'>{trimmedName}</p>
                <div className="messageBox backgroundBlue" >
                    <p className='messageText colorWhite'>{text}</p>
                </div>
            </div>
        ) : (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className='messageText colorDark'>{text}</p>
                </div>
                <p className='sentText pl-10'>{user}</p>
            </div>
        )
    )
}

export default Message;