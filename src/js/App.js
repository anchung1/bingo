var React = require('react');
var SampleContainer = require('./components/SampleComponent');


var App = React.createClass({
    render: function(){
        return (
            <div className="container">
                <div className="row">
                    <SampleComponent></SampleComponent>
                </div>
            </div>
        )
    }
});

React.render(
    <App />,
    document.getElementById('app')
);
