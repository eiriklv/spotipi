exports = module.exports = function (mongoose) {
    return {
        QueueItem: require('./queueitem')('queueitem', mongoose)
    };
};
