var React = require('react');
var io = require('socket.io-client');

var socket = io();

function setupWebSocket() {
    socket.on('connect', function() {
        console.log('connected');
    });


}

var WebSocket = React.createClass({

    componentDidMount: function() {
        setupWebSocket();
    },

    render: function(){
        return (<div></div>);
    }

});

module.exports = WebSocket;