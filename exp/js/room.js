var _ = require('lodash');
var logger = require('./log');


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

    this.getRoom = function(name) {
        var index = this.name2Index(name);
        if (index===undefined) {return undefined;}
        return (rooms[index]);
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
            logger.log('invalid room name: ' + name);
            return null;
        }

        var roomElem = rooms[index];
        var sindex = _.findIndex(roomElem.socketList, function(elem) {
            return (elem.sid === sid);
        });

        if (sindex >=0 ) {
            //user exists
            logger.log('user exists: ' + sid);
            return null;
        }

        logger.log('join (name, username, sid): ' + name + ',' + username + ',' + sid);

        roomElem.socketList.push({name: name, user: username, sid: sid, ready: false});
        //console.log(roomElem.socketList);
        return index;
    };

    this.leave = function(sid) {

        var count = 0;
        rooms.forEach(function(room) {
            var removed = _.remove(room.socketList, function(elem) {
                return (elem.sid === sid);
            });

            if (removed.length) {
                count += removed.length;
                if (removed[0].ready) room.readyCount--;
                logger.log('leave (name, sid): ' + room.name + ',' + sid);
            }
        });

        //console.log(room.socketList);
        return (count);
    };

    this.showResidents = function(roomName) {

        var index = this.name2Index(roomName);
        if (index===undefined) {
            logger.log('invalid room name: ' + roomName);
            return null;
        }

        var names = rooms[index].socketList.map(function(elem) {
            return elem.user;
        });

        return names;
    };

    this.ready = function(roomName, sid, ready, nosockets) {

        logger.log('room ready');
        var index = this.name2Index(roomName);
        if (index===undefined) {
            logger.log('invalid room name: ' + roomName);
            return null;
        }

        var room = rooms[index];
        //check if sid is member of this room
        index = _.findIndex(room.socketList, function(elem) {
            return (elem.sid === sid);
        });

        if (index < 0) {
            logger.log('no such member: ' + sid);
            return null;
        }


        if (ready) {
            if (room.socketList[index].ready == false) {
                room.socketList[index].ready = true;
                room.readyCount++;
            }
            this.setupBroadcast(room, sid, nosockets);
        } else {
            if (room.socketList[index].ready == true) {
                room.socketList[index].ready = false;
                room.readyCount--;
            }
        }

        return true;
    };

    this.setupBroadcast = function(room, sid, nosockets) {

        if (nosockets) return;

        var global = require('./globalSave');
        var chdlr = global.connHandler;
        var sockets = chdlr.getSockets();

        if (room.readyCount < 2) {
            logger.log('waiting, more players needed', true);
            chdlr.sendMessage(sid, 'Waiting', 'More players needed.');
            return;
        }

        if (room.readyCount < room.socketList.length) {
            logger.log('waiting for ready from all players.', true);
            chdlr.sendMessage(sid, 'Waiting', 'Not all players ready.');
            return;
        }


        room.socketList.forEach(function(elem) {
            chdlr.sendMessage(elem.sid, 'Starting', "In 3 seconds.");
        });

        var Bingo = new (require('./bingo'))();
        logger.log('starting game', true);
        setTimeout(testFnc, 3000, [chdlr, room.socketList, Bingo, 10]);

    };

    function testFnc(list) {


        var chdlr = list[0];
        var sockets = list[1];
        var Bingo = list[2];
        var count = list[3];

        logger.log('' + count + ': firing testFnc', true);

        var value = Bingo.generate();
        if (value === null) {
            logger.log('no more balls', true);
            return;
        }

        sockets.forEach(function(elem) {
            chdlr.sendMessage(elem.sid, 'Draw', value);
        });

        count--;
        if (count > 0) {
            setTimeout(testFnc, 1000, [chdlr, sockets, Bingo, count]);
        } else {
            setTimeout(function() {
                sockets.forEach(function(elem) {
                    chdlr.sendMessage(elem.sid, 'Draw Done', '');
                });
                logger.log('Draw done', true);
            }, 2000);

        }

    }

}

module.exports = Rooms;