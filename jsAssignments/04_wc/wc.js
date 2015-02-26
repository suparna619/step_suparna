var wcM = require("./wcConnecterMain_Lib.js").module; //change the name wcM
var runWC = require("./programRun.js").run;

var arguments = process.argv.splice(2);

var seperatedArgumentObject = wcM.seperateArguments(arguments);

var result = runWC.runProgram(seperatedArgumentObject);
console.log(result);