exports = module.exports = function (queue) {
    return {
        get: require('./get')(queue),
        skip: require('./skip')(queue),
        add: require('./add')(queue)
    };
};