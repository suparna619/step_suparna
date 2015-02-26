var fs = require("fs");
var lib = require("./cutLib.js").lib;

var module = {};
exports.module = module;

module.optionsRange = ["-b","--bytes","-c","--characters","-d","--delimiter","-f","--fields",
"-n","-s","--only-delimited","--output-delimiter","--help","--version"];

module.readFile = function(file) {
	return fs.readFileSync(file,"utf8");
};

module.isFileExists = function(filename) {
	try {
		fs.readFileSync(filename);
		return true;
	} catch(error) {
		return false;
	}
};

module.checkExistenceOfFile = function(filename) {
	return (fs.existsSync(filename));
};

module.isOptionValid = function(option) {
	return (module.optionsRange.indexOf(option) >= 0);
};

module.isOptionArgumentValid = function(option,opArg) {
	if(option!="-c" || option!="--characters")
		return true;
	else return (opArg>0 && opArg-Math.floor(opArg)==0);
}


var usersFile = [];
var usersOption = [];
var usersOptionArgument = [];
module.seperateArguments = function(arguments) {
	var seperateArgumentsobject = {};
	for(var i=0; i<arguments.length; i++) {
		if(module.checkExistenceOfFile(arguments[i])) {
			usersFile.push(arguments[i]);
			seperateArgumentsobject["Files"] = usersFile;	
		}
		if(module.isOptionValid(arguments[i])) {
			if(module.isOptionArgumentValid(arguments[i],arguments[i+1])) {
				usersOption.push([arguments[i],arguments[i+1]]);
				seperateArgumentsobject["Option"] = usersOption;				
			}
			else seperateArgumentsobject["Option Argument Error"] = "Option Argument Error";
		}
	}
	return seperateArgumentsobject;
}