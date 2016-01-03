var React = require('react');
var action = require('../actions/sampleActions');
var bingoStore = require('../stores/bingoStore');

var _ = require('lodash');


var RoomElem = require('./RoomElem');

var Lobby = React.createClass({
    getInitialState: function () {
        return {
            userName: 'Nick',
            rooms: [],
            activeIndex: -1
        };
    },

    componentDidMount: function () {
        bingoStore.addChangeListener(this._bingoCB);
        bingoStore.joinListener(this._joinCB);
        bingoStore.leaveListener(this._leaveCB);
        action.leaveRoom(this.props.sid);

    },

    componentWillUnmount: function () {

        bingoStore.removeChangeListener(this._bingoCB);
        bingoStore.joinRemoveListener(this._joinCB);
        bingoStore.leaveRemoveListener(this._leaveCB);
    },



    _bingoCB: function () {
        var rooms = bingoStore.getRooms();

        var newRooms = rooms.map(function (elem) {
            return ({room: elem, disabled: true});
        });

        this.setState({
            rooms: newRooms
        });

    },

    registerRoom: function (enabled) {
        var room = bingoStore.getCurrentRoom();

        var i = _.findIndex(this.state.rooms, function (elem) {
            return (elem.room === room);
        });


        if (i < 0) {
            console.log('registerRoom (enabled, name) ' + enabled + ',' + room);
            return;
        }

        var rooms = this.state.rooms;
        rooms[i].disabled = !enabled;
        this.setState({
            rooms: rooms
        });
    },

    _joinCB: function () {
        this.registerRoom(true);
    },

    _leaveCB: function () {
        this.registerRoom(false);
    },

    /*liClick: function(index, event) {

     /!*console.log(index);
     console.log(event.target);
     console.log(event.currentTarget);*!/
     },*/

    press: function () {
        action.getRooms();
    },

    roomClick: function (i) {

        var roomName = this.state.rooms[i].room;
        var currentRoom = bingoStore.getCurrentRoom();

        if (roomName !== currentRoom) {
            action.leaveRoom(this.props.sid);
            this._leaveCB();

            action.joinRoom(roomName, this.state.userName, this.props.sid);
            this.setState({
                activeIndex: i
            });
        } else {
            console.log('same room.  no leave/join performed.');
        }

    },

    readyClick: function(i, event) {
        event.stopPropagation();
        var roomName = this.state.rooms[i].room;

        action.readyToPlay(roomName, this.props.sid, true);
    },


    render: function() {

        if (this.state.rooms.length) {

            var room = bingoStore.getCurrentRoom();
            var rooms = this.state.rooms.map(function (item, i) {

                var disabled = '';
                if (item.disabled) {
                    disabled = 'disabled';
                }

                var active = false;
                if (this.state.activeIndex === i) {
                    active = true;
                }

                //console.log(item.room + ',' + room);
                if (item.room !== room) {
                    status = '';
                } else {
                    status = this.props.status;
                }
                return (
                    <RoomElem key={i}
                              handler={this.roomClick.bind(this, i)}
                              readyHandler={this.readyClick.bind(this, i)}
                              status={status}
                              active={active}
                              disabled={disabled}>
                        {item.room}
                    </RoomElem>
                );

            }.bind(this));
        }

        return (
            <div id="sc">
                <h3>BINGO'S WORLD</h3>
                <button onClick={this.press}>Check Rooms</button>
                <ul>
                    {rooms}
                </ul>
            </div>
        );

    }
});


module.exports = Lobby;