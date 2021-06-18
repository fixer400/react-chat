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

usersList = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname))

io.on('connection', (socket) => {
  socket.emit('get users', (usersList))

  socket.on("send message", (data) => {
    console.log(data)

    io.emit("get message", {
      userName:data.userName,
      message:data.message,
    })
  })

  socket.on('set users', (data) => {
    console.log(data)
      usersList.push(data)
      io.emit('get users',[usersList])
    })
    
  console.log(socket.id)
});



server.listen(3001, () => {
  console.log('listening on *:3001');
});
