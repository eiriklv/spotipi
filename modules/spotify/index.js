// dependencies
var debug = require('debug')('spotiPi:spotify:module');

// import the player prototype
var Player = require('./player');

// initialize spotify player
exports = module.exports = function (source, username, password) {
    var player = new Player(source, username, password);
    player.next();
    debug('started spotiPi!');
};