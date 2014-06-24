// throw error
function _throw (m) {
    throw m;
}

// dependencies
var util = require('util');
var convict = require('convict');
var debug = require('debug')('spotipi-player:configuration');
var validator = require('validator');

// catch all errors with no handler
process.on('uncaughtException', function (err) {
    debug('Caught exception without specific handler: ' + util.inspect(err));
    debug(err.stack, 'error');
    process.exit(1);
});

// application config
var config = module.exports = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development'],
        default: 'production',
        env: 'NODE_ENV'
    },
    database: {
        mongo: {
            url: {
                doc: 'MongoDB url to connect to (including db reference)',
                default: 'mongodb://localhost/spotipi',
                env: 'MONGO_URL'
            }
        },
        redis: {
            url: {
                doc: 'Redis url to connect to (including auth string)',
                default: 'redis://localhost:6379',
                env: 'REDIS_URL'
            },
            db: {
                doc: 'Redis database number (0-15)',
                default: 0,
                env: 'REDIS_DB'
            }
        }
    },
    spotify: {
        username: {
            doc: 'Spotify username',
            default: 'user1234',
            env: 'SPOTIFY_USERNAME'
        },
        password: {
            doc: 'Spotify password',
            default: 'keyboardcat',
            env: 'SPOTIFY_PASSWORD'
        }
    }
});

// print the environment for debugging
debug(util.inspect(process.env, { colors: true }));

// perform the config validation
config.validate();
