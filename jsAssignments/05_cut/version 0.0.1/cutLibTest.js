var fs = require("fs");
var lib = require("./cutLib.js").lib;
var assert = require("assert");
var test = {};
exports.test = test;


test["countCharacters gives the 2nd character"] = function() {
	assert.deepEqual(lib.countCharacters("one.txt",2),"e"+"\n"+"h")
}

