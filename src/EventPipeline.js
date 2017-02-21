var trough = require('trough');
var log = require('debug')('df:ep');

/*
 * The event pipeline that you can plug plugins into
 * @class
 * @param {Discordful} discordful - The original discordful class
 * @param {String} event - The event name
 * @returns {EventPipeline}
 */
class EventPipeline {
    constructor(discordful, event) {
        var _this = this;
        this.eventName = event;
        this.pipeline = trough(); // MAKE A CUSTOM TROUGH SINCE I CANT EXTEND THIS SHIT
        this.discordful = discordful;

        this.discordful.discordie.Dispatcher.on(event, (e) => {
            _this.pipeline.run(e, err => {
                if (err) {
                    if (_this.discordful.options.throw) throw err;
                    log('EVENT ERROR : ' + err);
                }
            });
        });


        return this;
    }

    /*
     * @function
     * @param {Function} fn - The function to use
     * @returns {EventPipeline}
     */
    use(fn) {
        this.pipeline.use(fn);

        return this;
    }
}

module.exports = EventPipeline;
