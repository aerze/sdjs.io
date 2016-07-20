const request = require('request');

const Router = {
  jumplinks: [],
  recentChecks: [],

  init(callback) {
    const update = this.update.bind(this);
    callback = callback || function noop() {};

    request('http://localhost:3000/api/jumplinks', (error, response, body) => {
      let jumplinks = [];
      if (error) throw new Error(error);
      if (response.statusCode === 200 && body) {
        try {
          jumplinks = JSON.parse(body);
        } catch (parseError) {
          throw new Error(parseError);
        }

        update(jumplinks);
        callback();
      }
    });
  },

  transform(route, callback) {
    const jumplink = this.jumplinks.filter((jumplinkItem) => (jumplinkItem.baseRoute === route));

    // if we found any jumplinks, return the first one
    if (jumplink.length > 0) return callback(jumplink[0].targetRoute);

    // if we have recently check for it, return default
    if (this.recentChecks.indexOf(route) >= 0) return callback(null);

    // unknown route found, push to recent checks
    this.recentChecks.push(route);

    return this.init(() => {
      this.transform(route, callback);
    });
  },

  update(jumplinks) {
    this.jumplinks = jumplinks;
  },

  flushCheckCache() {
    this.recentChecks = [];
  },
};

module.exports = Router;
