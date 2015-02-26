var lib = {};
exports.lib = lib;

lib.countByte = function(text) { //countBytes
	return text.length;
};


var isNotEmpty = function(x){return x!=''}; //x->element
lib.countWords = function(text){
	return text.split(/\s+/).filter(isNotEmpty).length;
};


lib.countLines = function(text) {
	return text.split("\r\n").length-1;
};


lib.findLongestLineLength = function(text) {
	var lines = text.split('\r\n');
	return lines.reduce(function(bestLength,line){ //extract function outside
		return (line.length > bestLength)? line.length : bestLength;
	},0);
};


lib.help = function() { //change something with helpdesk
	var helpDesk = ["Usage: wc [OPTION]... [FILE]...",
		"Print line, word, and byte counts for each FILE, and a total line if",
		"more than one FILE is specified.  With no FILE, or when FILE is -,",
		"read standard input.",
		"  -c, --bytes, --chars   print the byte counts",
		"  -l, --lines            print the newline counts",
		"  -L, --max-line-length  print the length of the longest line",
		"  -w, --words            print the word counts",
		"      --help             display this help and exit",
		"      --version          output version information and exit"];
	return (helpDesk.join("\n")+"\n\n"+"Report bugs to <bug-textutils@gnu.org>."+"\n");
}


lib.version = function() {
	return "\n\n"+"* * * * * * * * * * * * * WC - VERSION 0.0.1 * * * * * * * * * * * * *"+"\n\n";
}