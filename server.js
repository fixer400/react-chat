const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

let usersList = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname))

io.on('connection', (socket) => {

let id = socket.id

  socket.on("send message", (data) => {
    console.log(data)
    io.emit("get message", {
      userName:data.userName,
      message:data.message,
    })
  })

  socket.on('set users', (name) => {
    console.log(name)
      usersList.push({name,id})
      console.log(usersList)
      io.emit('get users',usersList)
  })

  socket.on('disconnect', () => {
    console.log('loh')
    io.emit('user disconnected', (socket.id))
  })

  console.log(id)
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});
