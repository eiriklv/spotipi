// dependencies
var debug = require('debug')('spotiPi:spotify:module:player');

// import the player prototype
var Player = require('./player');

// initialize spotify player
exports = module.exports = function (Spotify, config) {
    return function (services, ipc) {
        var player = new Player(Spotify, services.queue, config.get('spotify.username'), config.get('spotify.password'), ipc);
        player.next();
        debug('started spotiPi!');
    };
};