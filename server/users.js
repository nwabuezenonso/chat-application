//we are creating helper function that are going to manage our users( addnguser, remvinguser, gettinguser )

const users = []


//all data are stored in the array function

//adding a addUser function
const addUser = ({id, name, room}) =>{
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //if the user exist with the same room and the same name
    const existingUser = users.find((user) => user.room === room && user.name === name)

    //display an error
    if(existingUser){
        return { error: 'Username is taken'}
    }

    //creating a variable for the username, room and is and push it to the array
    const user = {id, name, room}
    users.push(user)

    //return user
    return {user}
}

//function to remove user
const removeUser = (id) =>{
    //find user by id
    const index = users.findIndex( (user)=> user.id == id)

    //if index is not equal to -1
    //delete the element
    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

//function to get the user
const getUser = (id) => users.find((user) => user.id === id)   

//function to get user in a room
const getUsersInRoom = (room) => users.filter((user) => user.room === room)

module.exports = {addUser, removeUser, getUser, getUsersInRoom}