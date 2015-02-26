//VERSION 2 :

// var minesWeeperBoxIds = [[0,0],[0,1][0,2],[0,3],[1,0],[1,1],[1,2],[1,3],[2,0],[2,1],[2,2],[2,3]];
var bombCellIds = [[0,0],[1,0],[2,0],[0,2],[1,2]];
var bombCellIds = {
	'0,0' : 'mine',
	'1,0' : 'mine',
	'2,0' : 'mine',
	'0,2' : 'mine',
	'1,2' : 'mine'
}

var createField = function() {
	var insideDiv = "";
	for(var outerCounter = 0; outerCounter < 8; outerCounter++) {
		for(var innerCounter = 0; innerCounter < 8; innerCounter++) {
			var newId = outerCounter + ',' + innerCounter;
			insideDiv += "<div id = '" + newId +"' class = 'background' value = '" + setValue(newId) + "' onclick = 'showBackgroundValue(id)'></div>"
		}
	}
	document.getElementById('mainfield').innerHTML = insideDiv;
}

var setValue = function (calledId) {
	if(bombCellIds[calledId] != undefined) return bombCellIds[calledId];
};

var showBackgroundValue = function (mainField) {
	var element = document.getElementById(mainField);
	var elementValue = element.getAttribute('value');
	console.log(elementValue == 'undefined')
	element.innerHTML = elementValue;
};

//......................................................HERO-PANTHI
// var htmlElement = function (tagName, attributes) {
// 	this.tagName = tagName;
// 	this.attributes = attributes;
// 	this.children = [];
// };

// htmlElement.prototype = {
// 	asHTML: function () {
// 		var attrib = this.attributes;

// 		var x = Object.keys(attrib).reduce(function (all, atttributes){
// 			all += atttributes + "=\"" + attrib[atttributes] + "\"";
// 			return all;
// 		}, "");

// 		var openingTag = "<" + this.tagName + " " + x + ">";
// 		var closingtag = "<" + this.tagName + ">";
// 		return openingTag + closingtag;
// 	}
// };
//......................................................HERO-PANTHI

var hasBomb = function(id) {
	var bombFind = false;
	bombCellIds.forEach(function(bombid){
		if(id[0] == bombid[0] && id[1] == bombid[1])
			bombFind = true;
	});
	return bombFind;
};

var leftHandSide = function (cellId) {
	return hasBomb([cellId[0], cellId[1]]);
};

var rightHandSide = function (cellId) {
	return hasBomb([cellId[0], cellId[1]]);
};

var chechTwoColumnsOnLeft = function (cellId) {
	var counter = 0;

	for(var counter = 0; counter < 2; counter++){
		hasBomb(cellId[0], cellId[0 + counter]) && counter++;
	}

	return counter;
};

var topLeftCorner = function(id) {
	var indexNumber = minesWeeperBoxIds.indexOf(id);
	var bombCounter = 0;
	rightHandSide(id) && bombCounter++;
	bombCounter += chechTwoColumnsOnLeft(minesWeeperBoxIds[indexNumber + 4]);
	return bombCounter;
};

var topRightCorner = function(id) {
	var countBombForTopRight = 0;
	var x_coordinate = id[0];
	var y_coordinate = id[1];
	if(hasBomb(x_coordinate,y_coordinate-1))
		countBombForTopRight++;
	if(hasBomb(x_coordinate+1,y_coordinate))
		countBombForTopRight++;
	if(hasBomb(x_coordinate-1,y_coordinate-1))
		countBombForTopRight++;
};

var bottomLeftCorner = function(id) {
	var countBombForBottomLeft = 0;
	var x_coordinate = id[0];
	var y_coordinate = id[1];
	if(hasBomb(x_coordinate-1,y_coordinate))
		countBombForBottomLeft++;
	if(hasBomb(x_coordinate-1,y_coordinate+1))
		countBombForBottomLeft++;
	if(hasBomb(x_coordinate+1,y_coordinate+1))
		countBombForBottomLeft++;
};

var bottomRightCorner = function(id) {
	var countBombForTopRight = 0;
	var x_coordinate = id[0];
	var y_coordinate = id[1];
	if(hasBomb(x_coordinate,y_coordinate-1))
		countBombForTopRight++;
	if(hasBomb(x_coordinate-1,y_coordinate))
		countBombForTopRight++;
	if(hasBomb(x_coordinate-1,y_coordinate-1))
		countBombForTopRight++;
};