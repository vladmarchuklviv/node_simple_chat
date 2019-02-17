const express = require('express');
const app = new express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

server = app.listen(3000);

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.username = 'Anon';

    socket.on('change_username', (data) => {
        socket.username = data.username;
    });

    socket.on('new_message', (data) => {
        console.log('data', data);
        socket.emit('new_message', {'message': data.message, 'username': data.username});
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {username : socket.username})
    })
});

