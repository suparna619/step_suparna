alert("STEP1");
var name = "krati";

var changeColor = function() {
	var colors = ["red","green","blue","cyan","peach","gray","purple"]
	var changer = document.getElementById("colorChanger");
	var index = Math.floor(Math.random()*colors.length+1);
	changer.style.color=colors[index];
}