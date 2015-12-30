var React = require('react');
var action = require('../actions/sampleActions');
var socketStore = require('../stores/socketIDStore');
var bingoStore = require('../stores/bingoStore');



function setupWebSocket() {
    /*socket.on('connect', function() {
        console.log('connected');
    });
*/

}

var SampleContainer = React.createClass({

    getInitialState: function() {
        return {
            holaMsg: '',
            rooms: []
        };
    },

    componentDidMount: function() {
        socketStore.addChangeListener(this._testCB);
        bingoStore.addChangeListener(this._bingoCB);
        action.componentReady();

    },

    componentWillUnmount: function() {
        socketStore.removeChangeListener(this._testCB);
        bingoStore.addChangeListener(this._bingoCB);
    },

    _testCB: function() {
        console.log('testCB: ' + socketStore.getID());
    },

    _bingoCB: function() {
        var rooms = bingoStore.getRooms();

        this.setState({
            rooms: rooms
        });

    },

    liClick: function(index) {
        console.log(index);
    },

    press: function() {
        action.getRooms();
    },

    render: function(){

        if (this.state.rooms.length) {
            console.log('sample container render');

            var rooms = this.state.rooms.map(function(item, i) {
                return (
                    <li onClick={this.liClick.bind(this, i)}>{item}</li>
                );
            }.bind(this));
        }

        return (
            <div id="sc">
                <h3>Hello World</h3>
                <button onClick={this.press}>Rooms</button>

                <ul style={{listStyleType: 'none'}}>
                    {rooms}
                </ul>
            </div>
        )
    }
});

module.exports = SampleContainer;