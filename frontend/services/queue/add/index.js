var async = require('async');

exports = module.exports = function (QueueItem, spotify, helpers) {
    return function (uri, callback) {
        async.waterfall([
            function (callback) {
                spotify.meta.parseUri(uri, function (err, parsedUri) {
                    console.log(parsedUri);
                    callback(err, parsedUri);
                });
            },
            function (parsedUri, callback) {
                spotify.meta.getTrackInfo(parsedUri, function (err, track) {
                    callback(err, parsedUri, track);
                });
            },
            function (parsedUri, track, callback) {
                var queueItem = new QueueItem();

                queueItem.uri = parsedUri;
                queueItem.song = track.name;
                queueItem.artist = track.artist[0].name;
                queueItem.album = track.album.name;
                queueItem.duration = track.duration;
                queueItem.timestamp = (new Date()).getTime();

                queueItem.image = {
                    'default': track.album.cover[0].uri,
                    'small': track.album.cover[1].uri,
                    'large': track.album.cover[2].uri
                };

                queueItem.save(function (err, product) {
                    callback(err, product);
                });
            }
        ], function (err, result) {
            callback(err, result);
        });
    };
};