const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 5000;
const router = require('./routes/router')

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const cors = require('cors')
const {
    addUser,
    removeUser,
    getUser,
    getUserInRoom
} = require('./controllers/users.controller');

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        if (error)
            return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined ` });
        socket.join(user.room);

        callback();
    });
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emmit('message', { user: user.name, text: message });

        callback();

    });

    socket.on('disconnect', () => {
        console.log('User had left!!!');
    });
});
app.use(cors())
app.use(router);

server.listen(PORT, () => console.log(`Server has started on potrt ${PORT}`));