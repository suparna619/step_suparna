var fs = require("fs");
var assert = require("assert");
var wcM = require("./wcConnecterMain_Lib.js").module;
var test = {};
exports.test = test;

test["isFileExists gives true for ./wcConnecterMain_LibTest.js/"] = function() {
	assert.deepEqual(true,wcM.isFileExists("wcConnecterMain_LibTest.js"));
};

test["isFileExists gives true for \'wcConnecterMain_LibTest.js\'"] = function() {
	assert.deepEqual(true,wcM.isFileExists("wcConnecterMain_LibTest.js"));
};

test["isFileExists gives false for ./myJS.js/"] = function() {
	assert.deepEqual(false,wcM.isFileExists("myJS.js"));
};

test["isFileExists gives false for \'myJS.js\'"] = function() {
	assert.deepEqual(false,wcM.isFileExists("myJS.js"));
};

test["optionsRange array contains [-c, --bytes, --chars, -l, --lines, -w, --words -L, --max-line-length, --help, --version]"] = function() {
	assert.deepEqual(["-c","--bytes","--chars","-l","--lines","-w","--words","-L","--max-line-length","--help","--version"],wcM.optionsRange);
};

test["wc returns [-l, -w, -c] as a default option"] = function() {
	assert.deepEqual(["-l", "-w", "-c"],wcM.defaultOption);
};

test["countOptions returns the number of options"] = function() {
	assert.equal(wcM.countOptions(["-w", "-L", "--bytes"]),3);
};

test["--chars is a alias of -c"] = function() {
	assert.ok(wcM.checkForAlias("--chars","-c"));
};

test["--bytes is a alias of -c"] = function() {
	assert.ok(wcM.checkForAlias("--bytes","-c"));
};

test["-c is a alias of -c"] = function() {
	assert.ok(wcM.checkForAlias("-c","-c"));
};

test["--bytes is not a alias of -w"] = function() {
	assert.ok(!wcM.checkForAlias("--bytes","-w"));
};

test["--words is a alias of -w"] = function() {
	assert.ok(wcM.checkForAlias("--words","-w"));
};

test["-w is a alias of -w"] = function() {
	assert.ok(wcM.checkForAlias("-w","-w"));
};

test["--max-length-line is not a alias of -w"] = function() {
	assert.ok(!wcM.checkForAlias("--max-length-line","-w"));
};

test["-L is not a alias of -w"] = function() {
	assert.ok(!wcM.checkForAlias("-L","-w"));
};

test["--max-line-length is a alias of -L"] = function() {
	assert.ok(wcM.checkForAlias("--max-line-length","-L"));
};

test["-w is not a alias of -L"] = function() {
	assert.ok(!wcM.checkForAlias("-w","-L"));
};

test["-w is not a alias of --bytes"] = function() {
	assert.ok(!wcM.checkForAlias("-w","--bytes"));
};

test["startsWithMinus returns true for '-c'"] =function() {
	assert.ok(wcM.startsWithMinus("-c"));
};

test["startsWithMinus returns true for '-v' also"] =function() {
	assert.ok(wcM.startsWithMinus("-v"));
};

test["starting2IsWithMinus returns true for '--chars'"] =function() {
	assert.ok(wcM.starting2IsWithMinus("--chars"));
};

test["starting2IsWithMinus returns true for '--option'"] =function() {
	assert.ok(wcM.starting2IsWithMinus("--option"));
};

test["isOptionValid returns false for '-v'"] =function() {
	assert.ok(!wcM.isOptionValid("-v"));
};

test["isOptionValid returns true for '-c'"] =function() {
	assert.ok(wcM.isOptionValid("-c"));
};

test["isOptionValid returns true for '--chars'"] =function() {
	assert.ok(wcM.isOptionValid("--chars"));
};

test["isOptionValid returns true for '--bytes'"] =function() {
	assert.ok(wcM.isOptionValid("--bytes"));
};

test["isOptionValid returns true for '-l'"] =function() {
	assert.ok(wcM.isOptionValid("-l"));
};

test["isOptionValid returns true for '--lines'"] =function() {
	assert.ok(wcM.isOptionValid("--lines"));
};

test["isOptionValid returns true for '-w'"] =function() {
	assert.ok(wcM.isOptionValid("-w"));
};

test["isOptionValid returns true for '--words'"] =function() {
	assert.ok(wcM.isOptionValid("--words"));
};

test["isOptionValid returns true for '-L'"] =function() {
	assert.ok(wcM.isOptionValid("-L"));
};

test["isOptionValid returns true for '--max-line-length'"] =function() {
	assert.ok(wcM.isOptionValid("--max-line-length"));
};

test["isOptionValid returns true for '--help'"] =function() {
	assert.ok(wcM.isOptionValid("--help"));
};

test["isOptionValid returns true for '--version'"] =function() {
	assert.ok(wcM.isOptionValid("--version"));
};