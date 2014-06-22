exports = module.exports = function (collection, mongoose) {
    var schema = mongoose.Schema({
        uri: {
            type: String,
            required: true,
            index: true
        },
        artist: {
            type: String,
            required: true
        },
        song: {
            type: String,
            required: true
        },
        album: {
            type: String
        },
        image: {
            type: mongoose.Schema.Types.Mixed
        },
        duration: {
            type: Number
        },
        playing: {
            type: Boolean,
            default: false,
            required: true
        },
        queued: {
            type: Boolean,
            default: true,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            required: true
        }
    });

    return mongoose.model(collection, schema);
};