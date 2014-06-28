SpotiPi
=========================

#### Introduction:
* Have you ever wanted to let other people add music to your queue on Spotify?
* Or would you like to control your queue from a remote location/device?
* Or just create your own DIY Chromecast that plays music from Spotify?
Then SpotiPi is for you!

With SpotiPi you can set up a computer of any kind (that runs node) to work as the receiver/streamer, with either a bundled web interface for controlling it, or just outsource the web interface to the cloud. Just make sure you connect both the player and web interface to the same redis and mongodb. Now anyone you want can have access to your queue and add music. Great for parties, and other occasions where you want your guests to add music to the queue from their own device. Enjoy!

![spotipi](http://s30.postimg.org/vr9i0v01d/desktop.png)

Landing                                           |  Queue
:------------------------------------------------:|:-------------------------------------------------:
![](http://s4.postimg.org/t626v49vh/landing.png)  |  ![](http://s24.postimg.org/ip633dc4l/queue.png)

#### Frontend Built with:
* [browserify](http://www.browserify.org/)
 * [hbsfy](http://github.com/epeli/node-hbsfy/)
 * [envify](http://github.com/hughsk/envify/)
* [handlebars](http://handlebarsjs.com/)
* [sass](http://sass-lang.com/)
* [bootstrap](http://getbootstrap.com/)
* [fontawesome](http://fortawesome.github.io/Font-Awesome/)
* [jquery](http://www.jquery.com/)

#### Backend Built with:
* [node.js](http://www.nodejs.org/)
* [express](http://www.expressjs.com/)
* [gulp](http://www.gulpjs.com/)
* [convict](http://github.com/mozilla/node-convict/)
* [node-spotify-web](https://github.com/TooTallNate/node-spotify-web)
* [node-speaker](https://github.com/TooTallNate/node-speaker)
* [node-lame](https://github.com/TooTallNate/node-lame)
* [mongodb](http://www.mongodb.org/)
* [redis](http://redis.io/)

#### Hardware requirements:
* raspberry pi model b (256mb or 512mb ram)
* wifi dongle supported by raspbian
* (it also runs on any "regular" computer - but that's not as fun!)

#### Preparing the raspberry pi:
* **install raspbian by using NOOBS - [guide](http://www.raspberrypi.org/help/noobs-setup/)**
* **install needed packages for the process**
 * `sudo apt-get update`
 * `sudo apt-get upgrade`
 * `sudo apt-get install build-essential`
 * `sudo apt-get install libasound2`
 * `sudo apt-get install mpg123`
* **install nodejs**
 * `sudo wget http://node-arm.herokuapp.com/node_latest_armhf.deb`
 * `sudo dpkg -i node_latest_armhf.deb`
* **install redis**
 * `sudo apt-get install redis-server`
* **install mongodb**
 * first set up a swapdisk if you are using the 256mb version
  * `sudo dd if=/dev/zero of=/swapfile1 bs=1024 count=524288`
  * `sudo mkswap /swapfile1`
  * `sudo chmod 0600 /swapfile1`
  * `sudo swapon /swapfile1`
  * **fetch repos needed for install**
  * `git clone git@github.com:brice-morin/ArduPi.git`
  * `git clone git@github.com:RickP/mongopi.git`
  * **install with the following commands**
  * `sudo adduser --firstuid 100 --ingroup nogroup --shell /etc/false --disabled-password --gecos "" --no-create-home mongodb`
  * `sudo cp -R mongodb-rpi/mongo /opt`
  * `sudo chmod +x /opt/mongo/bin/*`
  * `sudo mkdir /var/log/mongodb`
  * `sudo chown mongodb:nogroup /var/log/mongodb`
  * `sudo mkdir /var/lib/mongodb`
  * `sudo chown mongodb:nogroup /var/lib/mongodb`
  * `sudo cp mongopi/debian/init.d /etc/init.d/mongod`
  * `sudo cp mongopi/debian/mongodb.conf /etc/`
  * `sudo ln -s /opt/mongo/bin/mongod /usr/bin/mongod`
  * `sudo chmod u+x /etc/init.d/mongod`
  * `sudo update-rc.d mongod defaults`
  * `sudo /etc/init.d/mongod start`
  * `PATH=$PATH:/opt/mongo/bin`
  * `export PATH`

#### Cloning the software to your pi:
* `git clone git@github.com:eiriklv/spotipi.git`

#### Installing the software for SpotiPi-Frontend:
* `cd spotipi/frontend`
* `sudo npm install -g gulp`
* `npm install` - this might take a while, so grab a drink!
* if you have any issues with npm, try `npm cache clean` and try again

#### Installing the software for SpotiPi-Player:
* `cd spotipi/player`
* `npm install` - this might take a while, so grab a drink!
* if you have any issues with npm, try `npm cache clean` and try again

#### Spotify Account:
* you need a free Spotify account to be able to use the software
* (Spotify is great, so please pay for Spotify Premium to support them!)

#### Environment variables
* `PORT` - Port exposed by this component.
 * example: `3000`
* `DEBUG` - Debug output (* for all) (optional)
 * example: `*`
* `SPOTIFY_USERNAME` - Your Spotify username (required)
 * example: `user1234`
* `SPOTIFY_PASSWORD` - Your Spotify password (required)
 * example: `keyboardcat1234`

#### Run the frontend application:
* run `gulp build` from the `spotipi/frontend` directory
* run `node app` from the `spotipi/frontend` directory
* (create a shellscript with the above for convenience if you want)
* navigate your browser to `http://ip-of-your-raspberry-pi:3000` (or whatever port you chose for `PORT`)
* everyone with access to the web interface can now add songs to the queue! :)

#### Run the player:
* set environment variables
* run `node app` from the `spotipi/player` directory
* (create a shellscript with the above for convenience if you want)
* connect the audio to your stereo
* enjoy the music! :)

#### TODO
* create a pre-installed image that can be cloned to your SD-card (no install fuss!)
* create upstart-scripts that runs both applications when you boot the pi (plug and play!)
* be able to enter artist and track directly
* be able to search for tracks
* be able to add playlists with a single uri
* add skipping
* improve the frontend design