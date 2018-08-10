const botConfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone:true});
const fetch = require("node-fetch");

bot.on("ready", async () => {
	console.log("Tiberius ready!");
});

bot.on("message", async (message) => {
	if(message.author.bot){
		return;
	} 
	if(message.channel.type === "dm"){
		return;
	}
	
	let prefix = botConfig.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	
	if(cmd === `${prefix}hello`){
		return message.channel.send("Greetings, " + message.member.user.username + "!");
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
		
		const botIcon = bot.user.displayAvatarURL;
		let botembed = new Discord.RichEmbed()
		.setColor("#f4425c")
		.setThumbnail(botIcon)
		.addField("Tiberius says:", blurb)
		.addField("Restrictions: ", restrictions)
		.addField("Acknowledgements: ", thanks)
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
		.setColor("#f4425c")
		.setThumbnail(serverIcon)
		.addField("Created On", message.guild.createdAt, true)
		.addField(message.member.user.username + " Joined On: ", message.member.joinedAt, true)
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
				"Spell names consisting of multiple words should be space separated eg. '!spells Legend Lore'");
				
		return message.channel.send(commandsEmbed);
	}

	if(cmd === `${prefix}roll`){
		let args = [20, 1];
		let response = "I can't roll that!";
		
		if(messageArray.length > 1){
			if(messageArray[1].charAt(0) === 'd' || messageArray[1].charAt(0) === 'D'){
				args[0] = Number(messageArray[1].slice(1));
				args[1] = Number(messageArray.length > 2 ? messageArray[2] : 1);
			}
			
		}
		const reducer = (accumulator, element) => accumulator && typeof element === "number" && !isNaN(element);
				
		if(args.reduce(reducer, true)){
			response = "";
			let total = 0;
			for(let i = 0; i < args[1]; i++){
				let random = Math.floor(Math.random() * args[0]) + 1;
				total += random;
				response += (random === 20 && args[0] === 20) ? "NATURAL " + random + "!" : random;
				response += (i === args[1] - 1) ? "" : ", ";
			}
			if(args[1] > 1){
				response += "\nTotal: " + total + "\n";
				response += "Average (rounded down): " + Math.floor(total / args[1]);
			}
		}
		
		
		return message.channel.send(response);
		
		
		
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