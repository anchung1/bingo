var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';
var JOIN_EVENT = 'join';
var LEAVE_EVENT = 'leave';
var ROOM_STATUS_EVENT = 'status';
var BALL_EVENT = 'ballEvent';

var action = require('./../actions/sampleActions');

var _store = {
    rooms: [],
    currentRoom: '',
    status: '',
    balls: [],
    currentBall: ''
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
    getCurrentRoom: function() {
        return _store.currentRoom;
    },


    ballListener: function(cb) {
        this.on(BALL_EVENT, cb);
    },
    ballRemoveListener: function(cb) {
        this.removeListener(BALL_EVENT, cb);
    },
    getBall: function() {
        return _store.currentBall;
    },
    getBalls: function() {
        return _store.balls;
    },


    statusListener: function(cb) {
        this.on(ROOM_STATUS_EVENT, cb);
    },
    statusRemoveListener: function(cb) {
        this.removeListener(ROOM_STATUS_EVENT, cb);
    },
    getStatus: function() {
        return _store.status;
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

            if (_store.status !== '') {
                _store.status = '';
                bingoStore.emit(ROOM_STATUS_EVENT);
            }
            break;
        case appConstants.LEAVE_ROOM:
            _store.currentRoom = '';
            bingoStore.emit(LEAVE_EVENT);
            break;

        case appConstants.ROOM_STATUS:
            _store.status = action.data;
            if (action.data==='Draw Done') {
                _store.status = '';
                _store.currentRoom = '';
                _store.balls = [];
            }

            bingoStore.emit(ROOM_STATUS_EVENT);
            break;

        case appConstants.BALL_DRAW:
            _store.currentBall = action.data;
            _store.balls.push(action.data);
            bingoStore.emit(BALL_EVENT);
            break;
        case appConstants.CLEAR_GAME:
            _store.balls = [];
            break;

        default:
            return true;
    }
});

module.exports = bingoStore;