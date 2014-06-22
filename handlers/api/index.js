exports = module.exports = function (services) {
    return {
        queue: require('./queue')(services.queue)
    };
};