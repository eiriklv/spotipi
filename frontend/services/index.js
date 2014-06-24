exports = module.exports = function (models, spotify, helpers, ipc) {
    return {
        queue: require('./queue')(models.QueueItem, spotify, helpers, ipc)
    };
};