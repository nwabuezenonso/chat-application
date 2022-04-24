//importing react file from react
import React from 'react';
//importing message file
import './Message.css';

//if we are loading several function and we are also loading some logic and  we use braces
const Message = ({message: { user, text}, name}) =>{

    //create a boolean variable
    let isSentByCurrentUser = false;

    //trimmed name variable
    const trimmedName = name.trim().toLowerCase();

    //conditional statement if the user == name of the sender
    if(user === trimmedName){
        isSentByCurrentUser = true
    }

    return (
        //ternary operator (meaning if it is true then it render content and styling sent by user)
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