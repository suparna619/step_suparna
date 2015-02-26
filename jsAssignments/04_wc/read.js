var fs = require("fs");
// var data = fs.readFileSync("two.txt",'utf8');
// console.log(data.split("").length);

// process.stdin.on('keypress', function (ch, key) {
// 	console.log("maa aschen")
//  console.log('got "keypress"', key);
//  if (key && key.ctrl && key.name== 'd') {
//    process.stdin.pause();
//  }
// });


// var data1 = fs.readFileSync(process.argv[2],"utf8");
// var data2 = fs.readFileSync(process.argv[3],"utf8");
//console.log(fs.readFileSync(data1,"utf8"));
// console.log(fs.readFileSync(data2,"utf8"));
// console.log(data1);
//console.log(data1.split("").length);



// var array = [1,2,3,4,5,6,7,8,9];
// array.splice(2).forEach(function (data) {
// 	console.log(data)
// });


// var number_of_words = function(line){
// 	var words = line.split(' ');
// 	return words.filter(function(word){
// 		return word != '';
// 	}).length;
// };

// var countWords = function(text){
// 	var lines = text.split('\n');
// 	console.log(lines);
// 	var word_count_in_each_line = lines.map(number_of_words);
// 	return word_count_in_each_line.reduce(function(sum,count){
// 		return sum + count;
// 	});
// };

// console.log(countWords(data));







var item = "--t"
console.log(item.indexOf("--")==0)
