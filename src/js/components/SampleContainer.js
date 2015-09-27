var React = require('react');

var SampleComponent = React.createClass({

    render: function(){
        console.log('sample component');
        return (
            <div>
                <h3>Hello World</h3>
            </div>
        )
    }
});

module.exports = SampleComponent;