// Hullo! I'm here to provide snide commentary on your code! -ZeroBits
// Here we see uncommented code in its natural environment, which is to say, in desperate need of useless commentary

var Discordie = require('discordie'); // Do I know what this is? nope
var Events = Discordie.Events; // But I have a somewhat decent idea
var log = require('debug')('discordful'); // Debug stuff, not interesting, but probably mildly important
var trough = require('trough'); // You sure do require a lot of stuff. Like, 3 whole things. Is that actually a lot? Hell if I know

class Discordful { // A class, self explainatory
    constructor(options = {}) { // Constructors mate
        var _this = this // _this is this, which, idk, seems kind of redundant, unless it isn't at some point later.
        this.discordie = new Discordie(options); //Defining the Discordful's Discordie

        this.event('GATEWAY_READY') // When the GATEWAY is READY, this should fire
            .use(function() { // And then it will probably(?) run this function
                log('Connected as ' + _this.discordie.User.username + '#' + _this.discordie.User.discriminator) // Status junk, login, etc.
            })

        log('Created discordful object') // Loggy stuff

        return this // And it returns the object, unsurprisingly
    }

    connect(options) { // The connect method (are they methods in JS?)
        this.discordie.connect(options) // I'm not sure what I expected, this is really straightforward

        return this // And it returns the object again for some reason (probably maybe useful later or something, idk)
    }

    event(event) { // So, this creates an event, that is all
        return new EventPipeline(this, event) // Or maybe it triggers an event? no clue, I haven't read the EventPipeline class yet
    }
}



class EventPipeline { // The EVENT PIPELINE, It's like an Oil Pipeline for events or something
    constructor(discordful, event) { // The constructor, takes two args, it looks like it takes a discordful and event
        // Same arguments as the discordful gives on its event method call I suppose
        var _this = this // _this is this again, I'm pretty sure it's redundant, but Lux probably knows a bit more about JS than me
        this.eventName = event; // the event name is the event arg, unsurprisingly perhaps, or perhaps not
        this.pipeline = trough(); // MAKE A CUSTOM TROUGH SINCE I CANT EXTEND THIS SHIT // The one comment in this file, idk what the hell a trough is
        this.discordful = discordful; // self explainatory

        this.discordful.discordie.Dispatcher.on(event, (e) => { // Well this is a bit of a thing, getting all unreadable on me here
            _this.pipeline.run(e.message, e => { //maybe this outputs a message? Or maybe it runs on the event?
                if (e) log('EVENT ERROR : ' + e); // Right, this is an error, simple and straightforward and all that
            });
        });


        return this // No surprise here
    }

    use(fn) { // use is a use
        this.pipeline.use(fn) // This will use the pipeline. Do I know what that means? no

        return this // Returns the object again, maybe a bit redundant if you already have it from the constructor, maybe not
    }
}

module.exports = Discordful // And here we are, the end.
