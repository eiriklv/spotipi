exports = module.exports = function (app, express, middleware, handlers, path) {
    app.use(path, require('./queue')(express, middleware, handlers, '/queue'));
    app.use(path, require('./skip')(express, middleware, handlers, '/skip'));
};