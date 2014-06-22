exports = module.exports = function (queue) {
    return function (req, res) {
        queue.skip(function (err, result) {
            if (err) return res.send(400, err);
            res.send(200, result);
        });
    };
};