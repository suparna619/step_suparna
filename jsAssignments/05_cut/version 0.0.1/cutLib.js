var fs = require("fs");
var lib = {};
exports.lib = lib;


removeExtraNewLine = function(data) {
	var splitData = data.split("\r\n");
	if(splitData[splitData.length-1] == "")
		splitData.length = splitData.length-1;
	return splitData.join("\r\n");
}
lib.countCharacters = function(file,opArg) {
	var data = fs.readFileSync(file,"utf8");
	data = removeExtraNewLine(data);
	var splitData = data.split("\r\n");
	var result = [];
	splitData.forEach(function(line) {
		result.push(line[opArg-1]);
	});
	return result.join("\n");
}

lib.delimiter = function(file,delimiterArray,fieldArray) {
	var data = fs.readFileSync(file,"utf8");
	data = removeExtraNewLine(data);
	var splitData = data.split("\r\n");
	var result = [];
	splitData.forEach(function(line) {
		var splitedLine = line.split("");
		if(splitedLine.indexOf(delimiterArray[1]) == -1)
			result.push(line);
		else result.push(line.split(delimiterArray[1])[fieldArray[1]-1]);
	});
	return result.join("\n");
}

lib.field = function(file,opArg) {
	var data = fs.readFileSync(file,"utf8");
	data = removeExtraNewLine(data);
	var splitData = data.split("\r\n");
	var result = [];
	splitData.forEach(function(line) {
		result.push(line.split("\t").length==1 ? line : line.split("\t")[opArg-1]);
	});
	return result.join("\n");
}