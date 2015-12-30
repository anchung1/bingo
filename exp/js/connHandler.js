var _ = require('lodash');


function RoomControl() {

    var sockets = [];

    function printSocketList() {
        sockets.forEach(function(s) {
            console.log(s.id);
        })
    }

    this.saveSocket = function(socket) {
        var index = _.findIndex(this.sockets, function(sock) {
            return sock.id === socket.id;
        });

        if (index < 0) {
            sockets.push({socket: socket, id: socket.id});
        }

        printSocketList();
    };

    this.removeSocket = function(socket) {

        _.remove(sockets, function(sock) {

            return (sock.id === socket.id);
        });

        printSocketList();
    };

    this.numActiveConnections = function() {
        return sockets.length;
    }
}


module.exports = RoomControl;