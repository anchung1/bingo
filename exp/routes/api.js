var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');

var db = require('../schema/schema.js');
//var Dora = mongoose.model('dora', doraSchema);
var Dora = db.Dora;
var Users = db.Users;
var Entry = db.Entry;

var logger = require('./../js/log');

router.get('/game/rooms', function(req, res, next) {

    var global = require('./../js/globalSave');

    logger.log('GET rooms');
    res.json({rooms: global.Rooms.roomList()});
});

router.post('/game/rooms', function(req, res, next) {
    logger.log('POST game rooms');
    var global = require('./../js/globalSave');

    var rooms = global.Rooms;
    var index = rooms.join(req.body.roomName, req.body.userName, req.body.sid);
    res.send('OK');

});

router.delete('/game/rooms', function(req, res, next) {
    logger.log("DELETE game rooms");

    var global = require('./../js/globalSave');
    var rooms = global.Rooms;
    rooms.leave(req.query.sid);

    res.send('OK');
});

router.post('/game', function(req, res, next) {

    var state = req.query.ready;
    var global = require('./../js/globalSave');
    var rooms = global.Rooms;

    logger.log('POST game ready: ' + state);
    if (rooms.ready(req.body.roomName, req.body.sid, state)) {
        res.send('OK');
    } else {
        next('Game not ready');
    }
});


/* GET users listing. */
router.get('/greet', function (req, res, next) {
    console.log('greet');


    res.send('greetings');
});

router.post('/db', function (req, res, next) {
    var id = req.signedCookies._id;

    Users.findOne({_id: id}, 'name', function(err, user) {
        if (err) return next(err);
        if (!user) return next();

        console.log('post with title ' + req.body.title);
        Entry.find({'userID': id}).where('title').equals(req.body.title).exec(
            function(err, entry) {
                if (err) return next(err);

                console.log('entry is');
                console.log(entry);

                if (!entry || entry.length==0) {
                    console.log('new entry');
                    var store = new Entry({title: req.body.title, data: req.body.data, userID: id});
                    store.save(function(err, store) {
                        if (err) return next(err);
                        if (!store) return next();

                        console.log(store);
                        res.send('saved');
                    });
                } else {
                    console.log('updating entry');
                    entry[0].data = req.body.data;
                    entry[0].save(function(err, elem) {
                        if (err) return next(err);
                        if (!elem) return next();

                        console.log(elem);
                        res.send('updated');
                    });
                }
            }
        );

    });
});

router.get('/db/:title', function(req, res, next) {

    var title = req.params.title;
    var id = req.signedCookies._id;

    Users.findOne({_id: id}, 'name', function(err, user) {
        if (err) return next(err);
        if (!user) return next();

        Entry.find({'userID': id}).where('title').equals(title).exec(
            function(err, entry) {
                console.log('entry found ' + entry);
                if (err) return next(err);
                if(!entry || entry.length==0) return next();

                res.json(entry[0]);
            }
        );

    });
});

router.get('/db/userData', function(req, res, next) {

    var id = req.signedCookies._id;

    Users.findOne({_id: id}, 'name', function(err, user) {
        if (err) return next(err);
        if (!user) return next();

        Entry.find({'userID':id}, function(err, entryList) {
            if (err) return next(err);
            if (!entryList || !entryList.length) return next();

            console.log(entryList);
            res.json(entryList);
        })
    });
    //res.send('user data');
});

router.delete('/db/:title', function (req, res, next) {
    /*Dora.findOneAndRemove({name: delItem}, function (err) {
        if (err) return console.log('unable to delete ' + delItem);
        res.send(delItem);
    });*/


    var id = req.signedCookies._id;
    var delItem = req.params.title;

    Users.findOne({_id: id}, 'name', function(err, user) {
        if (err) return next(err);
        if (!user) return next();

        Entry.findOneAndRemove({title: delItem}, function(err) {
            if (err) return next(err);
            res.send('item ' + delItem + ' removed');
        });


    });
});

module.exports = router;
