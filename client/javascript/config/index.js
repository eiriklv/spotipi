exports = module.exports = {
    environment: process.env.NODE_ENV || 'production',
    port: process.env.PORT || 3000,
    api: {
        url: process.env.CLIENT_API_PATH || '/api'
    }
};