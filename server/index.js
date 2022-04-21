//Express. js is a free and open-source web application framework for Node. js
const express = require('express')
//socketio is a library for sending data back and forth in realtime
const socketio =  require('socket.io')
//requiring an http server
const http = require('http')
// var cors = require('cors')


const PORT = process.env.PORT || 5000

//importing the router
const router = require('./router')
//call the express function
const app = express();

//initialize the server
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) =>{
    console.log('we have a new connection')
    socket.on('disconnect', () => {
        console.log('User had left')
    })
});

//middleware in creating express route
app.use(router);


//listening to the request
server.listen(PORT, () => console.log(`server is running on port ${PORT}`))