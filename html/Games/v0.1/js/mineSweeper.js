var markedId = [];
var bombId = ['1', '3', '5', '7', '9'];

var showTheNumberOfBombs = function(id) {
	var element = document.getElementById(id);
	
	if(markedId.indexOf(id) >= 0){
		markedId.splice(markedId.indexOf(id), 1);
	}

	if(element.value == 'mine'){
		alert('Game Over');
		location.reload();
	}

	element.innerHTML = element.value;
};

var markTheField = function (id) {
	var element = document.getElementById(id);

	if(event.which == 3 && markedId.length == 5){
		alert('Maximum marking done');
		return;
	}
	
	if (event.which == 3) {
			markedId.push(id);
    		element.innerHTML = 'marked';
    }

    if(isAllMarked()){
    	alert('You Won');
    	location.reload();
    }
};

var isAllMarked = function () {
	var condition = true;
	bombId.forEach (function (id, index){
		if(markedId.indexOf(id) < 0)
			condition = false;
	});

	return condition;
}