var Discordie = require('discordie');
var log = require('debug')('discordful');
var trough = require('trough');

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

class EventPipeline {
    constructor(discordful, event) {
        var _this = this;
        this.eventName = event;
        this.pipeline = trough(); // MAKE A CUSTOM TROUGH SINCE I CANT EXTEND THIS SHIT
        this.discordful = discordful;

        this.discordful.discordie.Dispatcher.on(event, (e) => {
            _this.pipeline.run(e.message, e => {
                if (e) log('EVENT ERROR : ' + e);
            });
        });


        return this;
    }

    use(fn) {
        this.pipeline.use(fn);

        return this;
    }
}

module.exports = Discordful;
