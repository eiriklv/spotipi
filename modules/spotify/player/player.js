// dependencies
var debug = require('debug')('spotiPi:player');
var util = require('util');
var lame = require('lame');
var Speaker = require('speaker');

// The spotify player
function Player (Spotify, queue, username, password, ipc) {
    this.Spotify = Spotify;
    this.ipc = ipc;
    this.queue = queue;
    this.username = username;
    this.password = password;
    this.current = null;
}

// play the current track
Player.prototype.play = function (song) {
    // initiate the Spotify session
    this.Spotify.login(this.username, this.password, function (err, spotify) {
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

            // print / handle metadata (and set song as playing)
            this.publish(track, song);

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

                    // update queueitem to playing: false and queue: false
                    this.queue.update(song, function (err, product) {
                        this.next();
                    }.bind(this));
                }.bind(this))
                .on('error', function (err) {
                    debug(err);

                    // if the song is not available, just skip it and move on
                    spotify.disconnect();
                    this.current = null;

                    // update queueitem to playing: false and queue: false
                    this.queue.update(song, function (err, product) {
                        this.next();
                    }.bind(this));
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
Player.prototype.publish = function (track, song) {
    // update db with playing: true

    debug('Playing: %s - %s', track.artist[0].name, track.name);
    debug(util.inspect(track, { colors: true }));
};

// play next song in queue (this is the initial method)
Player.prototype.next = function () {
    this.queue.fetch(function (err, song) {
        // send update to user via socket.io
        this.ipc.emit('update');

        // if there is a queue error try again later
        if (err) {
            debug('error when fetching next song from queue - trying again in 10s');
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
        if (this.Spotify.uriType(song.uri) != 'track') {
            debug('not a valid spotify "track" uri');
            setTimeout(this.next.bind(this), 2000);
            return;
        }

        // play song
        debug('found next song in queue..');
        this.play(song.uri);
    }.bind(this));
};

exports = module.exports = Player;