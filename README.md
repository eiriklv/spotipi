SpotiPi
=========================

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
 * **install with following commands**
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

#### Installing the software for SpotiPi:
* `git clone git@github.com:eiriklv/spotipi.git`
* `cd spotipi`
* `npm install -g gulp`
* `npm install`

#### Environment variables
* `PORT` - Port exposed by this component.
 * example: `3000`
* `DEBUG` - Debug output (* for all) (optional)
 * example: `*`
* `SPOTIFY_USERNAME` - Your Spotify username (required)
 * example: `user1234`
* `SPOTIFY_PASSWORD` - Your Spotify password (required)
 * example: `keyboardcat1234`

#### Run the application:
* set environment variables
* `gulp`
* (create a shellscript with the above for convenience if you want)
* navigate your browser to `http://ip-of-your-raspberry-pi:3000` (or whatever port you chose for `PORT`)