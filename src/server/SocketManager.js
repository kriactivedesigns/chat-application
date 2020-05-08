const io = require('./index.js').io
const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../Events')
const { createUser, createMessage, createChat } = require('../Factories')

let connectedUsers = {}

module.exports = function(socket){
    console.log("Socket id " + socket.id)

    socket.on(VERIFY_USER, (nickname, callback) => {
        if(isUser(nickname, connectedUsers)){
            callback({isUser: true, user: null})
        }else{
            callback({isUser: false, user: createUser({name: nickname})})
        }
    })

    socket.on(USER_CONNECTED, (user) => {
        connectedUsers = addUser(connectedUsers, user)
        socket.user = user
        console.log(connectedUsers)
    })
}

function isUser(username, userList){
    return username in userList
}

function removeUser(userList, username){
    let newList = Object.assign({}, userList)
    delete newList[username]
    return newList
}

function addUser(userList, user){
    let newList = Object.assign({}, userList)
    newList[user.name] = user
    return newList
}