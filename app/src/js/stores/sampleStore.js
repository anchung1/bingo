var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';
var READY_EVENT = 'ready';

var _store = {
    item: {}
};

var addItem = function(item){
    _store.item = item;
};

var sampleStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb) {
        console.log('add change listener');
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    },
    addReadyListener: function(cb) {
        this.on(READY_EVENT, cb);
    },
    removeReadyListener: function(cb) {
        this.removeListener(READY_EVENT, cb);
    },

    getItem: function() {
        return _store.item;
    }
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case appConstants.SAMPLE_ITEM:
            addItem(action.data);
            sampleStore.emit(CHANGE_EVENT);
            break;
        case appConstants.COMPONENT_READY:
            sampleStore.emit(READY_EVENT);
            break;
        case appConstants.SAVE_SOCKET_ID:
            console.log('SAVE SOCKET ID received in sample store ');
            break;
        default:
            return true;
    }
});

module.exports = sampleStore;