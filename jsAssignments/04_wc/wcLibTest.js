var lib = require("./wcLib.js").lib;
var assert = require("assert");
var test = {};
exports.test = test;


test["countByte gives 10 for 'count byte'"] = function() {
	assert.deepEqual(lib.countByte("count byte"),10);
};

test["countByte gives 25 for the given text"] = function() {
	var text = "my\r\nlongest line\r\nis this";
	assert.deepEqual(lib.countByte(text),25);
};

test["countWords gives 2 for count byte"] = function() {
	assert.deepEqual(lib.countWords("count words"),2);
};

test["countWords gives 5 for the given text"] = function() {
	var text = "my\r\nlongest line\r\nis this";
	assert.deepEqual(lib.countWords(text),5);
};

test["countLines gives 0 for the given text"] = function() {
	var text = "count line";
	assert.deepEqual(lib.countLines(text),0);
};

test["countLines gives 2 for the given text"] = function() {
	var text = "my\r\nlongest line\r\nis this";
	assert.deepEqual(lib.countLines(text),2);
};

test["find longest length of the given text as 20"] = function() {
	var text = "count longest length";
	assert.deepEqual(lib.findLongestLineLength(text),20);
};

test["find longest length of the given text as 12"] = function() {
	var text = "my\r\nlongest line\r\nis this";
	assert.deepEqual(lib.findLongestLineLength(text),12);
};

test["find longest length of the given text as 6"] = function() {
	var text = "hellow\r\nworld\r\n!!!";
	assert.deepEqual(lib.findLongestLineLength(text),6);
};

test["help gives the properties of wc"] = function() {
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
	var help = helpDesk.join("\n")+"\n\n"+"Report bugs to <bug-textutils@gnu.org>."+"\n";
	assert.deepEqual(lib.help(),help);
};

test["version gives the output as the version of wc"] = function() {
	var versionOutput = "\n\n"+"* * * * * * * * * * * * * WC - VERSION 0.0.1 * * * * * * * * * * * * *"+"\n\n";
	assert.deepEqual(lib.version(),versionOutput);
}