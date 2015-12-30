var sio = require('socket.io');

'use strict';


function webSock(server) {
    var io = sio(server);

    var sockHandler = new (require('./sockHandler'))(io);
}

module.exports = webSock;