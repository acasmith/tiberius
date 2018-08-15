const rollCommand = require("../commands/roll");

//********getParams() Tests **************************
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

test("Only modifier (+ve)", () => {
	expect(rollCommand.getParams(["!roll", "+7"])).toEqual(["+7"]);
});

test("Only modifier (-ve)", () => {
	expect(rollCommand.getParams(["!roll", "-3"])).toEqual(["-3"]);
});

test("Quantity and dice type", () => {
	expect(rollCommand.getParams(["!roll", "5d9"])).toEqual(["5", "d9"]);
});

test("Quantity and dice type (capitalised)", () => {
	expect(rollCommand.getParams(["!roll", "5D9"])).toEqual(["5", "D9"]);
});

test("Quantity and modifier (+ve)", () => {
	expect(rollCommand.getParams(["!roll", "4", "+7"])).toEqual(["4", "+7"]);
});

test("Quantity and modifier (-ve)", () => {
	expect(rollCommand.getParams(["!roll", "4", "-7"])).toEqual(["4", "-7"]);
});

test("Dice type and modifier (+ve)", () => {
	expect(rollCommand.getParams(["!roll", "d4", "+37"])).toEqual(["d4", "+37"]);
});

test("Dice type and modifier (-ve)", () => {
	expect(rollCommand.getParams(["!roll", "d4", "-37"])).toEqual(["d4", "-37"]);
});

test("Quantity, dice type and modifier", () => {
	expect(rollCommand.getParams(["!roll", "4d4", "+37"])).toEqual(["4", "d4", "+37"]);
});

test("Random nonsense parameters 0", () => {
	expect(rollCommand.getParams(["!roll", "abc", "12"])).toEqual(["abc", "12"]);
});

test("Random nonsense parameters 1", () => {
	expect(rollCommand.getParams(["!roll", "abc", "$ffd6"])).toEqual(["abc", "$ff", "d6"]);
});

//*************End getParams() tests **********************

//************idParams() tests ****************************
test("No params", () => {
	expect(rollCommand.idParams([])).toEqual([20, 1, 0]);
});

test("Quantity param only", () => {
	expect(rollCommand.idParams(["4"])).toEqual([20, 4, 0]);
});

test("Two quantity params", () => {
	expect(rollCommand.idParams(["4", "17"])).toEqual([20, NaN, 0]);
});

test("Dice type param only", () => {
	expect(rollCommand.idParams(["d6"])).toEqual([6, 1, 0]);
});

test("Dice type param only (capitalised)", () => {
	expect(rollCommand.idParams(["D6"])).toEqual([6, 1, 0]);
});

test("Two dice type params", () => {
	expect(rollCommand.idParams(["d6", "d20"])).toEqual([NaN, 1, 0]);
});

test("Modifier param only (+ve)", () => {
	expect(rollCommand.idParams(["+7"])).toEqual([20, 1, 7]);
});

test("Modifier param only (-ve)", () => {
	expect(rollCommand.idParams(["-7"])).toEqual([20, 1, -7]);
});

test("Two modifier params", () => {
	expect(rollCommand.idParams(["+7", "-3"])).toEqual([20, 1, NaN]);
});

test("Space separated modifier", () => {
	expect(rollCommand.idParams(["-" , "17"])).toEqual([20, 1, -17]);
});

test("Modifier symbol but no integer", () => {
	expect(rollCommand.idParams(["-"])).toEqual([20, 1, NaN]);
});

test("Two Space separated modifier", () => {
	expect(rollCommand.idParams(["+", "7", "-" , "3"])).toEqual([20, 1, NaN]);
});

test("Quantity and dice type", () => {
	expect(rollCommand.idParams(["9", "d5"])).toEqual([5, 9, 0]);
});

test("Quantity and dice type (capitalised)", () => {
	expect(rollCommand.idParams(["9", "D5"])).toEqual([5, 9, 0]);
});

test("Quantity and modifier (+ve)", () => {
	expect(rollCommand.idParams(["6", "+7"])).toEqual([20, 6, 7]);
});

test("Quantity and modifier (-ve)", () => {
	expect(rollCommand.idParams(["6", "-7"])).toEqual([20, 6, -7]);
});

test("Dice type and modifier (+ve)", () => {
	expect(rollCommand.idParams(["d6", "+7"])).toEqual([6, 1, +7]);
});

test("Dice type and modifier (-ve)", () => {
	expect(rollCommand.idParams(["d6", "-7"])).toEqual([6, 1, -7]);
});

test("Quantity, dice type and modifier", () => {
	expect(rollCommand.idParams(["4", "d6", "-7"])).toEqual([6, 4, -7]);
});

test("Random nonsense params 0", () => {
	expect(rollCommand.idParams(["abc", "$ff", "d6"])).toEqual([6, NaN, 0]);
});
//*********End idParams() tests ***************************