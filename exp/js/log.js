var fs = require('fs');
var traceback = require('traceback');

'use strict';

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
       /* console.log(stack[1].name);
        console.log(stack[1].line);
        */
        var newMsg = "(" + stack[1].file + "." + stack[1].name + ": " + stack[1].line + ") " + msg + '\n';
        fs.appendFile(this.filename, newMsg, function(err) {
            if (err) throw err;
        });

    };

    this.getFileName = function() {
        return this.filename;
    };

}


module.exports = Log;