var Discordie = require('discordie');
var trough = require('trough');

class Discordful {
    constructor(options = {}) {
        this.discordie = new Discordie(options);

        return this
    }

    connect(options) {
        this.discordie.connect(options)

        return this
    }

    event(event) {
        return new EventPipeline(this, event)
    }
}

class EventPipeline {
    constructor(discordful, event) {
        var _this = this
        this.pipeline = trough() // MAKE A CUSTOM TROUGH SINCE I CANT EXTEND THIS SHIT
        this.discordful = discordful

        this.discordful.discordie.Dispatcher.on('MESSAGE_CREATE', (e) => {
            _this.pipeline.run(e.message, function(e) {
                // ANNOYING
            })
        })

        return this
    }

    use(fn) {
        this.pipeline.use(fn)

        return this
    }
}

module.exports = Discordful