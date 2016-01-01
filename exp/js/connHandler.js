var _ = require('lodash');
var Log = require('./log');

var logger = new Log('testlog.log');



function ConnHandler() {

    var sockets = [];

    function printSocketList() {
        logger.log('Start printSocketList:');
        sockets.forEach(function(s) {
            logger.log(s.id);
        });

        logger.log('End printSocketList');
    }

    this.saveSocket = function(socket) {
        var index = _.findIndex(this.sockets, function(sock) {
            return sock.id === socket.id;
        });

        if (index < 0) {
            sockets.push({socket: socket, id: socket.id});
        }

        logger.log('add: ' + socket.id);
    };

    this.removeSocket = function(socket) {

        _.remove(sockets, function(sock) {

            return (sock.id === socket.id);
        });

        logger.log('remove: ' + socket.id);
        printSocketList();
    };

    this.numActiveConnections = function() {
        return sockets.length;
    };

    this.getSockets = function() {
        return sockets;
    }
}


module.exports = ConnHandler;