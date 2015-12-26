var sio = require('socket.io');
'use strict';


function webSock(server) {
    var io = sio(server);

    io.on('connection', function(socket) {
        console.log('a user connected');

        socket.on('disconnect', function() {
            console.log('user disconnected');
        });

        socket.on('event', function(msg) {
            console.log('event: event');
        });

        socket.on('room', function(roomName) {
            console.log('event: room');
        });

    });


}


module.exports = webSock;