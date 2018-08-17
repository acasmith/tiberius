const Discord = require("discord.js");
const botConfig = require("../botconfig.json");

/*
Both use cases (querying for all command keywords or a specific command) 
return similar output, but I've made them different functions as I want to be 
able to come back and easily change them individually.
*/
function command(message, messageArray){
	const commandDescriptions = {
		info: "Information about the bot.",
		commands: "I suspect you already knew this one.",
		hello: "It's becoming self aware!!!",
		serverInfo: "Information about this Discord server.",
		help: "If you get stuck.",
		roll: "By default this command rolls a single d20. " + 
				"\n Takes up to 3 additional parameters specifying the the number of dice to roll, " + 
				"the number of sides the dice has, and a flat modifier to add to the overall result." + 
				"\n Examples:" + 
				"\n'" + botConfig.prefix + "roll' rolls a single d20. " +
				"\n'" + botConfig.prefix + "roll 4' rolls 4 d20's. " + 
				"\n'" + botConfig.prefix + "roll d6' rolls a six sided dice. " + 
				"\n'" + botConfig.prefix + "roll +7' rolls a d20 and adds +7 to the result." + 
				"\n'" + botConfig.prefix + "roll 4d6 +7' rolls a d6 4 times and adds +7 to the overall result.",
		spells: "Queries the SRD for a spell. " + 
				"Spell names consisting of multiple words should be space separated eg. '" + botConfig.prefix + "spells Legend Lore'",
		prefix: "Changes the command prefix to the given " +
					"prefix. Alternatively call '" + botConfig.prefix + "prefix restrictions' for a " + 
					"list of prefix restrictions, or '" + botConfig.prefix + "prefix reset' to reset " +
					"the prefix to default."
	};

	let result = "";
	let commandsString = "";
	const furtherInfo = "For a full explanation of any command, use '" + botConfig.prefix + "commands yourcommand'." + 
						"\n Eg. '" + botConfig.prefix + "commands roll' returns an explanation of the roll command.";
	const commandsEmbed = new Discord.RichEmbed()
		.setColor("#f4425c");
	
	function allCommands(){
		for(x in commandDescriptions){
			commandsString += botConfig.prefix + x + ", ";
		}
		commandsString = commandsString.slice(0, commandsString.length - 2) + ".";
		commandsEmbed.addField("All Commands", commandsString);
		commandsEmbed.addField("Questions?", furtherInfo);
		return commandsEmbed;
	}
	
	function specificCommand(messageArray){
		let response = "I don't know that command!";
		commandsString = commandDescriptions[messageArray[1]];
		if(commandsString){
			response = commandsEmbed.addField("Command Details: " + botConfig.prefix + messageArray[1], commandsString);
		}
		return response;
		
	}
	
	result = messageArray.length > 1 ? specificCommand(messageArray) : allCommands();
	
	return message.channel.send(result);
}

module.exports = command;