exports = module.exports = function (QueueItem, helpers) {
    return function (callback) {
        QueueItem.find({ 'queued': true }, null, { sort: { 'createdAt': '1' }}, function (err, queue) {
            if (err) return callback(err);
            console.log(queue);
            callback(err, queue);
        });
    };
};