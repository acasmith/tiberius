/*
	Split into: getParams, assignParams, getNumber, formatResponse.
	Let main script send response.
*/

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
			rollParams[2] = rollParams[2] === undefined ? Number(param) : NaN;
		} else{
			rollParams[1] = rollParams[1] === undefined ? Number(param) : NaN;
		}
	}
	
	for(let i = 0; i < rollParams.length; i++){
		if(rollParams[i] === undefined){
			rollParams[i] = defaults[i];
		}
	}
	return rollParams;
}

function formatResponse(values){
	
}



function roll(message, messageArray){
	let rollArgs;	//Number of faces, number of dice, modifier.
	let response = "I can't roll that!";
	let messageParams = [];
	
	
	if(messageArray.length > 1){
		messageParams = getParams(messageArray);
	}
	
	rollArgs = idParams(messageParams);
	console.log(rollArgs);
	
	const reducer = (accumulator, element) => accumulator && !isNaN(element) && typeof element === "number";
			
	/*if(rollArgs.reduce(reducer, true)){
		response = "";
		let total = 0;
		let highest = 0;
		let lowest = rollArgs[0];
		for(let i = 0; i < rollArgs[1]; i++){
			let random = Math.floor(Math.random() * rollArgs[0]) + 1;
			total += random;
			highest = highest > random ? highest : random;
			lowest = lowest < random ? lowest : random;
			response += (random === 20 && rollArgs[0] === 20) ? "NATURAL " + random + "!" : random;	//Get bot to set a reaction to the 20 if it's a single throw.
			response += (i === rollArgs[1] - 1) ? "" : ", ";
		}
		if(rollArgs[1] > 1){
			const rolled = response;
			response = new Discord.RichEmbed()
				.setTitle(userHandle + " rolls " + rollArgs[1] + "d" + rollArgs[0] + "'s!")
				.setColor(tibbyRed)
				.addField("Rolled: ", rolled, true)
				.addField("Total: ", total, true)
				.addField("Highest: ", highest, true)
				.addField("Lowest: ", lowest, true)
				.addField("Average (rounded down): ", Math.floor(total / rollArgs[1]), true);
		}
	}
	return message.channel.send(response);*/
}

module.exports.getParams = getParams;
module.exports.idParams = idParams;
module.exports.roll = roll;