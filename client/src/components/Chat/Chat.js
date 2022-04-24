//importing hooks, useEffect is a hook that lets you use life cycle methods in function component
import React, {useState, useEffect} from 'react'
//importing querystring
import queryString from 'query-string'
//importing library for socket.io in the client and some other component
import io from 'socket.io-client'
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer';
let socket;


//we can use as many useeffect hook in out component
//adding a functional component passing in location as a props
function Chat({location}) {

  //creating hooks for name, rooom, users, message and messages
  const [name, setName ] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  //endpoint to connect client socket to server socket
  const ENDPOINT = 'https://stephen-chat.herokuapp.com/'

  //it run after the component is rendered
  useEffect( ()=>{
    //querystring for retreiving data from the url and parsing data into object
    const {name, room}  = queryString.parse(location.search);
    
    //creating the client socket by passing the server socket to interact it with
    socket = io(ENDPOINT)

    //set the name with the data gotten from the querystring
    setName(name);
    setRoom(room);

    //emit the data with the event name "join" and the data from querystring
    socket.emit('join', { name, room}, ()=>{
     
    });
    //second parameter allow us to specify when the use effect is called
    //we need to specify when our use effect is called
    //it means that it will only activate if the data the array change
  }, [ENDPOINT, location.search]);

  //another useeffect hook (its like component did mount)
  useEffect(()=>{
    //recieve a socket connection and add the data to the messages array
    socket.on('message', (message)=>{
      //adding every new messages to our existing messages
      setMessages([...messages, message])
    });

    //recieve socket response on the room to get all users as we send messages
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  })

  //function for sending messages to all users
  const sendMessage = (event) =>{
    event.preventDefault()

    if(message){
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  //creating our jsx with infoBar Messages section and  input

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