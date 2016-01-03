var Rooms = new (require('./room'))();
var global = require('./globalSave');
var _ = require('lodash');
var logger = require('./log').create('testlog.log');

//this stores rooms in the module
global.Rooms = Rooms;

'use strict';

function Bingo() {

    var bingoBalls = [];
    init();

    function init() {
        for (i=0; i<75; i++) {
            bingoBalls.push(i);
        }
    }

    //min inclusive, max exclusive
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function letterDesignator(v) {
        if (v <= 15) return 'B';
        if (v <= 30) return 'I';
        if (v <= 45) return 'N';
        if (v <= 60) return 'G';
        return 'O';
    }

    this.reset = function() {
        bingoBalls = [];
        init();
    };

    this.generate = function() {

        if (bingoBalls.length == 0) {
            console.log('no more balls');
            return null;
        }

        var value = randomInt(0, bingoBalls.length);

        var removed = bingoBalls.splice(value, 1);
        value = removed[0] + 1;
        value = letterDesignator(value) + '-' + value;

        return value;
    }
}

module.exports = Bingo;