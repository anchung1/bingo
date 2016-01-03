var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
    id: ''
};

var addItem = function(id){
    _store.id = id;

};

var socketIDStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb) {
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    },
    getID: function() {
        return _store.id;
    }
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case appConstants.SAVE_SOCKET_ID:
            addItem(action.data);
            socketIDStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = socketIDStore;