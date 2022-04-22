//importing hooks, useEffect is a hook that lets you use life cycle methods in function component
import React, {useState, useEffect} from 'react'
//importing querystring
import queryString from 'query-string'
//importing library for socket.io in the client
import io from 'socket.io-client'
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer';
let socket;


//we can use as many useeffect hook in out component
function Chat({location}) {

  const [name, setName ] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000'

  //it run after the component is rendered
  useEffect( ()=>{
    //querystring for retreiving data from the url and parsing data into object
    const {name, room}  = queryString.parse(location.search);
    
    socket = io(ENDPOINT)

    setName(name);
    setRoom(room);


    socket.emit('join', { name, room}, ()=>{
     
    });
    //second parameter allow us to specify when the use effect is called
    //we need to specify when our use effect is called
    //it means that it will only activate if the data the array change
  }, [ENDPOINT, location.search]);

  useEffect(()=>{
    socket.on('message', (message)=>{
      //adding every new messages to our messages array
      setMessages([...messages, message])
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  })

  //function for sending messages
  const sendMessage = (event) =>{
    event.preventDefault()

    if(message){
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  console.log(message, messages)
  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar  room={room}/>
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
      <TextContainer users={users}/>
    </div>
  )
}

export default Chat