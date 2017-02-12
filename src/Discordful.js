var Discordie = require('discordie');
var log = require('debug')('df');

var EventPipeline = require('./EventPipeline');

class Discordful {
    constructor(options = {}) {
        var _this = this;
        this.discordie = new Discordie(options);

        this.event('GATEWAY_READY')
            .use(function() {
                log('Connected as ' + _this.discordie.User.username + '#' + _this.discordie.User.discriminator);
            });

        log('Created discordful object');

        return this;
    }

    connect(options) {
        this.discordie.connect(options);

        return this;
    }

    event(event) {
        return new EventPipeline(this, event);
    }
}

module.exports = Discordful;
