var lib = require("./cutLib.js").lib;
var cutModule = require("./connectorOfMainLib.js").module;

var run = {}
exports.run = run;

callDesiredOption = function(file,option,optionArg){
	switch (option) {
		case "-c" : return lib.countCharacters(file,optionArg);
		case "--characters" : return lib.countCharacters(file,optionArg);
		case "-f" : return lib.field(file,optionArg);
		case "--fields" : return lib.field(file,optionArg);
	};
};

run.runProgram = function(seperatedArgument) {
	if(seperatedArgument["Option Argument Error"])
		return seperatedArgument["Option Argument Error"];
	if(seperatedArgument["Option"].length==1) {
		if ((seperatedArgument["Option"][0][0]=="-c" || seperatedArgument["Option"][0][0]=="--characters"))
			return callDesiredOption(seperatedArgument["Files"][0],seperatedArgument["Option"][0][0],seperatedArgument["Option"][0][1]);

	if ((seperatedArgument["Option"][0][0]=="-f" || seperatedArgument["Option"][0][0]=="--fields"))
			return callDesiredOption(seperatedArgument["Files"][0],seperatedArgument["Option"][0][0],seperatedArgument["Option"][0][1]);

	if ((seperatedArgument["Option"][0][0]=="-d" || seperatedArgument["Option"][0][0]=="--delimiter"))
			return "field is missing";	
	}
	if(seperatedArgument["Option"].length > 1) {
		if((seperatedArgument["Option"][0][0]=="-d" || seperatedArgument["Option"][0][0]=="--delimiter")
			&& (seperatedArgument["Option"][1][0]=="-f" || seperatedArgument["Option"][1][0]=="--fields"))
			return lib.delimiter(seperatedArgument["Files"][0],seperatedArgument["Option"][0],seperatedArgument["Option"][1]);

		if((seperatedArgument["Option"][0][0]=="-f" || seperatedArgument["Option"][0][0]=="--fields")
			&& (seperatedArgument["Option"][1][0]=="-d" || seperatedArgument["Option"][1][0]=="--delimiter"))
			return lib.delimiter(seperatedArgument["Files"][0],seperatedArgument["Option"][1],seperatedArgument["Option"][0]);
	}
}

