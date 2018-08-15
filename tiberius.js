const botConfig = require("./botconfig.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const guildPrefixLookup = {};	//Load in from DB on launch/write to DB before logout.
const bot = new Discord.Client({disableEveryone:true});
const tibbyRed = "#f4425c";
const rollCommand = require("./commands/roll.js");

bot.on("ready", async () => {
	console.log("Tiberius ready!");
});

bot.on("message", async (message) => {
	if(message.author.bot){
		if(message.author.username === "TibbyBeta" && message.content === "NATURAL 20!"){
			console.log("🎉");
			message.react("🎉");
		};
		return;
	} 
	if(message.channel.type === "dm"){
		return;
	}
	
	const userHandle = message.member.nickname || message.member.user.username;
	let prefix = guildPrefixLookup[message.channel.guild.id] || botConfig.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	
	if(cmd === `${prefix}hello`){
		return message.channel.send("Greetings, " + userHandle + "!");
	}
	
	//Prefixes can only be changed by server owner.
	if(cmd === `${prefix}prefix`){
		let response = "Please include a valid prefix with the command.";
		const guildID = message.channel.guild.id;
		const invalidPrefixes = /\w/;
		
		if(messageArray.length > 1){
			if(messageArray[1] === "restrictions"){
				response = "Prefixes can only be changed by server owners. " +
							"Please limit your prefix to any non-alphanumeric character. Eg. !, /, %";
			} else if(message.author.id === message.guild.owner.id){
				if(messageArray[1] === "reset"){
					//Using more costly delete rather than setting to null to save space.
					delete guildPrefixLookup[guildID];
					response = "Prefix changed to " + botConfig.prefix;
				} else if(messageArray[1].length === 1 && !messageArray[1].match(invalidPrefixes)){
						guildPrefixLookup[guildID] = messageArray[1];
						response = "Prefix changed to " + guildPrefixLookup[guildID];
					}
			} else{
				response = "Only the server owner can change the prefix.";
			}
		}
		return message.channel.send(response);
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
		
		const commandsEmbed = new Discord.RichEmbed()
		.setTitle("All Commands")
		.setColor("#f4425c")
		.addField("!info", "Information about the bot.")
		.addField("!commands", "I suspect you already knew this one.")
		.addField("!hello", "It's becoming self aware!!!")
		.addField("!serverinfo", "Information about this Discord server.")
		.addField("!help", "If you get stuck.")
		.addField("!roll ", "Rolls a d20. " + 
					"\n Takes two optional parameters specifying the number " + 
					"of sides and the number of dice to roll. Eg. '!roll d6 4' rolls a d6 4 times.")
		.addField("!spells someSpell", "Queries the SRD for a spell. " + 
				"Spell names consisting of multiple words should be space separated eg. '!spells Legend Lore'")
		.addField("!prefix newPrefix", "Changes the command prefix to the given " +
					"prefix. Alternatively call '!prefix restrictions' for a " + 
					"list of prefix restrictions, or '!prefix reset' to reset " +
					"the prefix to default.");
				
		return message.channel.send(commandsEmbed);
	}

	if(cmd === `${prefix}roll`){
		return message.channel.send(rollCommand.roll(message, messageArray));
	}
	
	if(cmd === `${prefix}spells`){
		const loadingStrings = ["Browsing ancient library...", "Perusing arcane tomes...", "Communing with demonic patron..." ];
		const randomString = loadingStrings[Math.floor(Math.random() * loadingStrings.length)];
		const baseURL = "http://dnd5eapi.co/api/";
		const route = cmd.slice(1);
		let args;
		if(messageArray.length > 1){
			args = messageArray.slice(1);
			capitaliseStrings(args);
			
			const url = formatRequest(baseURL, route, args);
			message.channel.send(randomString);
			makeRequest(url, message, makeRequest);
		} else{
			message.channel.send("Please name a spell for me to look up!");
		}
		

	}
		
});

//Utility functions

function capitaliseStrings(stringArr){
	const connectives = ["of", "Of", "OF", "and", "And", "AND", "with", "With", "WITH", "or", "Or", "OR", "the", "The", "THE", "to", "To", "TO", "into", "Into", "INTO", "without", "Without", "WITHOUT", "from", "From", "FROM", "via", "Via", "VIA"];
	for(let i = 0; i < stringArr.length; i++){
		//Catches duo spells eg. "Antipathy/Sympathy"
		if(stringArr[i].includes('/')){
			const slashIndex = stringArr[i].indexOf('/');
			const firstWord = stringArr[i].charAt(0).toUpperCase() + stringArr[i].slice(1, slashIndex + 1);
			const secondWord = stringArr[i].charAt(slashIndex + 1).toUpperCase() + stringArr[i].slice(slashIndex + 2);
			stringArr[i] = firstWord + secondWord;
		}
		//Catches connectives
		else if(!connectives.includes(stringArr[i])){
			stringArr[i] = stringArr[i].charAt(0).toUpperCase() + stringArr[i].slice(1).toLowerCase();
		} else{
			stringArr[i] = stringArr[i].toLowerCase();
		}
	}
}

function formatRequest(baseURL, route, args){
	let url = baseURL + route;
	if(args){
		url += "/?name=" + args[0];
		for(let i = 1; i < args.length; i++){
			url += "+" + args[i];
		}
	}
	return url;
}

function makeRequest(url, message, callback){
	const errString = "Looks like there was a problem. Maybe try again later?"
	fetch(url)
		.then(
			function(response) {
				if(response.status != 200){
					return message.channel.send(errString);
				}
				
				response.json().then(function(data){
					if(data.count != 0){
						if(callback){
							callback(data["results"][0].url, message);
							return;
						} else{
							const embed = shortSpellFormat(data, url);
							return message.channel.send(embed);
						}
					} else{
						return message.channel.send("I couldn't find that spell. Remember, my knowledge is limited to the 5e SRD. Are you sure it's in there?");
					}
				})
				.catch(function(err){
					return message.channel.send(errString);
				});
			}
		)
		.catch(function(err){
			return message.channel.send(errString);
		});
}

function shortSpellFormat(spellData, url){
	const schoolColor = {
		"Abjuration": "#F1EC95",
		"Conjuration": "#A0D7F3",
		"Transmutation": "#F9E0B7",
		"Divination": "#E1E1E1",
		"Necromancy": "#000000",
		"Evocation": "#F44242",
		"Illusion": "#D58CED",
		"Enchantment": "#A6F4A0"
	};
	
	const shortSpellEmbed = new Discord.RichEmbed()
		.setTitle(spellData["name"] + " (Short Summary)")
		.setColor(schoolColor[spellData.school.name])
		.addField("Range:", spellData["range"], true)
		.addField("Cast Time: ", spellData["casting_time"], true)
		.addField("Duration:", spellData["duration"], true)
		.addField("Components:", spellData["components"].reduce((accumulator, element) => accumulator + element), true)
		.addField("Materials:", spellData["material"] || "None", true)
		.addField("Ritual", spellData["ritual"], true)
		.addField("Level: ", spellData["level"], true)
		.addField("Full Details: (unformatted)", url, true);
	return shortSpellEmbed;
}

bot.login(botConfig.token);