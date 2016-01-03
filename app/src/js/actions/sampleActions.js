var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var restUrl = 'https://localhost:3001/';
var sampleActions = {
    anAction: function(item){
        AppDispatcher.handleAction({
            actionType: appConstants.SAMPLE_ITEM,
            data: item
        });
    },

    componentReady: function() {
        AppDispatcher.handleAction({
            actionType: appConstants.COMPONENT_READY
        });
    },

    socketIDMsg: function(id) {
        AppDispatcher.handleAction({
            actionType: appConstants.SAVE_SOCKET_ID,
            data: id
        });
    },

    updateRoomStatus: function(status) {
        if (AppDispatcher.isDispatching()) {
            console.log('dispatch active');
        }

        AppDispatcher.handleAction({
            actionType: appConstants.ROOM_STATUS,
            data: status
        });
    },

    getRooms: function() {
        var url = restUrl + 'api/game/rooms';

        $.get(url).then(
            function(data) {
                AppDispatcher.handleAction({
                    actionType: appConstants.BINGO_ROOMS,
                    data: data
                });
            }
        );

    },

    joinRoom: function(roomName, userName, sid) {
        var url = restUrl + 'api/game/rooms';

        //console.log('action: ' + roomName);
        $.post(url,
            {
                roomName: roomName,
                userName: userName,
                sid: sid
            }).then(
            function(data) {
                AppDispatcher.handleAction({
                    actionType: appConstants.JOIN_ROOM,
                    data: roomName
                });
            }
        )
    },

    leaveRoom: function(sid) {
        var url = restUrl + 'api/game/rooms' + '?' + 'sid=' + sid;

        $.ajax(
            {
                url: url,
                type: 'DELETE'

            }).then(
            function(data) {
            },
            function() {
                console.log('unable to leave room');
            }
        )
    },

    readyToPlay: function(roomName, sid, state) {
        var url = restUrl + 'api/game' + '?ready=' + state;

        $.post(url,
            {
                roomName: roomName,
                sid: sid
            }).then(
            function(data) {

            },
            function() {
                console.log('Ready not set on server.');
            }
        )
    },

    ballDraw: function(value) {
        AppDispatcher.handleAction({
            actionType: appConstants.BALL_DRAW,
            data: value
        });
    },

    clearGame: function() {

        AppDispatcher.handleAction({
            actionType: appConstants.CLEAR_GAME,
        });
    }



};

module.exports = sampleActions;