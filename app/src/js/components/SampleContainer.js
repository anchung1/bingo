var React = require('react');


function setupWebSocket() {
    /*socket.on('connect', function() {
        console.log('connected');
    });
*/

}

var SampleContainer = React.createClass({

    componentDidMount: function() {
        setupWebSocket();
    },

    render: function(){
        console.log('sample component');
        return (
            <div>
                <h3>Hello World</h3>
            </div>
        )
    }
});

module.exports = SampleContainer;