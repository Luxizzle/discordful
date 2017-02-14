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

        this.User = this.discordie.User;
        this.Users = this.discordie.Users;
        this.Guilds = this.discordie.Guilds;
        this.Channels = this.discordie.Channels;
        this.DirectMessageChannels = this.discordie.DirectMessageChannels;
        this.Messages = this.discordie.Messages;
        this.VoiceConnections = this.discordie.VoiceConnections;
        this.Webhooks = this.discordie.Webhooks;
        this.UnavailableGuilds = this.discordie.UnavailableGuilds;
        this.autoReconnect = this.discordie.autoReconnect;

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
    disconnect() {
        this.discordie.disconnect();

        return this;
    }

    /* @function
     * @param {String} event - The event name
     * @returns {EventPipeline}
     */
    event(event) {
        return new EventPipeline(this, event);
    }

    get state() { return this.discordie.state; }
    get connected() { return this.discordie.connected; }
}

module.exports = Discordful;
