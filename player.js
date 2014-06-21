// dependencies
var debug = require('debug')('spotiPi:player');
var util = require('util');
var Spotify = require('spotify-web');
var lame = require('lame');
var Speaker = require('speaker');

// The radio player
function Player (source, username, password) {
    this.source = source;
    this.username = username;
    this.password = password;
    this.current = null;
}

// play the current track
Player.prototype.play = function (song) {
    // initiate the Spotify session
    Spotify.login(this.username, this.password, function (err, spotify) {
        if (err) {
            debug(util.inspect(err));
            return this.next();
        }

        // first get a "track" instance from the track URI (song)
        spotify.get(song, function (err, track) {
            // handle error by skipping to the next track
            if (err) {
                debug(util.inspect(err));
                return this.next();
            }

            // print / handle metadata
            this.publish(track);

            // attach the mp3 stream to the context (to be able to skip)
            this.current = track.play();
                
            // decode and play the mp3 stream
            this.current
                .pipe(new lame.Decoder())
                .pipe(new Speaker())
                .on('finish', function () {
                    debug('finished playing song');
                    spotify.disconnect();
                    this.current = null;
                    this.next();
                }.bind(this));

        }.bind(this));
    }.bind(this));
};

// skip the current track (if one is playing)
Player.prototype.skip = function () {
    if (this.current) return this.current.end();
    debug('skipping track');
};

// publish meta data
Player.prototype.publish = function (track) {
    debug('Playing: %s - %s', track.artist[0].name, track.name);
    debug(util.inspect(track, { colors: true }));
};

// play next song in queue (this is the initial method)
Player.prototype.next = function () {
    this.source.fetch(function (err, song) {
        // if there is a source error try again later
        if (err) {
            debug('error when fetching next song from source - trying again in 10s');
            setTimeout(this.next.bind(this), 10000);
            return;
        }

        // if there is no more songs in the queue
        if (!song) {
            debug('no songs in queue - waiting..');
            setTimeout(this.next.bind(this), 5000);
            return;
        }

        // check if the uri provided is of the type "track"
        if (Spotify.uriType(song) != 'track') {
            debug('not a valid spotify "track" uri');
            setTimeout(this.next.bind(this), 2000);
            return;
        }

        // play song
        debug('found next song in queue..');
        this.play(song);
    }.bind(this));
};

exports = module.exports = Player;