exports = module.exports = function (Spotify, config) {
    return {
        player: require('./player')(Spotify, config),
        meta: require('./meta')(Spotify, config)
    };
};