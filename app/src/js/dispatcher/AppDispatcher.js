var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = function(action){
    if (AppDispatcher.isDispatching()) {
        console.log('is dispatching: ' + action.actionType);
    }

    this.dispatch({
        source: 'VIEW_ACTION',
        action: action
    });
};

module.exports = AppDispatcher;