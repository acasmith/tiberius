const botConfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone:true});
const tibbyRed = "#f4425c";
const rollCommand = require("./commands/roll.js");
const prefixCommand = require("./commands/prefix");
const commandsCommand = require("./commands/commands");
const request = require("./commands/request");
const spells = require("./commands/spells");

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
		return message.channel.send(prefixCommand(message, messageArray));
	}
	
	if(cmd === `${prefix}info`){
		const blurb = "Greetings! I'm Tiberius the red pseudodragon, familiar to the " + 
		"warlock Helena Halftree. Turns out the pocket dimension that familiars are dismissed to is " +
		"what you call the \"internet\". I find the idea of disemminating " +
		"forbidden arcane knowledge to hapless humans enticing, so you may " +
		"query my vast intellect as you wish. I make no promises about replying, though...";
		
		const restrictions = "Due to strong magical protections from a cabal of coastal wizards, I can " + 
							"only share knowledge found in the 5th Edition System Reference Document (SRD).";
		
		const thanks = "Thanks to Adrian Padua for creating http://dnd5eapi.co !"
		
		const commands = "Use !commands for the full list of commands.";
		
		const bugs = "If you find a bug or have a feature request, please " +
		"visit https://github.com/acasmith/tiberius"
		
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
	
	if(cmd === `${prefix}help`){
		const blurb = "All commands use an ! prefix eg. !info";
		const commands = "Use !commands for the full list of commands.";
		const bugs = "If you find a bug or have a feature request, please " +
		"visit https://github.com/acasmith/tiberius"
		
		const helpEmbed = new Discord.RichEmbed()
		.setColor("#f4425c")
		.addField("Prefix: ", blurb)
		.addField("Commands: ", commands)
		.addField("Further Help: ", bugs);
		
		return message.channel.send(helpEmbed)
	}
	
	if(cmd === `${prefix}serverinfo`){
		const serverIcon = message.guild.iconURL;
		const serverEmbed = new Discord.RichEmbed()
		.setTitle(message.guild.name)
		.setColor(tibbyRed)
		.setThumbnail(serverIcon)
		.addField("Created On", message.guild.createdAt, true)
		.addField(userHandle + " Joined On: ", message.member.joinedAt, true)
		.addField("Total Members", message.guild.memberCount, true);
		return message.channel.send(serverEmbed);
		
	}
	
	if(cmd === `${prefix}commands`){
		return message.channel.send(commandsCommand(messageArray));
	}

	if(cmd === `${prefix}roll`){
		return message.channel.send(rollCommand.roll(message, messageArray));
	}
	
	if(cmd === `${prefix}spells`){
		/*const loadingStrings = ["Browsing ancient library...", "Perusing arcane tomes...", "Communing with demonic patron..." ];
		const randomString = loadingStrings[Math.floor(Math.random() * loadingStrings.length)];
		const baseURL = "http://dnd5eapi.co/api/";
		const route = cmd.slice(1);
		let args;
		if(messageArray.length > 1){
			args = messageArray.slice(1);
			request.capitaliseStrings(args);
			
			const url = request.formatRequest(baseURL, route, args);
			message.channel.send(randomString);
			request.makeRequest(url, message, request.makeRequest);
		} else{
			message.channel.send("Please name a spell for me to look up!");
		}*/
		
	return spells(message, messageArray);
	}
		
});

//Utility functions

bot.login(botConfig.token);