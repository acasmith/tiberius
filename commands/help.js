const Discord = require("discord.js");
const botConfig = require("../botconfig.json");

function help(message){
	const blurb = "All commands use an " + botConfig.prefix + " prefix eg. " + 
					botConfig.prefix + "info";
	const commands = "Use " + botConfig.prefix + "commands for the full list of commands.";
	const bugs = "If you find a bug or have a feature request, please " +
					"visit https://github.com/acasmith/tiberius";
	
	const helpEmbed = new Discord.RichEmbed()
	.setColor("#f4425c")
	.addField("Prefix: ", blurb)
	.addField("Commands: ", commands)
	.addField("Further Help: ", bugs);
	
	return message.channel.send(helpEmbed);
}

module.exports = help;