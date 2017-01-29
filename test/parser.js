class CommandParser {
    constructor(id, options = {}) {
        this.id = id
        this.prefix = options.prefix || '/';
        this.splitter = options.splitter || ' ';
        this.selfbot = options.selfbot || false
        this.commands = []
        return this
    }

    command(trigger, options) { 
        var cmd = new CommandNode(this, trigger, options)
        this.commands.push(cmd)

        return cmd
    }

    parse() {
        var _this = this
        return function(message, next) {
            if (_this.selfbot && message.author != _this.id) {
                return next(null, message)
            } else if (!_this.selfbot && message.author == _this.id) {
                return next(null, message)
            }

            var args = message.content.split(_this.splitter);
            var trigger = args[0]

            for (var i in _this.commands) {
                var cmd = _this.commands[i]

                if (trigger == _this.prefix + cmd.trigger) {
                    try {
                        cmd.run(message)
                        next(null, message)
                    } catch(e) { next(e) }
                }
            }
        }
    }

    parseRaw(message, next) {
        this.parse()(message, next)
    }
}

class CommandNode {
    constructor(parser, trigger, options = {}) {
        this.parser = parser
        this.trigger = trigger
        this.description = options.description || '',
        this.parameters = options.parameters || []

        return this
    }

    callback(cb) {
        this.runCallback = cb
    }

    run(message) {
        if (!this.runCallback) return console.warn('Tried running' + this.trigger + ' without a callback');

        var args = message.content.split(this.parser.splitter);
        args.shift();

        var env = new CommandEnv(this.parser, this, message)
        this.runCallback.call(env, args)

        return this
    }
}

class CommandEnv {
    constructor(parser, command, message) {
        this.parser = parser
        this.command = command
        this.message = message

        return this
    }

    reply(msg) {
        this.message.reply(msg)

        return this
    }
}

module.exports = CommandParser