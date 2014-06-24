exports = module.exports = function (models, spotify, helpers) {
    return {
        queue: require('./queue')(models.QueueItem, spotify, helpers)
    };
};