//react hooks are function that are passed into function based component
//with react hooks we can pass in state or life cycle component in our functional component
import React, {useState} from 'react';
//import link for creating link in jsx
import {Link} from 'react-router-dom';
//importing css
import './Join.css';

//Note: A css file can be loaded like "import ./join" calling the files require a className
//Note: A javascript file can be loaded different bacause calling javascript in jsx require a variable or some distructuring to pass in the data to be called

function Join() {
  const [name, setName ] = useState('');
  const [room, setRoom] = useState('');
  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <h1 className='heading'>Join</h1>
        <div><input placeholder='Name' className="joinInput" type="text" onChange={(event)=> setName(event.target.value)}></input></div>
        <div><input placeholder='Room' className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value) }></input></div>
        <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className="button mt-20" type='submit'>Sign in</button>
        </Link>
      </div>
    </div>
  )
}

export default  Join