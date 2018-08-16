const Discord = require("discord.js");

function command(){
	const commandsEmbed = new Discord.RichEmbed()
	.setTitle("All Commands")
	.setColor("#f4425c")
	.addField("!info", "Information about the bot.")
	.addField("!commands", "I suspect you already knew this one.")
	.addField("!hello", "It's becoming self aware!!!")
	.addField("!serverinfo", "Information about this Discord server.")
	.addField("!help", "If you get stuck.")
	.addField("!roll ", "Rolls a d20. " + 
				"\n Takes up to 3 additional parameters specifying the number " + 
				"of sides, the number of times to roll and a flat modifier. " + 
				"\n Examples:" + 
				"\n'!roll 4' rolls 4 d20's. " + 
				"\n'!roll d6' rolls a six sided dice. " + 
				"\n'!roll +7' rolls a d20 and adds +7 to the result." + 
				"\n'!roll 4d6 +7' rolls a d6 4 times and adds +7 to the overall result.")
	.addField("!spells someSpell", "Queries the SRD for a spell. " + 
			"Spell names consisting of multiple words should be space separated eg. '!spells Legend Lore'")
	.addField("!prefix newPrefix", "Changes the command prefix to the given " +
				"prefix. Alternatively call '!prefix restrictions' for a " + 
				"list of prefix restrictions, or '!prefix reset' to reset " +
				"the prefix to default.");
			
	return commandsEmbed;
}

module.exports = command;