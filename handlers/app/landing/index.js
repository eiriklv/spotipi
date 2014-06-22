exports = module.exports = function (services) {
	return function (req, res) {
        res.render('landing', {
            title: 'Welcome to SpotiPi!',
            icon: 'fa-spotify'
        });
    };
};