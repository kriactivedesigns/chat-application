const server = require('http').createServer()
const io = module.exports.io = require('socket.io')(server)
const PORT = process.env.PORT || 3001
const SocketManager = require('./SocketManager')

io.on('connection', SocketManager)

server.listen(PORT, () => {
    console.log('Connected to port : ' + PORT)
})