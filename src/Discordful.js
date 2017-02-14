var Discordie = require('discordie');
var log = require('debug')('df');

var EventPipeline = require('./EventPipeline');

/*
 * The Discordful class
 * @class
 * @param {Object} options - The options object (Includes the Discordie class options)
 * @returns {Discordful}
 */
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
    /*
     * @function
     * @param {Object} options - Options to connect with such as `token`
     * @returns {Discordful}
     */
    connect(options) {
        this.discordie.connect(options);

        return this;
    }

    /* @function
     * @param {String} event - The event name
     * @returns {EventPipeline}
     */
    event(event) {
        return new EventPipeline(this, event);
    }
}

module.exports = Discordful;
