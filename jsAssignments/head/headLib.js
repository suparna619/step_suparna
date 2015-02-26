var fs = require("fs");
var lib = {};
exports.lib = lib;

lib.countByte = function(data,size) {
	var result = "";
	for(var i=0; i<size; i++) {
		result += data[i];
	}
	return result;
};


lib.countLines = function(text) {
	return text.split("\r\n").length-1;
};
lib.countLine = function(data,numberOfLines) {
	var countLinesOfData = lib.countLines(data);
	if(countLinesOfData<10)
		return data;
	else {
		var splitText = data.split("\r\n");
		splitText.length = numberOfLines;
		return splitText.join("\r\n");
	}
};

lib.quiet = function(fileArray) {
	var filesData = [];
	fileArray.forEach(function(elementFile) {
		filesData.push(fs.readFileSync(elementFile,"utf8"));
	});
	return filesData.join("\r\n");
};

lib.verbose = function(file) {
	var string = "==> _FILE_ <==";
	var result = string.replace(/_FILE_/,file);
	return result+"\r\n"+lib.countLine(fs.readFileSync(file,"utf8"),10);
};