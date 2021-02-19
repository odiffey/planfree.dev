const app = require('express')();
const http = require('http').createServer(app);
const short = require('short-uuid');
const io = require("socket.io")(http, {
    cors: {
      origin: "http://localhost:8081",
      methods: ["GET", "POST"]
    }
  });

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});


let players = [];

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    let roomId = socket.handshake.query['roomId'];
    if (!roomId) {
      roomId = short.generate();
      socket.emit('room', roomId); 
    }
    socket.join(roomId);

    players.push({id: socket.id, name: '', roomId: roomId});
    socket.on('name', (name) => {
      let player = players.find(p => p.id == socket.id);
      if (player) {
        player.name = name;
      }
      updateClientsInRoom(roomId);
    })

    socket.on('disconnect', () => {
      players = players.filter(player => player.id !== socket.id);
      updateClientsInRoom(roomId);
     });
});

function updateClientsInRoom(roomId) {
  console.log('Updating clients in room', roomId)
  const roomPlayers = players.filter(p => p.roomId == roomId);
  console.log(roomPlayers);
  io.to(roomId).emit('update', roomPlayers);
}

