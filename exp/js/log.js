var fs = require('fs');
var traceback = require('traceback');

'use strict';

var filename = '';
function create(fn) {
    filename = fn;

    var fd = fs.openSync(fn, 'w');
    fs.closeSync(fd);
}

function log(msg, doConsole) {

    if (doConsole) console.log(msg);

    try {
        var stack = traceback();

    } catch (e) {
        stack = [{}, {}];
    }

    if (typeof(msg) === 'object' || typeof(msg) === 'function') {

        msg = JSON.stringify(msg);
    }

    var newMsg = "(" + stack[1].file + "." + stack[1].name + ": " + stack[1].line + ") " + msg + '\n';
    fs.appendFile(filename, newMsg, function(err) {
        if (err) throw err;
    });

    return newMsg;
}

function getFileName() {
    return filename;
}


module.exports = {create: create, log: log, getFileName: getFileName};


/*
function Log(fn, newFile) {

    create.call(this, fn, newFile);

    function create(fn, newFile) {
        this.filename = fn;

        //These must be done now as part of init.  It cannot be async.
        if (newFile) {
            var fd = fs.openSync(fn, 'w');
            fs.closeSync(fd);
        }
    }

    this.log = function(msg) {

        var stack = traceback();

        //https://www.npmjs.com/package/traceback
       /!* console.log(stack[1].name);
        console.log(stack[1].line);
        *!/

        var newMsg = "(" + stack[1].file + "." + stack[1].name + ": " + stack[1].line + ") " + msg + '\n';
        fs.appendFile(this.filename, newMsg, function(err) {
            if (err) throw err;
        });

    };

    this.getFileName = function() {
        return this.filename;
    };

}
*/


