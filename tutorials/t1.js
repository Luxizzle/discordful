var Discordful = require('discordful');
var bot = new Discordful({ // Create a new discordful bot
  // Accepts all the default Discordie class parameters, but not the sharding ones.
  autoReconnect: true
});

bot.connect({ token: 'TOKEN_HERE' }); // Connect to the api with your token or email and password

bot.event('MESSAGE_CREATE') // Get an EventPipeline for the MESSAGE_CREATE event, this fires everytime there is a new message
.use(function(e) { // Call .use which accepts a function which returns the discordie payload
  var message = e.message; // Grab the message from the discordie payload
  var username = message.author.username;
  var content = message.content;
  return console.log(username + ': ' + content); // Just log the messages to the console
});

// Discordful is made with chaining in mind, so every function returns itself
// This way you can set up long chains of .use without grabbing the EventPipeline every time!
