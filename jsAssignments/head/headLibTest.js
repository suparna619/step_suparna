var assert = require("assert");
var lib = require("./headLib.js").lib;

var test = {};
exports.test = test;

test["countByte count particular size length"] = function() {
	var text = "Testing count byte from headLib.js";
	assert.equal(lib.countByte(text,10),"Testing co");
};

test["countLine"] = function() {
	var text = "my\r\nlongest line\r\nis this";
	assert.equal(lib.countLine(text,1),"my");
};

test["quiet"] = function() {
	var result = "hello, this is a good day.\r\nWhat do you think?\r\n\r\nhellow\r\nworld\r\n!!!";
	assert.equal(lib.quiet(["one.txt","two.txt"]),result);
};

test["verbose"] = function() {
	var result = "==> one.txt <==\r\nhello, this is a good day.\r\nWhat do you think?\r\n"
	assert.equal(lib.verbose("one.txt"),result);
}