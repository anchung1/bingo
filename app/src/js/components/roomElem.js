var React = require('react');

var RoomElem = React.createClass({

    render: function() {

        var btn;
        var active = '';
        if (this.props.active) {
            active = 'divactive';
        }

        if (this.props.status === '') {
            btn = <button onClick={this.props.readyHandler}>Ready</button>;
            if (this.props.disabled === 'disabled') {
                btn = <button disabled="disabled">Ready</button>
            }
        }

        if (this.props.status === 'Waiting') {
            btn = <button onClick={this.props.readyHandler}>Cancel</button>;
        }

        return(
            <div className={active}>
                <li onClick={this.props.handler}>{this.props.children}</li>
                <div className="inner">
                    <span>{this.props.status}</span>
                    {btn}
                </div>
            </div>

        );
    }
});


module.exports = RoomElem;