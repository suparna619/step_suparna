var fs = require("fs");
var cutModule = require("./connectorOfMainLib.js").module;
var runCut = require("./programRun.js").run;

//console.log(process.argv[4])

var arguments = process.argv.slice(2);


var seperatedArgument = cutModule.seperateArguments(arguments);
//console.log(seperatedArgument);
//console.log("\n\n\n");

var result = runCut.runProgram(seperatedArgument);
console.log(result);