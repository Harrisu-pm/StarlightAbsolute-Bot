const Discord = require('discord.js')
module.exports = {
	name: 'ping',
    description: 'Xem độ trễ',
    inVoiceChannel: false,
	run: async (client, message) => {
	const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Pong! \`${client.ws.ping}\` ms`)
        message.channel.send({ embeds: [embed] })
    }
}
