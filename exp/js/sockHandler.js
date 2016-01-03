var logger = require('./log');

'use strict';

function sockHandler(io) {

    var chdlr = new (require('./connHandler'));
    var global = require('./globalSave');
    global.connHandler = chdlr;

    this.roomControl = function() {
        return chdlr;
    };

    io.on('connection', function(socket) {


        logger.log('a user connected');
        chdlr.saveSocket(socket);

        logger.log('emit say hello');
        io.emit('say hello', 'hello');

        socket.on('disconnect', function() {
            logger.log('user disconnected');
            chdlr.removeSocket(socket);
        });

        socket.on('event', function(msg) {
            logger.log('event: event');
        });

        socket.on('room', function(roomName) {
            logger.log('event: room');
        });

        socket.on('connection count', function() {
            logger.log('connection count request');
            io.emit('connection count', chdlr.numActiveConnections());
        });

        socket.on('test', function() {
            var values = [1,2,3,4,5];

            //setTimeout(testFnc, 1000, [values, 0]);
            logger.log('test disconnect');
        });

        function testFnc(list) {

            logger.log('testFnc: ');
            logger.log(list);

            var values = list[0];
            var index = list[1];

            logger.log(values[index]);
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