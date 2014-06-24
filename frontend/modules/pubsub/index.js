// dependencies
var debug = require('debug')('spotipi-frontend:pubsub');
var util = require('util');
var colors = require('colors');

// use redis to subscribe and publish here
exports = module.exports = function (rpc, ipc) {
    // what to do when a subscription is made
    rpc.subscriber.on('subscribe', function (channel, count){
        debug('subscribe'.yellow + ' channel: ' + channel.toString().blue + ' count: ' + count, 'info');
    });

    // what to do when getting any messages on a channel that has a subscription
    rpc.subscriber.on('message', function (channel, message){
        debug('message'.magenta + ' channel: ' + channel + ' message: ' + util.inspect(message), 'info');

        var data;
        // try to parse the data, as it should be valid JSON. if not, something is wrong..
        try{
            data = JSON.parse(message);
        }
        catch(e){
            debug('could not parse to JSON, aborting send - error: ' + util.inspect(e), 'error');
        }

        // if data is parsed successfully, emit data to sockets
        data ? ipc.emit('update', data) : debug.log('data not defined - erronous input: ' + message, 'error');
    });

    // publish (stringify the data and send it via redis) (since this will only be run once, we don't need to name the callback function or remove it)
    ipc.on('skip', function(data){
        rpc.publisher.publish('skip', JSON.stringify(data)); // publish to redis rpc
    });

    // subscribe to redis channel
    rpc.subscriber.subscribe('update');
};