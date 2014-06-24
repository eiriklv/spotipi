exports = module.exports = function (QueueItem, spotify, helpers, ipc) {
    return {
        get: require('./get')(QueueItem, helpers),
        add: require('./add')(QueueItem, spotify, helpers),
        skip: require('./skip')(ipc)
    };
};