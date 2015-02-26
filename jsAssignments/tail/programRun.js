var lib = require("./tailLib.js").lib;
var tailM = require("./tailConnectorMain_Lib.js").module;
var run = {}
exports.run = run;

run.runProgram = function(seperatedArgumentObject) {
	if(seperatedArgumentObject["Argument Error for -c or -n"])
		return seperatedArgumentObject["Argument Error for -c or -n"];
	if(seperatedArgumentObject["Argument Error for --bytes or --lines"])
		return seperatedArgumentObject["Argument Error for --bytes or --lines"];
	if(seperatedArgumentObject["File Error"])
		return seperatedArgumentObject["File Error"];
}