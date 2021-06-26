const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors')
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

let usersList = [];
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

let corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(express.static(__dirname),cors(corsOptions))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get('/messages/:roomid', (req,res) => {
  console.log(req.params.roomid)
  let currentRoomId = findRoom(req.params.roomid)
  res.send(currentRoomId.messages)
})


io.on('connection', (socket) => {
  let id = socket.id
  let currentRoomId

  socket.on('join server', (roomName) => {
    socket.join(roomName);
    currentRoomId = roomName
    if (rooms.find(room => room.roomName == roomName) == undefined){
      rooms.push(new room(roomName = roomName))
    }
    currentRoomId = findRoom(roomName)
    console.log(currentRoomId)
  })

  socket.on("send message", (data) => {
    console.log(data)
    currentRoomId.messages.push({
      userName:data.userName,
      message:data.message,
    })
    io.to(currentRoomId.roomName).emit("get messages")
  })
  
  socket.on('set user', (data) => {
    let name = data.name
    currentRoomId.users.push({name,id})
    io.to(currentRoomId.roomName).emit('get users',currentRoomId.users)
  })

  socket.on('disconnect', () => {
    currentRoomId.users = currentRoomId.users.filter(user => user.id != socket.id)
    console.log(currentRoomId)
    io.to(currentRoomId.roomName).emit('get users', currentRoomId.users)
  })
});

server.listen('3001', () => {
  console.log('listening on *:3001');
});
