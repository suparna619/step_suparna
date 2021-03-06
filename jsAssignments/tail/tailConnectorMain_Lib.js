var fs = require("fs");
var lib = require("./tailLib.js").lib;

var module = {};
exports.module = module;

module.startsWithMinus = function(item){
	return item.indexOf('-')==0;
};

module.starting2IsWithMinus = function(item){
	return (item.indexOf('--')==0);
};

module.checkExistenceOfFile = function(filename) {
	return (fs.existsSync(filename));
};

module.optionsRange = ["-c","--bytes","-n","--lines","-q","--quiet","-v","--verbose","--help","--version"];
module.isOptionValid = function(option) {
	return (module.optionsRange.indexOf(option) >= 0);
};

module.specialOption = function(option) {
	var isSpecialOption = false;
	var specialOptionRange = ["-c","--bytes","-n","--lines"];
	specialOptionRange.forEach(function(element) {
		if (option==element)
			isSpecialOption = true;
	});
	return isSpecialOption;
}

var usersFile = [];
var usersOption = [];
var ERROR_TEMPLATE = "tail: _FILE_: No such file or directory";
var ERROR_HELPLINE = "Try `tail --help' for more information.";
var ERROR_ARGUMENT_C_N = "tail: option requires an argument -- _OPTION[1]_";
var ERROR_ARGUMENT_BYTES_LINES = "tail: option `_OPTION_' requires an argument";
module.seperateArguments = function(arguments) {
	var seperateArgumentsobject = {};
	var lastElement = arguments[arguments.length-1];
	if(module.specialOption(lastElement)) {
		if(module.startsWithMinus(lastElement) && !module.starting2IsWithMinus(lastElement))
			seperateArgumentsobject["Argument Error for -c or -n"] = "tail: option requires an argument -- "+lastElement[1]+"\n"+ERROR_HELPLINE;
		if(module.starting2IsWithMinus(lastElement))
			seperateArgumentsobject["Argument Error for --bytes or --lines"] = ERROR_ARGUMENT_BYTES_LINES.replace(/_OPTION_/,lastElement)+"\n"+ERROR_HELPLINE;
	}
	else {
			arguments.forEach(function (parameter) {
				if(module.checkExistenceOfFile(parameter)) {
					usersFile.push(parameter);
					seperateArgumentsobject["Files"] = usersFile;
				}
				if(module.isOptionValid(parameter)) {
					usersOption.push(parameter);
					seperateArgumentsobject["Options"] = usersOption;
				}
				if(!module.checkExistenceOfFile(parameter) && !module.startsWithMinus(parameter) && !module.isOptionValid(parameter)) {
					seperateArgumentsobject["File Error"] = (ERROR_TEMPLATE.replace(/_FILE_/,parameter));
				}
		});
		}
	return seperateArgumentsobject;
}