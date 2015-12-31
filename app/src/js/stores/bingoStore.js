var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';
var JOIN_EVENT = 'join';
var LEAVE_EVENT = 'leave';

var _store = {
    rooms: [],
    currentRoom: ''
};

var addItem = function(item){
    _store.rooms = item.rooms;
};

var bingoStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb) {
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    },
    joinListener: function(cb) {
        this.on(JOIN_EVENT, cb);
    },
    joinRemoveListener: function(cb) {
        this.removeListener(JOIN_EVENT, cb);
    },
    leaveListener: function(cb) {
        this.on(LEAVE_EVENT, cb);
    },
    leaveRemoveListener: function(cb) {
        this.removeListener(LEAVE_EVENT, cb);
    },
    getRooms: function() {
        return _store.rooms;
    },
    getCurrentRoom: function() {
        return _store.currentRoom;
    }
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case appConstants.BINGO_ROOMS:
            addItem(action.data);
            bingoStore.emit(CHANGE_EVENT);
            break;
        case appConstants.JOIN_ROOM:
            _store.currentRoom = action.data;
            bingoStore.emit(JOIN_EVENT);
            break;
        case appConstants.LEAVE_ROOM:
            _store.currentRoom = '';
            bingoStore.emit(LEAVE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = bingoStore;