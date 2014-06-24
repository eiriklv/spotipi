// dependencies
var mongoose = require('mongoose');
var Spotify = require('spotify-web');
var redis = require('redis');

// config and setup helpers
var helpers = require('./helpers')();
var config = require('./config');
var setup = require('./setup');

// database connection
setup.db(mongoose, config);

// pubsub
var rpc = setup.pubsub(redis, config);

// app modules
var ipc = require('../common/ipc')(0);
var spotify = require('./modules/spotify')(Spotify, config);
var models = require('../common/models')(mongoose);
var services = require('./services')(models, helpers);

// pubsub
require('./modules/pubsub')(rpc, ipc);

// initialize spotify player
spotify.player(services, ipc);
