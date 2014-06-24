exports = module.exports = function (QueueItem, helpers) {
    return function (callback) {
        QueueItem.findOne({ 'queued': true }, null, { sort: { 'createdAt': '1' } }, function (err, song) {
            if (err) return callback(err);
            if (!song) return callback(null, null);

            song.playing = true;

            song.save(function (err, product) {
                callback(err, product);
            });
        });
    };
};