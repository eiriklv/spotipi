exports = module.exports = function (QueueItem, spotify, helpers) {
    return {
        get: require('./get')(QueueItem, helpers),
        fetch: require('./fetch')(QueueItem, helpers),
        add: require('./add')(QueueItem, spotify, helpers),
        update: require('./update')(QueueItem, helpers)
    };
};