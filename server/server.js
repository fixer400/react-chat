const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors')
const PORT = process.env.PORT || '3001'
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})
let corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
let rooms = []
class room{
  constructor(roomName){
    this.roomName = roomName;
    this.users = [];
    this.messages = [];
  }
}

function findRoom(roomName) {
  return rooms.find(room => room.roomName == roomName)
}

app.use(express.static(__dirname),cors(corsOptions))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
//Get message by room name
app.get('/messages/:roomid', (req,res) => {
  let currentRoomId = findRoom(req.params.roomid)
  res.send(currentRoomId.messages)
})
//Conncetion to sockets
io.on('connection', (socket) => {
  let currentRoomId
  socket.on('join server', (roomName) => {
    socket.join(roomName);
    if (findRoom(roomName) == undefined){
      rooms.push(new room(roomName = roomName))
    }
    currentRoomId = findRoom(roomName)
  })

  socket.on("send message", (data) => {
    currentRoomId.messages.push({
      userName:data.userName,
      message:data.message,
    })
    io.to(currentRoomId.roomName).emit("get messages")
  })
  
  socket.on('set user', (data) => {
    let name = data.name
    let id = socket.id
    currentRoomId.users.push({name,id})
    io.to(currentRoomId.roomName).emit('get users',currentRoomId.users)
  })

  socket.on('disconnect', () => {
    if (currentRoomId != undefined) {
      currentRoomId.users = currentRoomId.users.filter(user => user.id != socket.id)
      console.log(currentRoomId)
      io.to(currentRoomId.roomName).emit('get users', currentRoomId.users)
    }
  })
});

server.listen(PORT, () => {
  console.log('listening on *:3001');
});