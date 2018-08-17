const request = require("./request");
const Discord = require("discord.js");

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
		.addField("Full Details: (unformatted)", url + "/" + spellData["_id"], true);
	return shortSpellEmbed;
}

function spells(message, messageArray){
	const loadingStrings = ["Browsing ancient library...", "Perusing arcane tomes...", "Communing with demonic patron..." ];
	const randomString = loadingStrings[Math.floor(Math.random() * loadingStrings.length)];
	const baseURL = "http://dnd5eapi.co/api/";
	const route = messageArray[0].slice(1);
	let args;
	if(messageArray.length > 1){
		args = messageArray.slice(1);
		request.capitaliseStrings(args);
		
		const url = request.formatRequest(baseURL, route, args);
		message.channel.send(randomString);
		let response = request.makeRequest(url)
		.then((data) => {
			let formattedResponse = data.data;
			if(data.success){
				formattedResponse = shortSpellFormat(data.data, baseURL + route);
			}
			message.channel.send(formattedResponse);
		});
		
	} else{
		message.channel.send("Please name a spell for me to look up!");
	}
}

module.exports = spells;