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
            sid: '',
            userName: 'Nick',
            currentRoom: '',
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

        this.setState({
            rooms: rooms
        });

    },

    _joinCB: function() {
        this.setState({
            currentRoom: bingoStore.getCurrentRoom()
        });
    },

    _leaveCB: function() {
        this.setState({
            currentRoom: bingoStore.getCurrentRoom()
        });
    },

    liClick: function(index, event) {

        //console.log(event.currentTarget);
        console.log(index);
        console.log(event.target);
        console.log(event.currentTarget);

        var roomName = this.state.rooms[index];
        //action.joinRoom(roomName, this.state.userName, this.state.sid);

        //var node = React.findDOMNode(this.refs.div1);
        //console.log(this.refs.div1.getDOMNode());

        //console.log(this.refs.div1.props.children);

        if (roomName !== this.state.currentRoom) {
            action.leaveRoom(roomName, this.state.sid);
            action.joinRoom(roomName, this.state.userName, this.state.sid);
        } else {
            console.log('same room.  no leave/join performed.');
        }

    },

    press: function() {
        action.getRooms();
    },

    render: function(){

        if (this.state.rooms.length) {
            console.log('sample container render');

            <roomElem></roomElem>
           /* var rooms = this.state.rooms.map(function(item, i) {
                var ref = "div" + i;
                return (
                    <div key={i} ref={ref}>
                        <li onClick={this.liClick.bind(this,i)}>{item}</li>
                        <button disabled="disabled">Ready</button>
                    </div>
                );

            }.bind(this));*/
        }

        return (
            <div id="sc">
                <h3>Hello World</h3>
                <button onClick={this.press}>Rooms</button>
                <ul>
                    {rooms}
                </ul>
            </div>
        )
    }
});

module.exports = SampleContainer;