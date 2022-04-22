//Express. js is a free and open-source web application framework for Node. js
const express = require('express');
//socketio is a library for sending data back and forth in realtime
const socketio =  require('socket.io');
//requiring an http server
const http = require('http');
//add it so that all socket will not be ignored
//cross origin resource sharing
const cors = require("cors")


const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');


const PORT = process.env.PORT || 5000

//importing the router
const router = require('./router')
//call the express function
const app = express();

//initialize the server
const server = http.createServer(app)
const io = socketio(server)


//socket is the instance of a client 
io.on('connection', (socket) =>{
    //server listen to the connection by specifying the event
    socket.on('join', ({name, room}, callback) =>{
        //calling the function in the socket method
        const {error, user} = addUser({id: socket.id, name, room});

        //data returned are error and data
        //because of that if we get an error, then we output the error message
        if(error) return callback(error)

        //admin generated messages and event are emitted from backend to frontend
        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`} );
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text:`${user.name} has joined`});

        //if thet are no error, it join a user in a room
        //join are built in socket method
        socket.join(user.room)
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user, room)})
        callback()
    });

    //user generated message and we are waiting for event to e recieved
    //arrow function are callback that are called when the event is performed
    socket.on('sendMessage', (message, callback)=>{
        const user = getUser(socket.id)

        //specify the room name to emit data
        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback()
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user) {
          io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
          io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    })
});

//middleware in creating express route
app.use(router);
app.use(cors())

//listening to the request
server.listen(PORT, () => console.log(`server is running on port ${PORT}`))