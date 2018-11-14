// const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocation } = require('./utils/message');
const indexRoute = require('../routes/index');

const PORT = process.env.PORT || 3001;
// const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.Server(app);

// app.use(express.static(publicPath));
app.use('/', indexRoute);

const io = socketIO(server);

io.on('connection', socket => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });

  socket.on('exposeLocation', location => {
    io.emit('newLocation', generateLocation('Admin', location.latitude, location.longitude));
  });

  socket.on('disconnect', () => {
    console.log('From server: User disconected')
  })
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));