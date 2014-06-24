// register handlebars block helpers
exports = module.exports = function (Handlebars, helpers) {
    for (var helper in helpers) {
        if (helpers.hasOwnProperty(helper)) {
            Handlebars.registerHelper(helper, helpers[helper]);
        }
    }
    return;
};