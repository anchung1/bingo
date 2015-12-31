var React = require('react');
var action = require('../actions/sampleActions');
var socketStore = require('../stores/socketIDStore');
var bingoStore = require('../stores/bingoStore');

var RoomElem = require('./RoomElem');
var _ = require('lodash');



var SampleContainer = React.createClass({

    getInitialState: function() {
        return {
            sid: '',
            userName: 'Nick',
            rooms: []
        };
    },

    componentDidMount: function() {
        socketStore.addChangeListener(this._wsCB);
        bingoStore.addChangeListener(this._bingoCB);
        bingoStore.joinListener(this._joinCB);
        bingoStore.leaveListener(this._leaveCB);
        action.componentReady();

    },

    componentWillUnmount: function() {
        socketStore.removeChangeListener(this._wsCB);

        bingoStore.addChangeListener(this._bingoCB);
        bingoStore.joinRemoveListener(this._joinCB);
        bingoStore.leaveRemoveListener(this._leaveCB);
    },

    _wsCB: function() {
        this.state.sid = socketStore.getID();
    },

    _bingoCB: function() {
        var rooms = bingoStore.getRooms();

        var newRooms = rooms.map(function(elem) {
            return ({room: elem, disabled: true});
        });

        this.setState({
            rooms: newRooms
        });

    },

    registerRoom: function(enabled) {
        var room = bingoStore.getCurrentRoom();

        var i = _.findIndex(this.state.rooms, function(elem) {
            return (elem.room === room);
        });


        if ( i < 0 ) {
            console.log('registerRoom (enabled, name) ' + enabled + ',' + room);
            return;
        }

        var rooms = this.state.rooms;
        rooms[i].disabled = !enabled;
        this.setState({
            rooms: rooms
        });
    },

    _joinCB: function() {
        this.registerRoom(true);
    },

    _leaveCB: function() {
        this.registerRoom(false);
    },

    /*liClick: function(index, event) {

        /!*console.log(index);
        console.log(event.target);
        console.log(event.currentTarget);*!/
    },*/

    press: function() {
        action.getRooms();
    },

    roomClick: function(i) {

        var roomName = this.state.rooms[i].room;
        var currentRoom = bingoStore.getCurrentRoom();

        if (roomName !== currentRoom) {
            action.leaveRoom(currentRoom, this.state.sid);
            this._leaveCB();

            action.joinRoom(roomName, this.state.userName, this.state.sid);
        } else {
            console.log('same room.  no leave/join performed.');
        }

    },

    render: function(){

        if (this.state.rooms.length) {

           var rooms = this.state.rooms.map(function(item, i) {

               var disabled = '';
               if (item.disabled) {
                   disabled = 'disabled';
               }

                return (
                    <RoomElem key={i} handler={this.roomClick.bind(this, i)} disabled={disabled}>{item.room}</RoomElem>
                );

            }.bind(this));
        }

        return (
            <div id="sc">
                <h3>BINGO WORLD</h3>
                <button onClick={this.press}>Check Rooms</button>
                <ul>
                    {rooms}
                </ul>
            </div>
        )
    }
});

module.exports = SampleContainer;