exports = module.exports = function (app, express, middleware, handlers, path) {
    app.use(path, require('./landing')(express, middleware, handlers, '/'));
    app.use(path, require('./queue')(express, middleware, handlers, '/queue'));
};