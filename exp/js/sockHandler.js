'use strict';

function sockHandler(io) {

    var chdlr = new (require('./connHandler'));
    var global = require('./globalSave');
    global.connHandler = chdlr;

    this.roomControl = function() {
        return chdlr;
    };

    io.on('connection', function(socket) {


        console.log('a user connected');
        chdlr.saveSocket(socket);

        console.log('emit say hello');
        io.emit('say hello', 'hello');

        socket.on('disconnect', function() {
            console.log('user disconnected');
            chdlr.removeSocket(socket);
        });

        socket.on('event', function(msg) {
            console.log('event: event');
        });

        socket.on('room', function(roomName) {
            console.log('event: room');
        });

        socket.on('connection count', function() {
            console.log('connection count request');
            io.emit('connection count', chdlr.numActiveConnections());
        });

        socket.on('test', function() {
            var values = [1,2,3,4,5];

            //setTimeout(testFnc, 1000, [values, 0]);
            console.log('test disconnect');
        });

        function testFnc(list) {

            console.log('testFnc: ');
            console.log(list);

            var values = list[0];
            var index = list[1];

            console.log(values[index]);
            //io.emit('test values', values[index]);
            socket.emit('test values', values[index]);
            index++;
            if (index < values.length) {
                setTimeout(testFnc, 1000, [values, index]);
            }
        }

    });
}

module.exports = sockHandler;