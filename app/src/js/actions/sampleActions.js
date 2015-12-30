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

    }
};

module.exports = sampleActions;