// common dependencies
var fs = require('fs');
var url = require('url');
var colors = require('colors');
var debug = require('debug')('spotipi-player:setup');

// redis pubsub
module.exports.pubsub = function (redis, config){
    // init redis connections
    var subscriber, publisher;
    if ('production' == config.get('env')) {
        // running on heroku with rediscloud
        var redisURL = url.parse(config.get('database.redis.url'));
        subscriber = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true}); // subscriber connection
        publisher = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true}); // publisher connection
        if (redisURL.auth) subscriber.auth(redisURL.auth.split(":")[1]);
        if (redisURL.auth) publisher.auth(redisURL.auth.split(":")[1]);
    }
    else {
        // running in local dev (localhost:6379)
        subscriber = redis.createClient(); // subscriber connection
        publisher = redis.createClient(); // publisher connection
    }

    return {
        subscriber: subscriber,
        publisher: publisher
    };
};

// connect to backend store (db)
module.exports.db = function(mongoose, config) {
    function connect() {
        mongoose.connect(config.get('database.mongo.url'));
    }

    mongoose.connection.on('open', function(ref) {
        debug('open connection to mongo server.');
    });

    mongoose.connection.on('connected', function(ref) {
        debug('connected to mongo server.');
    });

    mongoose.connection.on('disconnected', function(ref) {
        debug('disconnected from mongo server.');

        debug('retrying connection in 2 seconds..');
        setTimeout(function() {
            connect();
        }.bind(this), 2000);
    });

    mongoose.connection.on('close', function(ref) {
        debug('closed connection to mongo server');
    });

    mongoose.connection.on('error', function(err) {
        debug('error connection to mongo server!');
        debug(err);
    });

    mongoose.connection.on('reconnect', function(ref) {
        debug('reconnect to mongo server.');
    });

    connect();
};
