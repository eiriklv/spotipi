exports = module.exports = function (QueueItem, helpers) {
    return {
        get: require('./get')(QueueItem, helpers),
        fetch: require('./fetch')(QueueItem, helpers),
        add: require('./add')(QueueItem, helpers),
        update: require('./update')(QueueItem, helpers)
    };
};