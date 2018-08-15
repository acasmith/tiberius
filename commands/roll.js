const Discord = require("discord.js");

function getParams(messageArray){
	const params = [];
	for(let i = 1; i < messageArray.length; i++){
		let indexOfD = messageArray[i].indexOf('d');
		indexOfD = indexOfD === -1 ? messageArray[i].indexOf('D') : indexOfD;
		
		if(indexOfD > 0){
			params.push(messageArray[i].slice(0, indexOfD));
			params.push(messageArray[i].slice(indexOfD));
		} else{
			params.push(messageArray[i]);
		}
	}
	return params;
}


function idParams(messageParams){
	const defaults = [20, 1, 0];
	let rollParams = [undefined, undefined, undefined];
	let param;
	
	if(!messageParams || messageParams.length < 1){
		return defaults;
	}
	
	for(let i = 0; i < messageParams.length; i++){
		param = messageParams[i];
		if(param.charAt(0) === 'd' || param.charAt(0) === 'D'){
			rollParams[0] = rollParams[0] === undefined ? Number(param.slice(1)) : NaN;
		} else if(param.charAt(0) === '+' || param.charAt(0) === '-'){
			if(param === '+' || param === '-' && (i + 1 < messageParams.length)){
				param += messageParams[i+1];
				i += 1;
			}
			rollParams[2] = rollParams[2] === undefined ? Number(param) : NaN;
		} else{
			rollParams[1] = rollParams[1] === undefined ? Number(param) : NaN;
		}
	}
	
	for(let i = 0; i < rollParams.length; i++){
		if(rollParams[i] === undefined){
			rollParams[i] = defaults[i];
		}
	return rollParams;
}

function formatResponse(values, rollArgs){
	let response = "I can't roll that!";
	
	if(values.rolled){
		if(values.rolled.length < 2){
			response  = values[0] === 20 ? "NATURAL 20!" : values.rolled[0];
		}
		else{
			const rolled = values.rolled.reduce((acc, element) => (acc + ", " + element));
			let titleString = values.userHandle + " rolls " + rollArgs[1];
			titleString += "d" + rollArgs[0];
			let titleMod = "'s";
			if(rollArgs[2] > 0){
				titleMod = " +" + rollArgs[2];
			} else if(rollArgs[2] < 0){
				titleMod = " " + rollArgs[2];
			}
			titleString += titleMod + "!";
			response = new Discord.RichEmbed()
					.setTitle(titleString)
					.setColor("#f4425c")
					.addField("Rolled: ", rolled, true)
					.addField("Total: ", values.total, true)
					.addField("Highest: ", values.highest, true)
					.addField("Lowest: ", values.lowest, true)
					.addField("Average (rounded down): ", values.average, true);
		}
	}
	
	return response;
}


function roll(message, messageArray){
	let rollArgs;	//Number of faces, number of dice, modifier.
	let messageParams = [];
	const rolled = [];
	const values = {};
	const reducer = (accumulator, element) => accumulator && !isNaN(element) && typeof element === "number";
	
	if(messageArray.length > 1){
		messageParams = getParams(messageArray);
	}
	rollArgs = idParams(messageParams);
	
	if(rollArgs.reduce(reducer, true)){
		for(let i = 0; i < rollArgs[1]; i++){
			rolled.push(Math.floor(Math.random() * rollArgs[0]) + 1);
		}
		
		values.rolled = rolled;
		values.total = rolled.reduce((acc, element) => (acc + element)) + rollArgs[2];
		values.highest = Math.max.apply(Math, rolled);
		values.lowest = Math.min.apply(Math, rolled);
		values.average = Math.floor(values.total / rolled.length);
		values.userHandle = message.member.nickname || message.member.user.username;
	}
	
	return formatResponse(values, rollArgs, Discord);
}

module.exports.getParams = getParams;	//Exponsed for testing
module.exports.idParams = idParams;		//Exposed for testing
module.exports.roll = roll;