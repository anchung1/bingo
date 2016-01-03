var React = require('react');
var bingoStore = require('../stores/bingoStore');

var GameBoard = React.createClass({

    getInitialState() {
        return {
            balls: []
        }
    },

    componentDidMount: function() {
        bingoStore.ballListener(this._ballCB);
    },

    componentWillUnmount: function() {
        bingoStore.ballRemoveListener(this._ballCB);
    },

    _ballCB: function() {

        var balls = bingoStore.getBalls();
        this.setState({
            balls: balls
        });

    },


    render: function() {

        /*console.log('GameBoard render');
        console.log(this.state.balls);*/
        var liList = this.state.balls.map(function(item, i) {
            return (
                <li key={i}>{item}</li>
            );
        });

        return(
            <ul>
                {liList}
            </ul>

        );
    }
});


module.exports = GameBoard;