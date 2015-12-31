var React = require('react');

var RoomElem = React.createClass({

    render: function() {

        var btn = <button>Ready</button>;
        if (this.props.disabled === 'disabled') {
            btn = <button disabled="disabled">Ready</button>
        }

        return(
            <div>
                <li onClick={this.props.handler}>{this.props.children}</li>
                {btn}
            </div>

        );
    }
});


module.exports = RoomElem;