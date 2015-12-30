var assert = require('assert');
var should = require('should');
var io = require('socket.io-client');
var fs = require('fs');

var options = {
    'force new connection': true
};


describe('Log: ', function() {

    var logfile = './test/testlog.log';
    var logger = new (require('./../js/log'))(logfile, true);
    var logstr1 = 'baby ';
    var logstr2 = 'it\'s cold outside.';

    it ('Log object should have filename', function(done) {
        assert.equal(logfile, logger.getFileName());
        done();
    });

    it ('Log file should exist', function(done) {
        logger.log(logstr1);
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

            var re = new RegExp(logstr1, 'g');
            var result = data.match(re);
            if (!result) {
                assert.equal(0,1);
                done();
            } else {

                //re = /cold outside/g;
                re = new RegExp(logstr2, 'g');
                result = data.match(re);
                if (!result) {
                    assert.equal(0,1);
                    done();
                }

                assert.equal(1,1);
                done();
            }
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


});

describe("Room: ", function() {

    var rooms = new (require('./../js/room'))();

    it ('Should join room Dora', function(done) {
        var result = rooms.join('Dora', 'Nick', 'abcd1234');

        assert.notEqual(null, result);
        done();
    });

    it ('Should leave room Dora', function(done) {
        var result = rooms.leave('Dora', 'abcd1234');
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
        rooms.leave('Diego', 'abcd1234a');
        rooms.leave('Diego', 'abcd1234b');

        assert.equal(rooms.showResidents('Diego').length, 1);
        done();
    });

    it ('Should have no one in room Diego', function(done) {
        rooms.leave('Diego', 'abcd1234c');

        assert.equal(rooms.showResidents('Diego').length, 0);
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
