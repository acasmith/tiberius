const botConfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone:true});

//Commands
const roll = require("./commands/roll.js");
const prefixCommand = require("./commands/prefix");
const commandsCommand = require("./commands/commands");
const spells = require("./commands/spells");
const info = require("./commands/info");
const help = require("./commands/help");
const serverInfo = require("./commands/serverinfo");

bot.on("ready", async () => {
	console.log("Tiberius ready!");
});

bot.on("message", async (message) => {
	if(message.author.bot){
		if(message.author.username === "TibbyBeta" && message.content.includes("NATURAL 20!")){
			message.react("🎉");
		};
		return;
	} 
	if(message.channel.type === "dm"){
		return;
	}
	
	const userHandle = message.member.nickname || message.member.user.username;
	let prefix = botConfig.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	
	if(cmd === `${prefix}hello`){
		return message.channel.send("Greetings, " + userHandle + "!");
	}
	
	//Prefixes can only be changed by server owner.
	if(cmd === `${prefix}prefix`){
		//Message sent here because returning raw response from command 
		//function is required for testing.
		return message.channel.send(prefixCommand(message, messageArray));
	}
	
	if(cmd === `${prefix}info`){
		return info(message, bot);
	}
	
	if(cmd === `${prefix}help`){
		return help(message);
	}
	
	if(cmd === `${prefix}serverinfo`){
		return serverInfo(message);
	}
	
	if(cmd === `${prefix}commands`){
		return commandsCommand(message, messageArray);
	}

	if(cmd === `${prefix}roll`){
		return roll.roll(message, messageArray);
	}
	
	if(cmd === `${prefix}spells`){
		return spells(message, messageArray);
	}
		
});

bot.login(botConfig.token);