var assert = require('assert');
var should = require('should');
var io = require('socket.io-client');
var fs = require('fs');
var _ = require('lodash');

var options = {
    'force new connection': true
};


describe('Log: ', function() {
    var logfile = './test/testlog.log';
    var logger = require('./../js/log');
    var logstr2 = 'Baby it\'s cold outside.';


    it ('Should create a file', function(done) {
        logger.create(logfile);
        logger.log(logstr2);

        fs.stat(logfile, function(err, stats) {
            if (err) {
                assert.equal(0,1);
                done();
            }

            if (stats.isFile()) {
                assert.equal(1,1);
                done();
            }

            assert.equal(0,1);
            done();

        });
    });

    it ('Should contain baby', function(done) {

        fs.readFile(logfile, 'utf8', function(err, data) {
            if (err) {
                assert.equal(0,1);
                done();
            }

            //re = /cold outside/g;
            re = new RegExp(logstr2, 'g');
            result = data.match(re);
            if (!result) {
                assert.equal(0,1);
                done();
            }

            assert.equal(1,1);
            done();

        })
    });

    it ('Should contain this file name', function(done) {
        fs.readFile(logfile, 'utf8', function(err, data) {
            if (err) {
                assert.equal(0,1);
                done();
            }

            var re = new RegExp('test.js', 'g');
            var result = data.match(re);
            if (!result) {
                assert.equal(0,1);
                done();
            } else {
                assert.equal(1,1);
                done();
            }
        })
    });

    it ('Should print string types', function(done) {
        var output = logger.log('hello');
        var re = new RegExp('hello', 'g');
        var result = output.match(re);
        if (!result) {
            assert.equal(0,1);
        } else {
            assert.equal(1,1);
        }
        done();
    });

    it ('Should print object types', function(done) {
        var output = logger.log({hello: 'hello', bye: 'bye'});

        var re = new RegExp('hello', 'g');
        var result = output.match(re);
        if (!result) {
            assert.equal(0,1);
        } else {
            assert.equal(1,1);
        }
        done();
    });

    it ('Should print array types', function(done) {
        var output = logger.log(['hello', 'bye']);

        var re = new RegExp('hello', 'g');
        var result = output.match(re);
        if (!result) {
            assert.equal(0,1);
        } else {
            assert.equal(1,1);
        }
        done();
    })

});


describe("Room: ", function() {

    var rooms = new (require('./../js/room'))();

    it ('Should join room Dora', function(done) {
        var result = rooms.join('Dora', 'Nick', 'abcd1234');

        assert.notEqual(null, result);
        done();
    });

    it ('Should leave room Dora', function(done) {
        var result = rooms.leave('abcd1234');
        assert.notEqual(null, result);
        done();
    });


    it ('Should have 3 people in room Diego', function(done) {
        rooms.join('Diego', 'Nick1', 'abcd1234a');
        rooms.join('Diego', 'Nick2', 'abcd1234b');
        rooms.join('Diego', 'Nick3', 'abcd1234c');

        assert.equal(rooms.showResidents('Diego').length, 3);
        done();
    });

    it ('Should have 1 person in room Diego', function(done) {
        rooms.leave('abcd1234a');
        rooms.leave('abcd1234b');

        assert.equal(rooms.showResidents('Diego').length, 1);
        done();
    });

    it ('Should have no one in room Diego', function(done) {
        rooms.leave('abcd1234c');

        assert.equal(rooms.showResidents('Diego').length, 0);
        done();
    });

    it ('Should signal ready', function(done) {
        rooms.join('Dora', 'Nick1', 'abcd1234');
        rooms.join('Dora', 'Nick2', 'abcd1235');

        var room = rooms.getRoom('Dora');
        rooms.ready('Dora', 'abcd1234', true, true);
        assert.equal(room.readyCount, 1);

        rooms.ready('Dora', 'abcd1234', true, true);
        assert.equal(room.readyCount, 1);

        rooms.ready('Dora', 'abcd1234', true, true);
        assert.equal(room.readyCount, 1);

        rooms.ready('Dora', 'abcd1235', true, true);
        assert.equal(room.readyCount, 2);

        rooms.leave('abcd1234');
        assert.equal(room.readyCount, 1);

        rooms.leave('abcd1235');
        assert.equal(room.readyCount, 0);
        done();

    });


});

describe('Sockets: ', function() {

    var chdlr = new (require('./../js/connHandler'));
    it ('Should handle 3 connections', function(done) {
        chdlr.saveSocket({id: 'abcd1234a'});
        chdlr.saveSocket({id: 'abcd1234b'});
        chdlr.saveSocket({id: 'abcd1234c'});

        assert.equal(chdlr.numActiveConnections(), 3);
        done();

    });

    it ('Should have zero connections', function(done) {
        chdlr.removeSocket({id: 'abcd1234a'});
        chdlr.removeSocket({id: 'abcd1234b'});
        chdlr.removeSocket({id: 'abcd1234c'});

        assert.equal(chdlr.numActiveConnections(), 0);
        done();
    })

});

describe('Bingo Rooms', function() {

    var Bingo = new (require('./../js/bingo'))();
    var global = require('./../js/globalSave');

    it ('Should get number of rooms', function(done) {

        var roomList = global.Rooms.roomList();
        assert.equal(roomList.length, 5);
        assert.equal(roomList[0], 'Dora');
        done();
    });


});

describe('Bingo Number Geneator', function() {


    it ('Should return a number', function(done) {

        var Bingo = new (require('./../js/bingo'))();

        var val = Bingo.generate();
        assert.notEqual(val,null);
        done();
    });

    it ('Should cover all numbers', function(done) {
        var Bingo = new (require('./../js/bingo'))();

        var balls = [];
        for (i=1; i<=75; i++) {
            if (i>=1 && i<=15) {
                balls[i-1] = 'B-'+ i;
            }
            if (i>15 && i<=30) {
                balls[i-1] = 'I-'+ i;
            }
            if (i>30 && i<=45) {
                balls[i-1] = 'N-'+ i;
            }
            if (i>45 && i<=60) {
                balls[i-1] = 'G-'+ i;
            }
            if (i>60 && i<=75) {
                balls[i-1] = 'O-'+ i;
            }
        }

        //console.log('balls: ' + balls.length);

        for (i=0; i<75; i++) {
            var value = Bingo.generate();
            _.remove(balls, function(elem) {
                return (elem === value);
            });

        }

        //console.log('balls: ' + balls.length);
        assert.equal(balls.length, 0);
        done();


    });
});


/*
describe("Websocket: ", function() {




    var response;
    it ('Client1 should connect', function(done) {
        var client1 = io.connect('https://localhost:3001', options);

        client1.on('connect', function() {
            client1.emit('connection count');
            assert.equal(1, 1);

            done();
        });


        client1.on('connect_error', function() {
            assert.equal(0, 1);
            done();
        });

        client1.on('say hello', function(val) {
            response = val;

        });

        client1.on('connection count', function(val) {
            console.log('connect count: ' + val);
        })
    });


    it ('should say hello', function(done) {
        assert.equal('hello', response);
        done();
    });

});
*/
