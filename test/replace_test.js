'use strict';

var assert = require('assert');
var Record = require('record');
var Replace = require('../lib/replace');

function errorHandler(err){
    process.nextTick(function rethrow() { throw err; });
}

(new Replace).run(
    [new Record({
        path: 'foo.js',
        contents: 'var TS="TIMESTAMP";'
    })], // inputs
    {
        search: 'TIMESTAMP',
        replace: '1'
    }, // options
    console // logger
).then(function(inputs){
    assert.equal(inputs[0].contents.toString(), 'var TS="1";');
}).catch(errorHandler);
