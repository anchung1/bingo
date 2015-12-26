var React = require('react');
var SampleContainer = require('./components/SampleContainer');
var WebSocket = require('./components/WebSocket');


var App = React.createClass({
    render: function(){
        return (
            <div className="container">
                <div className="row">
                    <WebSocket></WebSocket>
                    <SampleContainer></SampleContainer>
                </div>
            </div>
        )
    }
});

React.render(
    <App />,
    document.getElementById('app')
);
