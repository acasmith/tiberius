const rollCommand = require("../roll");
let args = [];
let expected = [];
let result;

function equals(array1, array2){
	let equals = true;
	
	equals = array1.length === array2.length;
	for(x in array1){
		if(equals){
			equals = array1[x] === array2[x]; 
		} else{
			break;
		}
	}
	return equals;
}


/*if(!equals(result, expected)){
	throw new Error("Test fail: No parameters returned non-empty array. Expected: " + expected + ", got: " + result + ".");
}*/

test("No params", () => {
	expect(rollCommand.getParams(["!roll"])).toEqual([]);
});

test("Only number of dice", () => {
	expect(rollCommand.getParams(["!roll", "4"])).toEqual(["4"]);
});

test("Only dice type", () => {
	expect(rollCommand.getParams(["!roll", "d6"])).toEqual(["d6"]);
});

test("Only dice type (capitalised)", () => {
	expect(rollCommand.getParams(["!roll", "D6"])).toEqual(["D6"]);
});

args = ["!roll", "+7"];
expected = ["+7"];
result = rollCommand.getParams(args);
if(!equals(result, expected)){
	throw new Error("Test fail: Returned wrong parameters. Expected: " + expected + ", got: " + result + ".");
}

test("Only modifier (+ve)", () => {
	expect(rollCommand.getParams(["!roll", "D6"])).toEqual(["D6"]);
});

args = ["!roll", "-3"];
expected = ["-3"];
result = rollCommand.getParams(args);
if(!equals(result, expected)){
	throw new Error("Test fail: Returned wrong parameters. Expected: " + expected + ", got: " + result + ".");
}

args = ["!roll", "5d9"];
expected = ["5", "d9"];
result = rollCommand.getParams(args);
if(!equals(result, expected)){
	throw new Error("Test fail: Returned wrong parameters. Expected: " + expected + ", got: " + result + ".");
}

args = ["!roll", "5D9"];
expected = ["5", "D9"];
result = rollCommand.getParams(args);
if(!equals(result, expected)){
	throw new Error("Test fail: Returned wrong parameters. Expected: " + expected + ", got: " + result + ".");
}

args = ["!roll", "4", "+7"];
expected = ["4", "+7"];
result = rollCommand.getParams(args);
if(!equals(result, expected)){
	throw new Error("Test fail: Returned wrong parameters. Expected: " + expected + ", got: " + result + ".");
}

args = ["!roll", "4", "-7"];
expected = ["4", "-7"];
result = rollCommand.getParams(args);
if(!equals(result, expected)){
	throw new Error("Test fail: Returned wrong parameters. Expected: " + expected + ", got: " + result + ".");
}

args = ["!roll", "d4", "+37"];
expected = ["d4", "+37"];
result = rollCommand.getParams(args);
if(!equals(result, expected)){
	throw new Error("Test fail: Returned wrong parameters. Expected: " + expected + ", got: " + result + ".");
}

args = ["!roll", "d4", "-37"];
expected = ["d4", "-37"];
result = rollCommand.getParams(args);
if(!equals(result, expected)){
	throw new Error("Test fail: Returned wrong parameters. Expected: " + expected + ", got: " + result + ".");
}

args = ["!roll", "4d4", "+37"];
expected = ["4", "d4", "+37"];
result = rollCommand.getParams(args);
if(!equals(result, expected)){
	throw new Error("Test fail: Returned wrong parameters. Expected: " + expected + ", got: " + result + ".");
}



console.log("All tests passed!");