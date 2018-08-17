const Discord = require("discord.js");

function serverInfo(message){
	const userHandle = message.member.nickname || message.member.user.username;
	const serverIcon = message.guild.iconURL;
	const serverEmbed = new Discord.RichEmbed()
	.setTitle(message.guild.name)
	.setColor("#f4425c")
	.setThumbnail(serverIcon)
	.addField("Created On:", message.guild.createdAt, true)
	.addField(userHandle + " Joined On: ", message.member.joinedAt, true)
	.addField("Total Members:", message.guild.memberCount, true);
	
	return message.channel.send(serverEmbed);
}

module.exports = serverInfo;