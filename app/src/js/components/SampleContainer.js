var React = require('react');
var action = require('../actions/sampleActions');
var socketStore = require('../stores/socketIDStore');
var bingoStore = require('../stores/bingoStore');


var GameBoard = require('./GameBoard');
var Lobby = require('./Lobby');

var SampleContainer = React.createClass({

    getInitialState() {
        return {
            status: '',
            sid: ''
        }
    },

    componentDidMount: function() {
        console.log('Sample Container mount');
        socketStore.addChangeListener(this._wsCB);
        bingoStore.statusListener(this._statusCB);

        action.componentReady();

    },

    componentWillUnmount: function() {
        console.log('Sample Container unmount');
        socketStore.removeChangeListener(this._wsCB);
        bingoStore.statusRemoveListener(this._statusCB);


    },

    _wsCB: function () {
        this.setState({
            sid: socketStore.getID()
        });
    },

    statusHandler: function(status) {

        console.log('statusHandler: ' + status);

        this.setState({
            status: status
        });

    },

    _statusCB: function() {

        var status = bingoStore.getStatus();
        this.setState({
            status: status
        });

       /* if (status === 'Draw Done') {
            //action.clearGame();

        }*/
    },

    render: function () {

        if (this.state.status==='Starting') {
            return (
                <GameBoard>Board</GameBoard>
            );
        }

        return (
            <Lobby sid={this.state.sid} status={this.state.status}>Lobby</Lobby>
        );
    }

});

module.exports = SampleContainer;