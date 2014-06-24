exports = module.exports = function (request, path) {
    return {
        get: require('./get')(request, path),
        add: require('./add')(request, path),
        skip: require('./skip')(request, path)
    };
};