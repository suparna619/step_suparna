var lib = require("./headLib.js").lib;
var headM = require("./headConnectorMain_Lib.js").module;
var run = {}
exports.run = run;

run.runProgram = function(seperatedArgumentObject) {
	if(seperatedArgumentObject["Argument Error for -c or -n"])
		return seperatedArgumentObject["Argument Error for -c or -n"];
	else if(seperatedArgumentObject["Argument Error for --bytes or --lines"])
		return seperatedArgumentObject["Argument Error for --bytes or --lines"];
	else if(seperatedArgumentObject["File Error"])
		return seperatedArgumentObject["File Error"];
	else if(seperatedArgumentObject["Files"].length>=1 && !seperatedArgumentObject["Options"])
		return run.default(seperatedArgumentObject["Files"]);
	else if(seperatedArgumentObject["Files"].length>=1 && seperatedArgumentObject["Options"].length>=1)
		return run.withOption(seperatedArgumentObject["Files"],seperatedArgumentObject["Options"]).join("\n");
}

run.default =function(fileArray) {
	if(fileArray.length == 1) {
		return lib.countLine(headM.readFile(fileArray[0]),10);
	}
	if(fileArray.length > 1) 
	{
		var result = [];
		fileArray.forEach(function(file) {
			result.push(lib.verbose(file));
		});
		return result.join("\r\n\r\n");
	}
}

run.withOption = function(fileArray,optionArray) {
	var result;
	var optionArrayForByte_Line = [];
	var optionArrayForQuiet_Verbose = [];
	optionArray.forEach(function(option) {
		if(option=="-c"||option=="--bytes"||option=="-n"||option=="--lines")
			optionArrayForByte_Line.push(option);
		if(option=="-q"||option=="--quiet"||option=="--silent"||option=="-v"||option=="--verbose")
			optionArrayForQuiet_Verbose.push(option);
	});
	if()
}