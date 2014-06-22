exports = module.exports = function (Spotify, config) {
    return {
        getTrackInfo: function (uri, callback) {
            if (!uri) return callback('no uri supplied');
            if (Spotify.uriType(uri) != 'track') return callback('not a valid track uri');

            Spotify.login(config.get('spotify.username'), config.get('spotify.password'), function (err, spotify) {
                if (err) return callback(err);

                spotify.get(uri, function (err, track) {
                    callback(err, track);
                });
            });
        },
        parseUri: function (uri, callback) {
            process.nextTick(function () {
                if (typeof uri != 'string') return callback('uri not a string');

                if (uri.indexOf('http') > -1) {
                    var uriParts = uri.split('/');

                    if (uriParts.length >= 2) {
                        var parsedUri = 'spotify:' + uriParts[uriParts.length-2] + ':' + uriParts[uriParts.length-1];
                        return callback(null, parsedUri);
                    }

                    return callback('invalid uri');
                }

                callback(null, uri);
            });
        }
    };
};