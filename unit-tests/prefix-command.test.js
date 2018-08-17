const prefixCommand = require("../commands/prefix");

test("No parameters", () => {
	expect(prefixCommand({author: {id: 1}, guild: {owner: {id: 1}}}, ["!prefix"])).toBe("Please include a valid prefix with the command.");
});

test("Invalid parameters", () => {
	expect(prefixCommand({author: {id: 1}, guild: {owner: {id: 1}}}, ["!prefix", "asdfg23578"])).toBe("Please include a valid prefix with the command.");
});

test("Restrictions argument", () => {
	expect(prefixCommand({author: {id: 1}, guild: {owner: {id: 1}}}, ["!prefix", "restrictions"])).toBe("Prefixes can only be changed by server owners. " +
						"Please limit your prefix to any non-alphanumeric character. Eg. !, /, %");
});

test("Author not server owner", () => {
	expect(prefixCommand({author: {id: 2}, guild: {owner: {id: 1}}}, ["!prefix", "asdfg23578"])).toBe("Only the server owner can change the prefix.");
});

test("Reset argument", () => {
	expect(prefixCommand({author: {id: 1}, guild: {owner: {id: 1}}}, ["!prefix", "reset"])).toBe("Prefix reset to !");
});

test("Valid prefix", () => {
	expect(prefixCommand({author: {id: 1}, guild: {owner: {id: 1}}}, ["!prefix", "?"])).toBe("Prefix changed to ?");
});

test("Multiple valid prefixes", () => {
	expect(prefixCommand({author: {id: 1}, guild: {owner: {id: 1}}}, ["!prefix", "?~"])).toBe("Please include a valid prefix with the command.");
});