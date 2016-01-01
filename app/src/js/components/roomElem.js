var React = require('react');

var RoomElem = React.createClass({

    render: function() {

        var btn = <button onClick={this.props.readyHandler}>Ready</button>;
        if (this.props.disabled === 'disabled') {
            btn = <button disabled="disabled">Ready</button>
        }

        return(
            <div onClick={this.props.handler}>
                <li>{this.props.children}</li>
                {btn}
            </div>

        );
    }
});


module.exports = RoomElem;