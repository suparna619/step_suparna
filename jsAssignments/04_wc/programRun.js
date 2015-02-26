var lib = require("./wcLib.js").lib;
var wcM = require("./wcConnecterMain_Lib.js").module;
var run = {}
exports.run = run;

run.runProgram = function(seperatedArgumentObject) {
	if(seperatedArgumentObject["Invalid Option Error"])
		return seperatedArgumentObject["Invalid Option Error"];
	else if(seperatedArgumentObject["Unrecognizes Option Error"])
		return seperatedArgumentObject["Unrecognizes Option Error"];
	else if(seperatedArgumentObject["File Error"])
		return seperatedArgumentObject["File Error"];
	else if (!seperatedArgumentObject["Files"] && seperatedArgumentObject["Options"].length>=1)
		return run.onlyOption(seperatedArgumentObject["Options"]);
	else if(seperatedArgumentObject["Files"].length>=1 && !seperatedArgumentObject["Options"])
		return run.default(seperatedArgumentObject["Files"]).join("\n");
	else if(seperatedArgumentObject["Files"].length>=1 && seperatedArgumentObject["Options"].length>=1)
		return run.withOption(seperatedArgumentObject["Files"],seperatedArgumentObject["Options"]).join("\n");

}

run.default = function(fileArray) {
	var result = [];
	if(fileArray.length==1) {
		var data = wcM.readFile(fileArray[0]);
		result.push("\t"+lib.countLines(data)+"\t"+lib.countWords(data)+
			"\t"+lib.countByte(data)+" "+fileArray[0]);
	}
	if(fileArray.length>1) {
		var count_lines = 0;
		var count_words = 0;
		var count_byte = 0;

		fileArray.forEach(function(file) {
		var data = wcM.readFile(file);
		count_lines += lib.countLines(data);
		count_words += lib.countWords(data);
		count_byte += lib.countByte(data);
		result.push("\t"+lib.countLines(data)+"\t"+lib.countWords(data)+
			"\t"+lib.countByte(data)+" "+file);
	});	
	result.push("\t"+count_lines+"\t"+count_words+"\t"+count_byte+" "+"total");
	}
	return result;
}

run.onlyOption = function(optionArray) {
	if(optionArray.length==1) {
		if (optionArray[0]=="--help")
			return lib.help();
		else return lib.version();
	}
	else return (optionArray.indexOf("--help")<optionArray.indexOf("--version"))? lib.help() : lib.version()
}

run.withOption = function(fileArray,optionArray) {
	var result = [];
	
	if(fileArray.length==1 && optionArray.length==1) {
		var data = wcM.readFile(fileArray[0]);
		result.push("\t"+wcM.callDesiredOption(data,optionArray[0])+" "+fileArray[0]);
	}

	if(fileArray.length>1 && optionArray.length==1) {
		if (optionArray[0]=="-L" || optionArray[0]=="--max-line-length") {
			var maxLineLength = 0;
			fileArray.forEach(function(file) {
				var data = wcM.readFile(file);
				var length = wcM.callDesiredOption(data,optionArray[0])
				maxLineLength = maxLineLength>length ? maxLineLength : length;
				result.push("\t"+wcM.callDesiredOption(data,optionArray[0])+" "+file);
			});
			result.push("\t"+maxLineLength+" total");
		}
		else {	
			var countForRequiredOption = 0;
			fileArray.forEach(function(file) {
				var data = wcM.readFile(file);
				countForRequiredOption += wcM.callDesiredOption(data,optionArray[0]);
				result.push("\t"+wcM.callDesiredOption(data,optionArray[0])+" "+file);
			});
			result.push("\t"+countForRequiredOption+" total");
		}
	}

	if(fileArray.length==1 && optionArray.length>1) {
		var data = wcM.readFile(fileArray[0]);
		var tempResult = [];
		optionArray.forEach(function(option) {
			tempResult.push(wcM.callDesiredOption(data,option))
		});
		result.push("\t"+tempResult.join("\t")+" "+fileArray[0]);
	}

	if(fileArray.length>1 && optionArray.length>1) {
		var total = {};
		optionArray.forEach(function(option) {
			total[option] = 0;
		});
		fileArray.forEach(function(file) {
			var data = wcM.readFile(file);
			var tempResult = [];
			optionArray.forEach(function(option) {
				tempResult.push(wcM.callDesiredOption(data,option));
				total[option] += wcM.callDesiredOption(data,option)
			});
			result.push("\t"+tempResult.join("\t")+" "+file);
		});
		var totalAsString = "";
		optionArray.forEach(function(option) {
			totalAsString += ("\t"+total[option]);
		});
		result.push(totalAsString+" total");
	}

	return result;
}