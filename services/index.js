exports = module.exports = function (models, helpers) {
    return {
        queue: require('./queue')(models.QueueItem, helpers)
    };
};