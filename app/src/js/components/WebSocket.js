var React = require('react');
var action = require('../actions/sampleActions');
var io = require('socket.io-client');
var store = require('../stores/sampleStore');
var wstore = require('../stores/socketIDStore');


function wsocket(io) {
    var socket = io();

    this.setupWebSocket = function() {
        socket.on('connect', function() {
            action.socketIDMsg(socket.id);
        });
    };

    this.testEvent = function() {
        socket.emit('test');
    };

    socket.on('connection count', function(v) {
        console.log('connection count: ' + v);
    });

    socket.on('Draw', function(v) {
        console.log('Draw: ' + v);
        action.ballDraw(v);
    });

    socket.on('Waiting', function(v) {
        console.log('Waiting: ' + v);
        action.updateRoomStatus('Waiting');
    });

    socket.on('Starting', function(v) {
        console.log('Starting: ' + v);
        action.updateRoomStatus('Starting');
    });

    socket.on('Draw Done', function(v) {
        console.log('DrawDone: ' + v);
        action.updateRoomStatus('Draw Done');
    });
}

var socket = new wsocket(io);
var WebSocket = React.createClass({

    componentDidMount: function() {
        store.addReadyListener(this._ready);
        wstore.addChangeListener(this._wsockReady);
        //setupWebSocket();
        //action.anAction('hello');
    },

    componentWillUnmount: function() {
        store.removeReadyListener(this._ready);
        wstore.removeChangeListener(this._wsockReady);
    },
    _ready: function() {
        console.log('READY');
        socket.setupWebSocket();
    },

    _wsockReady: function() {
        socket.testEvent();
    },

    render: function(){
        return (<div></div>);
    }

});

module.exports = WebSocket;