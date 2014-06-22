var request = require('superagent');

exports = module.exports = function (config) {
    return {
        queue: require('./queue')(request, config.api.url + '/queue'),
    };
};