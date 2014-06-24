exports = module.exports = function (Spotify, config) {
    return {
        meta: require('./meta')(Spotify, config)
    };
};