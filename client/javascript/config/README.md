SOL Guru (second version)
=========================

#### Built with:
* [node.js](http://www.nodejs.org/)
* [express](http://www.expressjs.com/)
* [gulp](http://www.gulpjs.com/)
* [convict](http://github.com/mozilla/node-convict/)
* [browserify](http://www.browserify.org/)
 * [hbsfy](http://github.com/epeli/node-hbsfy/)
 * [envify](http://github.com/hughsk/envify/)
* [handlebars](http://handlebarsjs.com/)
* [sass](http://sass-lang.com/)
* [bootstrap](http://getbootstrap.com/)
* [fontawesome](http://fortawesome.github.io/Font-Awesome/)
* [jquery](http://www.jquery.com/)

#### Testing
* [mocha](http://visionmedia.github.io/mocha/)
* [chai](http://chaijs.com/)
* [sinon](http://sinonjs.org/)

#### Install dependencies (some might need to use `sudo` for various reasons): ###
* `npm install -g mocha`
* `npm install -g gulp`
* `npm install`

#### Set environment variables
* `PORT` - Port exposed by this component.
 * example: `3000`
* `DEBUG` - Debug output (* for all) (optional)
 * example: `*`
* `NODE_ENV` - Environment ('development', 'staging', 'production')
 * example: `development`
* `CLIENT_API_PATH` - Path to the client REST api (relative)
 * example: `/api`
* `APPSECRET` - Application session secret
 * example: `sOmeCrAzYhAsH894372`
* `SESSION_KEY` - Application session secret (optional)
 * example: `express.sid` (default to `connect.sid`)

#### Run tests:
* `npm test` or `mocha -R spec`

#### Run the application:
* `gulp`
* navigate your browser to `http://localhost:3000` (or whatever port you chose for `PORT`)