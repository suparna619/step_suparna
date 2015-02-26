var headM = require("./headConnectorMain_Lib.js").module;
var runHead = require("./programRun.js").run;

var arguments = process.argv.splice(2);

var seperatedArgumentObject = headM.seperateArguments(arguments);
//console.log(seperatedArgumentObject);

var result = runHead.runProgram(seperatedArgumentObject);
console.log(result);
