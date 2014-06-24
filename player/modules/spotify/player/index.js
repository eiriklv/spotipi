// dependencies
var debug = require('debug')('spotipi-player:modules:bootstrap');

// import the player prototype
var Player = require('./player');

// initialize spotify player
exports = module.exports = function (Spotify, config) {
    return function (services, ipc) {
        // create an instance of the player
        var player = new Player(Spotify, services.queue, config.get('spotify.username'), config.get('spotify.password'), ipc);
        // start the player
        player.next();
        // add listener to the 'skip' event
        ipc.on('skip', player.skip.bind(player));

        debug('started spotipi-player!');
    };
};