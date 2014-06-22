// Song source
function Source (list) {
    this.list = list;
}

// fetch a song
Source.prototype.fetch = function (callback) {
    process.nextTick(function () {
        callback(null, this.list.shift());
    }.bind(this));
};

// add a song
Source.prototype.add = function (url) {
    this.list.push(url);
};

exports = module.exports = Source;