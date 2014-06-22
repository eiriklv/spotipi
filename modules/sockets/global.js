var debug = require('debug')('spotipi:sockets:global');
var util = require('util');

exports = module.exports = function (io, services, ipc) {
    io.sockets.on('connection', function (socket) {
        debug('global socket connected');

        // send update to user
        function sendUpdateMessage () {
            socket.emit('update');
        }

        // bind to update event
        ipc.on('update', sendUpdateMessage);

        // handle adding to queue
        socket.on('add', function (data) {
            services.queue.add(data.uri, function (err, result) {
                if (err) return socket.emit('error', err);

                // send status message back when successfully adding
                socket.emit('status', {
                    type: 'add',
                    data: result
                });

                // emit update message so all clients update their queue
                ipc.emit('update');
            });
        });

        // handle disconnect
        socket.on('disconnect', function () {
            ipc.removeListener('update', sendUpdateMessage);
            debug('global socket disconnected');
        });
    });
};