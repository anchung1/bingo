var _ = require('lodash');
var Log = require('./log');
var logger = new Log('testlog.log');


function Rooms() {


    var rooms = [
        {name: 'Dora', socketList: [], readyCount: 0},
        {name: 'Boots', socketList: [], readyCount: 0},
        {name: 'Diego', socketList:[], readyCount: 0},
        {name: 'Benny', socketList: [], readyCount: 0},
        {name: 'Tico', socketList: [], readyCount: 0}
    ];

    this.name2Index = function(name) {
        if (name==='Dora') return 0;
        if (name==='Boots') return 1;
        if (name==='Diego') return 2;
        if (name==='Benny') return 3;
        if (name==='Tico') return 4;
        return undefined;
    };

    this.index2name = function(index) {
        return rooms[index].name;
    };


    this.roomList = function() {
        var names = rooms.map(function(elem) {
            return elem.name;
        });

        return names;
    };

    this.join = function(name, username, sid) {

        var index = this.name2Index(name);
        if (index===undefined) {
            //logger.log('invalid room name: ' + name);
            return null;
        }

        var roomElem = rooms[index];
        var sindex = _.findIndex(roomElem.socketList, function(elem) {
            return (elem.sid === sid);
        });

        if (sindex >=0 ) {
            //user exists
            //logger.log('user exists: ' + sid);
            return null;
        }

        //logger.log('join (name, username, sid): ' + name + ',' + username + ',' + sid);

        roomElem.socketList.push({name: name, user: username, sid: sid});
        //console.log(roomElem.socketList);
        return index;
    };

    this.leave = function(roomName, sid) {

        var index = this.name2Index(roomName);
        if (index===undefined) {
            //logger.log('invalid room name: ' + roomName);
            return null;
        }

        var room = rooms[index];

        var removed = _.remove(room.socketList, function(elem) {
            return (elem.sid === sid);
        });

        //console.log(room.socketList);
        //logger.log('leave (name, sid): ' + roomName + ',' + sid);
        return (removed.length);
    };

    this.showResidents = function(roomName) {

        var index = this.name2Index(roomName);
        if (index===undefined) {
            //logger.log('invalid room name: ' + roomName);
            return null;
        }

        var names = rooms[index].socketList.map(function(elem) {
            return elem.user;
        });

        return names;
    };

    this.ready = function(roomName, sid, ready) {
        console.log('room ready');
        var index = this.name2Index(roomName);
        if (index===undefined) {
            //logger.log('invalid room name: ' + roomName);
            console.log('no such room: ' + roomName);
            return null;
        }

        var room = rooms[index];
        console.log(room);
        //check if sid is member of this room
        index = _.findIndex(room.socketList, function(elem) {
            console.log(elem);
            return (elem.sid === sid);
        });

        if (index < 0) {
            console.log('no such member: ' + sid);
            return null;
        }

        if (ready) {
            room.readyCount++;
            this.setupBroadcast(room);
        } else {
            room.readyCount--;
        }
        return 1;
    };

    this.setupBroadcast = function(room) {

        if (room.readyCount < 2) {
            return;
        }

        var values = ['b4', 'i23', 'n40', 'g58', 'o62'];
        var roomSockets = [];

        var global = require('./globalSave');
        var chdlr = global.connHandler;
        var sockets = chdlr.getSockets();


        room.socketList.forEach(function(elem) {
             var index = _.findIndex(sockets, function(elem1) {
                 return (elem1.id === elem.sid);
             });

            console.log(sockets[index].id);
            roomSockets.push(sockets[index].socket);
        });


        var Bingo = new (require('./bingo'))();
        if (room.readyCount === room.socketList.length) {
            console.log('starting game');
            setTimeout(testFnc, 1000, [roomSockets, Bingo, 100]);
        }

    };

    function testFnc(list) {


        var sockets = list[0];
        var Bingo = list[1];
        var count = list[2];

        console.log('' + count + ': firing testFnc');

        var value = Bingo.generate();
        sockets.forEach(function(elem) {
            elem.emit('test values', value);
        });

        count--;
        if (count > 0) {
            setTimeout(testFnc, 1000, [sockets, Bingo, count]);
        } else {
            console.log('testFnc done');
        }

    }

}

module.exports = Rooms;