var Rooms = new (require('./room'))();
var global = require('./globalSave');

//this stores rooms in the module
global.Rooms = Rooms;

'use strict';

function Bingo() {

    var cardValue = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six',
        'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
    var suitValue = ['Spade', 'Club', 'Heart', 'Diamond'];

    this.getCard = function() {
        console.log('getCard');
        var val = cardValue[getRandomInt(0, 13)];
        var suit = suitValue[getRandomInt(0, 4)];

        return ({val: val, suit: suit})
    }
}

module.exports = Bingo;