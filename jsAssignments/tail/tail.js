var tailM = require("./tailConnectorMain_Lib.js").module;
var runTail = require("./programRun.js").run;

var arguments = process.argv.splice(2);

var seperatedArgumentObject = tailM.seperateArguments(arguments);

var result = runTail.runProgram(seperatedArgumentObject);
console.log(result);