const Discord = require("discord.js");
const botConfig = require("../botconfig.json");

function info(message, bot){
	const blurb = "Greetings! I'm Tiberius the red pseudodragon, familiar to the " + 
					"warlock Helena Halftree. Turns out the pocket dimension " +
					"that familiars are dismissed to is what you call the " + 
					"\"internet\". I find the idea of disemminating forbidden " + 
					"arcane knowledge to hapless humans enticing, so you may " +
					"query my vast intellect as you wish. I make no promises " + 
					"about replying, though...";
	
	const restrictions = "Due to strong magical protections from a cabal of " + 
							"coastal wizards, I can only share knowledge " + 
							"found in the 5th Edition System Reference Document (SRD).";
	
	const thanks = "Thanks to Adrian Padua for creating http://dnd5eapi.co !"
	
	const commands = "Use " + botConfig.prefix + "commands for the full list of commands.";
	
	const bugs = "If you find a bug or have a feature request, please " +
					"visit https://github.com/acasmith/tiberius";
	
	const botIcon = bot.user.displayAvatarURL;
	let botembed = new Discord.RichEmbed()
	.setColor("#f4425c")
	.setThumbnail(botIcon)
	.addField("Tiberius says:", blurb)
	.addField("Restrictions: ", restrictions)
	.addField("Acknowledgements: ", thanks)
	.addField("Help:", bugs)
	.addField("Hint: ", commands);
	return message.channel.send(botembed);
}

module.exports = info;