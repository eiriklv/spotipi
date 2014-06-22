exports = module.exports = function (queue) {
    return function (req, res) {
        queue.add(req.body.uri, function (err, result) {
            if (err) return res.send(400, err);
            res.send(201, result);
        });
    };
};