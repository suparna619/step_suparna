var fs = require("fs");
var lib = require("./wcLib.js").lib;

var module = {};
exports.module = module;


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

module.countOptions = function(optionArray) {
	return optionArray.length;
};

module.optionsRange = ["-c","--bytes","--chars","-l","--lines","-w","--words","-L","--max-line-length","--help","--version"];
module.defaultOption = ["-l", "-w", "-c"];
module.aliases = {
	"-c":"-c","--chars":"-c","--bytes":"-c",
	"-w":"-w","--words":"-w",
	"-l":"-l","--lines":"-l",
	"-L":"-L","--max-line-length":"-L",
	"--help":"--help",
	"--version":"--version"
};
module.checkForAlias = function(alias_option,original_option) {
	return (module.aliases[alias_option] == original_option);
};

module.startsWithMinus = function(item){
	return item.indexOf('-')==0;
};

module.starting2IsWithMinus = function(item){
	return (item.indexOf('--')==0);
};

module.checkExistenceOfFile = function(filename) {
	return (fs.existsSync(filename));
};

module.isOptionValid = function(option) {
	return (module.optionsRange.indexOf(option) >= 0);
};

module.callDesiredOption = function(text,option){
	switch (option) {
		case "-l" : return lib.countLines(text);
		case "--lines" : return	lib.countLines(text);
		case "-w" : return	lib.countWords(text);
		case "--words" : return	lib.countWords(text);
		case "-c" : return lib.countByte(text);
		case "--chars" : return lib.countByte(text);
		case "--bytes": return lib.countByte(text);
		case "-L" : return lib.findLongestLineLength(text);
		case "--max-line-length" : return lib.findLongestLineLength(text);
		case "--help" : return lib.help();
		case "--version" : return lib.version();
	};
};

var usersFile = [];
var usersOption = [];
var ERROR_TEMPLATE = "wc: _FILE_: No such file or directory";
var ERROR_HELPLINE = "Try `wc --help' for more information.";
module.seperateArguments = function(arguments) {
	var seperateArgumentsobject = {};
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
		if(module.startsWithMinus(parameter) && !module.isOptionValid(parameter)) {
			if (module.starting2IsWithMinus(parameter))
				seperateArgumentsobject["Unrecognizes Option Error"] = "wc: unrecognized option `"+parameter+"'"+"\n"+ERROR_HELPLINE;
			else seperateArgumentsobject["Invalid Option Error"] = "wc: invalid option -- "+parameter[1]+"\n"+ERROR_HELPLINE;
		}
	});
	return seperateArgumentsobject;
}

module.isOptionArrayContainsHELP = function(optionArray) {
	var result = false;
	optionArray.forEach(function(option) {
		if (option == "--help")
			result = true;
	});
	return result;
}

module.isOptionArrayContainsVERSION = function(optionArray) {
	var result = false;
	optionArray.forEach(function(option) {
		if (option == "--version")
			result = true;
	});
	return result;
}