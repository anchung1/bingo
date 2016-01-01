var Rooms = new (require('./room'))();
var global = require('./globalSave');

//this stores rooms in the module
console.log('BINGO HEADER');
global.Rooms = Rooms;

'use strict';

function Bingo() {

    function randomInt(low, high) {
        return Math.floor(Math.random() * (high-low+1) + low);
    }

    function letterDesignator(v) {
        if (v <= 15) return 'B';
        if (v <= 30) return 'I';
        if (v <= 45) return 'N';
        if (v <= 60) return 'G';
        return 'O';
    }

    this.generate = function() {
        var value = randomInt(1, 75);
        value = letterDesignator(value) + '-' + value;

        return value;
    }
}

module.exports = Bingo;