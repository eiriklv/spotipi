exports = module.exports = function () {
    return {
        common: require('./common')(),
        handlebars: require('./handlebars')()
    };
};