exports = module.exports = function (QueueItem, helpers) {
    return function (uri, callback) {
        QueueItem.findOne({ 'playing': true }, null, {}, function (err, queueItem) {
            if (err) return callback(err);
            
            queueItem.queued = false;
            queueItem.playing = false;

            queueItem.save(function (err, product) {
                callback(err, product);
            });
        });
    };
};