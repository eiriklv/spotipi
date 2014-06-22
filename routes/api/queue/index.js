exports = module.exports = function (express, middleware, handlers, path) {
    var router = express();

    router.route(path)
        .all(middleware.isLoggedInAPI)
        .get(handlers.queue.get)
        .post(handlers.queue.add)

    return router;
};