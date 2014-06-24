// register handlebars helpers and partials
var io = require('socket.io-client');
var handlebars = require('./modules/handlebars')();

// config (envify)
var config = require('./config');

// modules
var api = require('./modules/api')(config);
var templates = require('./templates')();

// main application
var app = require('./modules/queue/main')(templates, api, io);

// debug
console.log('queue client application started');