//importing hooks, useEffect is a hook that lets you use life cycle methods in function component
import React, {useState, useEffect} from 'react'
//importing querystring
import queryString from 'query-string'
//importing library for socket.io in the client
import io from 'socket.io-client'

let socket;

function Chat({location}) {

  const [name, setName ] = useState('');
  const [room, setRoom] = useState('');
  const ENDPOINT = 'localhost:5000'

  //it run after the component is rendered
  useEffect( ()=>{
    //querystring for retreiving data from the url and parsing data into object
    const {name, room}  = queryString.parse(location.search);
    
    socket = io(ENDPOINT)

    setName(name)
    setRoom(room)

    socket.emit()
    //second parameter allow us to specify when the use effect is called
    //we need to specify when our use effect is called
    //it means only that when the value changed that it will render the data
  }, [ENDPOINT, location.search])
  return (
    <div><h1>Chat</h1></div>
  )
}

export default Chat