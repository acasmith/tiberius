const botConfig = require("../botconfig.json");

function prefix(message, messageArray){
	let response = "Please include a valid prefix with the command.";
	const invalidPrefixes = /\w/;
	
	if(messageArray.length > 1){
		if(messageArray[1] === "restrictions"){
			response = "Prefixes can only be changed by server owners. " +
						"Please limit your prefix to any non-alphanumeric character. Eg. !, /, %";
		} else if(message.author.id === message.guild.owner.id){
			if(messageArray[1] === "reset"){
				botConfig.prefix = "!";
				response = "Prefix reset to " + botConfig.prefix;
			} else if(messageArray[1].length === 1 && !messageArray[1].match(invalidPrefixes)){
					botConfig.prefix = messageArray[1];
					response = "Prefix changed to " + botConfig.prefix;

			}
		} else{
			response = "Only the server owner can change the prefix.";
		}
	}
	return response;
}

module.exports = prefix;