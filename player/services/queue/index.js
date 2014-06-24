exports = module.exports = function (QueueItem, helpers) {
    return {
        fetch: require('./fetch')(QueueItem, helpers),
        update: require('./update')(QueueItem, helpers)
    };
};