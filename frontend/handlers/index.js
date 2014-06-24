exports = module.exports = function (services) {
    return {
        app: require('./app')(services),
        api: require('./api')(services)
    };
};