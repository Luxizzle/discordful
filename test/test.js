var Discordful = require('../index.js')
var client = new Discordful({
    autoReconnect: true
})

var CommandParser = require('./parser.js')
var parser = new CommandParser(client.discordie.User.id, {})

var token = require('./auth.js')

client.connect({token: token})

parser
    .command('ping', {
        description: 'We all know what this does'
    })
    .callback(function(args) {
        this.reply('pong! ' + args.join(', '))
    })

client.event('MESSAGE_CREATE')
    .use(function(e) {
        return e.message
    })  
    .use(parser.parse())