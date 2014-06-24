exports = module.exports = function (services) {
    return {
        home: require('./landing')(services),
        queue: require('./queue')(services)
    };
};