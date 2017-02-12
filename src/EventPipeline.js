var trough = require('trough');
var log = require('debug')('df:ep');

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

module.exports = EventPipeline;