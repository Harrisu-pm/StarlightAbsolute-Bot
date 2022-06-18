const Discord = require('discord.js');
require("dotenv").config();
 
const client = new Discord.Client({
    intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES
  ] 
})
const fs = require('fs')
var figlet = require('figlet');

fs.readdir('./commands/', (err, files) => {
  if (err) return console.log('Could not find any commands!')
  const jsFiles = files.filter(f => f.split('.').pop() === 'js')
  if (jsFiles.length <= 0) return console.log('Could not find any commands!')
  jsFiles.forEach(file => {
    const cmd = require(`./commands/${file}`)
    console.log(`Loaded ${file}`)
    client.commands.set(cmd.name, cmd)
    if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
  })
})
client.on('ready', () => {
  client.user.setActivity(`Hello world`, { type: "PLAYING" });
  console.log("Logged in as")
  figlet(client.user.tag, function(err, data) {
    if (err) {
        console.log('Error...');
        console.dir(err);
        return;
    }
    console.log(data)
  })
});

client.login(process.env.TOKEN)
