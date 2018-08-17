const fetch = require("node-fetch");

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
		//Catches connectives which must be all lower case
		else if(!connectives.includes(stringArr[i])){
			stringArr[i] = stringArr[i].charAt(0).toUpperCase() + stringArr[i].slice(1).toLowerCase();
		} else{
			stringArr[i] = stringArr[i].toLowerCase();
		}
	}
}

//Utility functions for making API requests.
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

function makeRequest(url){
	const returnObj = {
		success: false,
		data: "Looks like there was a problem. Maybe try again later?"
	};
	
	return fetch(url)
	.then(function(response){
		if(response.status != 200){
			returnObj.data = returnObj.data + " " + "Status code: " + response.status;
			return returnObj;
		}
		return response.json();
	}).then(function(data){
		if(data != returnObj){
			if(data.count && data.count != 0){
				return makeRequest(data["results"][0].url);
			} else if(data._id){
				returnObj.success = true;
				returnObj.data = data;
			} else{
				returnObj.data = "I couldn't find that. Remember, my knowledge is limited to the 5e SRD. Are you sure it's in there?";
			}
		}
		return returnObj;
	})
	.catch(function(err){
		return errString + " " + err;
	});
}


module.exports.capitaliseStrings = capitaliseStrings;
module.exports.formatRequest = formatRequest;
module.exports.makeRequest = makeRequest;