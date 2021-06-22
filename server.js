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

let corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(express.static(__dirname))
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get('/users', (req,res) => {
  res.send(usersList)
})

io.on('connection', (socket) => {

  let id = socket.id

  socket.on("send message", (data) => {
    console.log(data)
    io.emit("get message", {
      userName:data.userName,
      message:data.message,
    })
  })

  socket.on('set user', (name) => {
    console.log(name)
    usersList.push({name,id})
      io.emit('get users',usersList)
  })

  socket.on('disconnect', () => {
    usersList = usersList.filter(user => user.id != socket.id)
    io.emit('get users', usersList)
  })
});

server.listen('3001', () => {
  console.log('listening on *:3001');
});
