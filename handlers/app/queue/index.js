exports = module.exports = function (services) {
	return function (req, res) {
        res.render('queue', {
            title: 'SpotiPi',
            icon: 'fa-spotify'
        });
    };
};