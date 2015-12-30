var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
    rooms: []
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
    getRooms: function() {
        return _store.rooms;
    }
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case appConstants.BINGO_ROOMS:
            addItem(action.data);
            bingoStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = bingoStore;