// dependencies
var util = require('util');
var debug = require('debug')('spotiPi:app');

// catch all errors with no handler
process.on('uncaughtException', function (err) {
    debug('Caught exception without specific handler: ' + util.inspect(err));
    debug(err.stack, 'error');
    process.exit(1);
});

// spotify credentials
var username = process.env.SPOTIFY_USERNAME;
var password = process.env.SPOTIFY_PASSWORD;

// application modules
var Player = require('./player');
var Source = require('./source');

// source instance
var source = new Source([
    'spotify:track:3Uvx1TO0Kg5HgGPk58lHXv',
    'spotify:track:5Fds0TERWBkWRktc0z3cZM',
    'spotify:track:3iKmdCDZK4XmqxIA9fVVGs',
    'spotify:track:5n8EO9QJbmQLtQd8MAvrOg',
    'spotify:track:3xjlv84tqN87paMVHCoNPb'
]);

// player instance
var player = new Player(source, username, password);

// start player
player.next();
