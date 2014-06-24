exports = module.exports = function (ipc) {
    return function (callback) {
        var msg = {
            success: true
        };
        
        ipc.emit('skip', msg);
        callback(null, msg);
    };
};