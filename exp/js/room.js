var _ = require('lodash');
var Log = require('./log');

var logger = new Log('testlog.log');

function Rooms() {


    var rooms = [
        {name: 'Dora', socketList: []},
        {name: 'Boots', socketList: []},
        {name: 'Diego', socketList:[]},
        {name: 'Benny', socketList: []},
        {name: 'Tico', socketList: []}
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

        roomElem.socketList.push({name: name, user: username, sid: sid});
        return index;
    };

    this.leave = function(roomName, sid) {

        var index = this.name2Index(roomName);
        if (index===undefined) {
            logger.log('invalid room name: ' + roomName);
            return null;
        }

        var room = rooms[index];

        var removed = _.remove(room.socketList, function(elem) {
            return (elem.sid === sid);
        });


        return (removed.length);
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
}

module.exports = Rooms;