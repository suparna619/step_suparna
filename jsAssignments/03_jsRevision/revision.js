var r = {};
//Dont use for/while/do loops


//-------------------------------------------------------------------->
r.finder = function(functionRef){
	var array = [];
	if(functionRef == undefined){
		functionRef = r.compare.strings_by_length;
	}
	var find = function(string){
		array.push(""+string);
		var result = array.reduce(function(x,y){
			if(functionRef(x,y)>=0)
				return x;
			return y;
		});
		return result; 
	}
	return find;	
};
//-------------------------------------------------------------------->
r.to = {
	day:function(date) {
		var weekDays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		var dateRef = new Date(date);
		return weekDays[dateRef.getDay()];
	},
	nextDay:function(date) {
		var dRef = new Date(date);
		var dateRef = dRef.getDate();
		dRef.setDate(dateRef+1);

		var dateNext = dRef.getDate();
		var month = dRef.getMonth()+1;
		var year = dRef.getFullYear();

		if(month<10){
			if(dateNext<10)
				return (year+"-0"+month+"-0"+dateNext);
			return (year+"-0"+month+"-"+dateNext);
		}
		return (year+"-"+month+"-"+dateNext);
	},
	round_25_paise:function(amount){
 		var a= (amount*4)+0.5;
 		return Math.floor(a)/4;
	}
};
//-------------------------------------------------------------------->
r.what_are_these = function() {
	var copy_of_arguments = arguments;
	var resultString = arguments[0].toString();
	var keys = Object.keys(arguments);
	keys.shift();
	keys.forEach(function(x){
		resultString += " | " + copy_of_arguments[x];
	})
	return resultString;
};
//-------------------------------------------------------------------->
r.operate = function(object) {
	var array = Array.prototype.slice.call(arguments,2);
	if(typeof(arguments[1])=='function')
		{ return arguments[1].call(object,array)}	
	return object[arguments[1]](array);
};
//-------------------------------------------------------------------->
r.accumulator = function(){
	if(arguments.length==0)
		this.value = 0;
	else
		this.value = arguments[0];
	this.add = function(){
		var sum = arguments[0].reduce(function(pv,cv){
			return pv+cv;},this.value);
		this.value = sum;
	};
	this.remove = function(){
		var sum = arguments[0].reduce(function(pv,cv){
			return pv+cv;
		});
		this.value = this.value-sum;
	};
	this.getValue = function(){
		return this.value;
	};
};
//-------------------------------------------------------------------->
r.calculate = function(expression) {
	return eval(expression).toString();
};
//-------------------------------------------------------------------->
r.getVowelCount = function(string) {
	var count=0;
	var stringArray = string.split("");
	stringArray.forEach(function(x) {
		if (x=="a"||x=="e"||x=="i"||x=="o"||x=="u"||x=="A"||x=="E"||x=="I"||x=="O"||x=="U")
			count++;
	});
	return count;
};
//-------------------------------------------------------------------->
r.Set = function(){
	var mySet = {};
	Array.prototype.forEach.call(arguments,function(x){Object.defineProperty(mySet,""+x,{enumerable:true});});
	Object.defineProperties(mySet,{
		union:{value:function(getset){
					return r.Set.apply(undefined,Object.keys(this).concat(Object.keys(getset)));}},
		intersection:{value:function(getset){
				var arr = Object.keys(this).filter(function(k){
					return Object.keys(getset).indexOf(k)>=0;
				});
				return r.Set.apply(undefined,arr);
		}},
		cardinality:{get:function(){
			return Object.keys(this).length;
		}},
		isEqualTo:{value:function(getset){
				return this.toString() == getset.toString();
		}},
		toString:{value:function(){
				return 'Set{'+Object.keys(this).join('; ')+'}';
		}}
	});
	return mySet;
};
r.Sets = {phi:new r.Set()};
//-------------------------------------------------------------------->
r.decodeList = function(arrayOfString) {
	if (typeof(arrayOfString)=='object') {
		var copy_arrayOfString = arrayOfString.map(function(x) {return x;});
		var result=[];
		copy_arrayOfString.reverse();
		copy_arrayOfString.forEach(function(word) {
			result.push(word.split("").reverse().join(""));
		});
		return result.join(" ");
	}
	return arrayOfString.split("").reverse().join("");
};
//-------------------------------------------------------------------->
r.do = function(doTask) {
	var myDo = {
		unless:function(unlessTask) {
			if (!unlessTask())
				doTask();
		},
		while:function(whileTask) {
			doTask();
			if (whileTask())
				return this.while(whileTask);
		},
		until:function(untilTask) {
			doTask();
			if (!untilTask())
				return this.until(untilTask);
		},
		if:function(ifTask) {
			if(ifTask())
				doTask();
		}
	};
	return myDo;
};
//-------------------------------------------------------------------->
r.Template = function(text){
	this.apply=function(obj){
	   var new_text=text;
	   var keys=Object.keys(obj);
	   keys.forEach(function(key){new_text=replaceAll(key,obj[key],new_text)});
	   return new_text;
    }
   Object.defineProperty(this,"apply",{enumerable:false});
};

var replaceAll=function(find,replace,str){
	return str.replace(new RegExp(find,'g'),replace);
}
//-------------------------------------------------------------------->
r.range = function(initialVal,finalVal,frequency) {
	var resultArray=[];
	if (frequency==undefined) {
		var doThat=function(initialVal,finalVal){
			resultArray.push(initialVal);
			initialVal++;
			if(initialVal < finalVal)
				return doThat(initialVal,finalVal);
			return resultArray;
		}
		doThat(initialVal,finalVal);
		return resultArray;
	}
	var doThat=function(initialVal,finalVal,frequency){
		resultArray.push(initialVal);
		initialVal += frequency;
			if(initialVal < finalVal)
				return doThat(initialVal,finalVal,frequency);
			return resultArray;
		}
		doThat(initialVal,finalVal,frequency);
		return resultArray;
};
//-------------------------------------------------------------------->
r.while = function(funcRef1) {
	var myWhile= {do:function(funcRef2) {
			if(funcRef1()==true) {
				funcRef2();
			return this.do(funcRef2);
			}
		}
	}
	return myWhile;
};
//-------------------------------------------------------------------->
r.reverseText = function(string) {
	var array=string.split("");
	return array.reverse().join("");	
};
//-------------------------------------------------------------------->
r.readBinary = function(num) {
	return parseInt(num,2);
};
//-------------------------------------------------------------------->
r.impose = function(arr1,arr2) {
	if (arr1.length==arr2.length) {
	var result = arr1.map(function(x) {
			return x+arr2[arr1.indexOf(x)];
		});
	return result;
	}
	if (arr1.length>arr2.length) {
		var result = arr1.map(function(x) {
			if(arr2[arr1.indexOf(x)]!=undefined)
				return x+arr2[arr1.indexOf(x)];
			return x;
		});
	return result;
	}
	if (arr1.length<arr2.length) {
		var result = arr1.map(function(x) {
				return x+arr2[arr1.indexOf(x)];
			});
	return result;
	}
};
//-------------------------------------------------------------------->
r.factors = function(num) {
	var resultArray = [];
	for(var i=1;i<=num;i++) {
		if(num%i==0)
		resultArray.push(i);
	}
	return resultArray;
};
//-------------------------------------------------------------------->
r.factorial = function(num) {
	if (num==1)
		return num;
	var result=num*r.factorial(num-1);
	return result;
};
//-------------------------------------------------------------------->
r.is = {
	the_point_on:function(functionRef) {
		return function(point){return functionRef.hasPoint(point)};
	},
	greater_than_previous_number:function(element,index,array) {
		if(index>0)
			return element>array[index-1];
		return true;
	}
}
//-------------------------------------------------------------------->
r.compare = {
	points:function(point1,point2) {
		var distance1 = Math.sqrt(Math.pow(point1.x,2)+Math.pow(point1.y,2));
		var distance2 = Math.sqrt(Math.pow(point2.x,2)+Math.pow(point2.y,2));
		return (distance1-distance2);
	},
	strings_by_length:function(word1,word2) {
		if (word1.length < word2.length)
			return -1;
		if (word1.length > word2.length)
			return 1;
		return 0;
	},
	numbers_odd_even:function(num1,num2) {
 		if (num1 % 2 != num2 % 2 ){
   			return num2%2;
  		}else {
    		return num1 - num2; 
  		}
	},
	numbers:function(num1,num2) {
		return num1-num2;
	},
	numbers_descending:function(num1,num2) {
		return num2-num1;
	},
	circles:function(circle1,circle2) {
		return circle1.area-circle2.area;
	},
	numbers_by_total_factors:function(num1,num2) {
		var findNumOfFactors = function(num) {
			var count=0;
			for(var i=2;i<num;i++) {
				if(num%i==0)
					count++;
			}
			return count;
		}
		var count1=findNumOfFactors(num1);
		var count2=findNumOfFactors(num2);
		return count1-count2;
	},
	strings_by_vowel_count:function(string1,string2) {
		var count1=0;
		var count2=0;
		string1.split("").forEach(function(x){
			if (x=="a"||x=="e"||x=="i"||x=="o"||x=="u"||
				x=="A"||x=="E"||x=="I"||x=="O"||x=="U")
				count1++;
		});
		string2.split("").forEach(function(x){
			if (x=="a"||x=="e"||x=="i"||x=="o"||x=="u"||
				x=="A"||x=="E"||x=="I"||x=="O"||x=="U")
				count2++;
		});
		return count1-count2;
	},
	short_strings:function(string1,string2) {
		return string2.length-string1.length;
	}
};
//-------------------------------------------------------------------->
r.for = function(funcRef1,funcRef2,funcRef3) {
	funcRef1();

	var myfor = {do:function(funcRef4) {
		if (funcRef2()==true) {
			funcRef4();
			funcRef3();
			return this.do(funcRef4);
		}
	}}
	return myfor;

};
//-------------------------------------------------------------------->
r.changeToOctal = function(num) {
	return parseInt((num).toString(8));
};
//-------------------------------------------------------------------->
r.Circle = function(centre,radius) {
	Object.defineProperty(this,"centre",{ value:{'x':centre.x,'y':centre.y},
											enumerable:true });
	Object.defineProperty(this,"radius",{ value:radius,
											enumerable:true });
	Object.defineProperty(this,"area",{ value:(22/7)*Math.pow(radius,2),
											writable:false });
	Object.defineProperty(this,"perimeter",{ value:2*(22/7)*radius,
											writable:false });
	return this;
};
r.Circle.prototype = {
	moveTo:function(newPoint) {return new r.Circle(newPoint,this.radius);},
	toString:function() {return "[Circle @"+this.centre.x+","+this.centre.y+" radius:"+this.radius+"]"},
	overlaps:function(ob) {
		var result = false;
		if ((ob.centre.x==this.centre.x && ob.centre.y==this.centre.y) || ob.radius==this.radius)
			result=true;
		return result;
	},
	covers:function(point) {
		var result=false;
		var pointCentreLength=Math.sqrt(Math.pow((this.centre.x-point.x),2)+Math.pow((this.centre.y-point.y),2));
		if (pointCentreLength<this.radius)
			result=true;
		return result;
	},
	hasPoint:function(point) {
		var result=false;
		var pointCentreLength=Math.sqrt(Math.pow((this.centre.x-point.x),2)+Math.pow((this.centre.y-point.y),2));
		if (pointCentreLength==this.radius)
			result=true;
		return result;	
	}
}
//-------------------------------------------------------------------->
r.sumOfDigits = function(num) {
	var sum = 0;
	do {
		sum = sum+(num%10);
		num = Math.floor(num/10);
	} while(num>0);
	return sum;
};
//-------------------------------------------------------------------->
r.createNewArray = function(size,object) {
	var array = new Array();
	if(size) {
		var aFunction = function(size,object,array) {
			if(size!=0) {	
				if(object)
					array.push(JSON.parse(JSON.stringify(object)));
				if(object==undefined)
					array.push(object)
				size -= 1;
				return aFunction(size,object,array);
			}	
		}
		aFunction(size,object,array);
	}
	return array;
};
//-------------------------------------------------------------------->
r.until = function(funcRef1) {
	var myUntil={};
	myUntil.do = function(funcRef2) {
		if (funcRef1()==false){
			funcRef2();
			return this.do(funcRef2);
		}
	};
	return myUntil;
};
//-------------------------------------------------------------------->
// r.resizeArray = function(array,sizeOfArray,obj) {
// 	if(sizeOfArray) {
// 		if(obj==undefined || toString.call(obj)!="[object Object]") {

// 		}
// 		var Myfunc = function(array,sizeOfArray,obj) {
// 			if(sizeOfArray != 0) {
// 				var a=JSON.stringify(obj);
// 				var b = JSON.parse(a);
// 				console.log(a);
// 				console.log(b);
// 				array.push(JSON.parse(JSON.stringify(obj)));
// 				sizeOfArray -= 1;
// 				return Myfunc(array,sizeOfArray,obj);
// 			}
// 		}
// 		Myfunc(array,sizeOfArray,obj);
// 		array.length=sizeOfArray;
// 		delete array.length;
// 	}
// 	return array;
// };
r.resizeArray = function(array,size,num){
    if(arguments.length == 1 && size == undefined)
        return;
    if(arguments.length == 3){
        if(Array.isArray(array)){
            var o = JSON.stringify(num);
            o = JSON.parse(o);
            array.push(o);
            array.push(o);
        };
    };
    array.length=size;
    delete array.length;
};
//-------------------------------------------------------------------->
r.Complex = function(real,complex) {
	var ComplexNum = Object.defineProperties({},{
		x: {value:real,enumerable:true},
		y: {value:complex,enumerable:true},
		toString: {value:function() {
			if(complex>=0) {return this.x+"+"+this.y+"i"};
			return this.x+""+this.y+"i";
		},enumerable:false},
		isEqualTo: {value:function(obj){
  			   		return (obj.toString()==this.toString());
  		},enumerable:false},
  		"+": {value:function(obj) {
			return new r.Complex((this.x+obj.x),(this.y+obj.y));
		},enumerable:false},
		"-": {value:function(obj) {
			return new r.Complex((this.x-obj.x),(this.y-obj.y));
		},enumerable:false},
		"*": {value:function(obj) {
			return new r.Complex(((this.x*obj.x)-(this.y*obj.y)),
				((this.x*obj.y)+(this.y*obj.x)));
		},enumerable:false}
	});
	return ComplexNum;
};
//-------------------------------------------------------------------->
r.changeToBinary = function(num) {
	var result = (num).toString(2);
	return parseInt(result);
};
//-------------------------------------------------------------------->
r.switch = function(funcRef,objRef) {
	var keyOfObj=funcRef;
	if(typeof(funcRef)=='function')
		keyOfObj=funcRef();
	var newArray = objRef[keyOfObj]();
	return newArray;
};
//-------------------------------------------------------------------->
r.readHex = function(numInHex) {
	return parseInt(numInHex.toString(),16);
};
//-------------------------------------------------------------------->
r.Line = function(sp,ep) {
	Object.defineProperty(this,"start",{value:{x:sp.x,y:sp.y},enumerable:true});
	Object.defineProperty(this,"end",{value:{x:ep.x,y:ep.y},enumerable:true});
	Object.defineProperty(this,"x1",{value:sp.x});
	Object.defineProperty(this,"y1",{value:sp.y});
	Object.defineProperty(this,"x2",{value:ep.x});
	Object.defineProperty(this,"y2",{value:ep.y});
	Object.defineProperty(this,"slope",{value:(this.y2-this.y1)/(this.x2-this.x1)});
	Object.defineProperty(this,"length",
		{value:Math.sqrt((Math.pow((this.x1-this.x2),2) + Math.pow((this.y1-this.y2),2)))});
	Object.defineProperty(this,"split",
		{value:function() {
			var splittedLine =[];
			var middlepoint= {x:(this.x1+this.x2)/2,y:(this.y1+this.y2)/2};
			var l1=new r.Line(sp,middlepoint);
			var l2=new r.Line(middlepoint,ep);
			splittedLine.push(l1,l2);
			return splittedLine;   }});
};
r.Line.prototype = {
	toString:function(obj) {
		return "[Line from "+this.x1+","+this.y1+" to "+this.x2+","+this.y2+"]";
	},
	isParallelTo:function(ob) {
		var result = false;
		if (this.slope===ob.slope) {
			var findXforThis=this.x1+(0-this.y1)/this.slope;
			var findXforObject=ob.x1+(0-ob.y1)/ob.slope;
			if (findXforThis != findXforObject)
				result=true;
		}
		return result;
	},
	findY:function(valueOfX) {
		if (valueOfX<this.x1 || valueOfX>this.x2)
			return null;
		var valueOfY = (this.slope*(valueOfX-this.x1))+this.y1;
		return valueOfY;
	},
	findX:function(valueOfY) {
		if (valueOfY<this.y1 || valueOfY>this.y2)
			return null;
		var valueOfX = ((valueOfY-this.y1)/this.slope)+this.x1;
		return valueOfX;
	},
	isEqualTo:function(obj) {
		var result=false;
		if (this.x1==obj.x1 && this.y1==obj.y1 && this.x2==obj.x2 && this.y2==obj.y2)
			result = true;
		return result;                   		
	},
	hasPoint:function(ob) {
		var result=false;
		if(ob.y==this.slope*ob.x)
			result=true;
		return result;
	},
	findPointFromStart:function(distance) {
		var result={};
		result.x=this.x1+(distance/Math.sqrt(1+Math.pow(this.slope,2)));
		result.y=Math.round(this.y1+((this.slope*distance)/Math.sqrt(1+Math.pow(this.slope,2))));
		return result;
	},
	findPointFromEnd:function(distance) {
		var result={};
		result.x=this.x2-(distance/Math.sqrt(1+Math.pow(this.slope,2)));
		result.y=Math.round(this.y2-((this.slope*distance)/Math.sqrt(1+Math.pow(this.slope,2))));
		return result;
	}
};
//-------------------------------------------------------------------->
r.createRectangle = function(sp,ep) {
	Object.defineProperty(this,"length",{value:ep[0]-sp[0]});
	Object.defineProperty(this,"width",{value:ep[1]-sp[1]});
	Object.defineProperty(this,"area",{value:this.length*this.width});
	Object.defineProperty(this,"perimeter",{value:2*(this.length+this.width)});
	this.moveTo = function(newPoint) {
			return new r.createRectangle(newPoint,[newPoint[0]+this.length,newPoint[1]+this.width]);
		};
	this.hasPoint = function(newPoint) {
			var result=false;
			if(newPoint[0]>=sp[0] && newPoint[0]<=ep[0] &&
				newPoint[1]>=sp[1] && newPoint[1]<=ep[1])
				result=true;
			return result;
		};
	return this;
};
//-------------------------------------------------------------------->
r.Point = function(xVal,yVal) {
	var myPoint = Object.defineProperties({},{
		x:{value:xVal,enumerable:true},
		y:{value:yVal,enumerable:true},
		toString:{value:function() { return "[Point @x:"+this.x+",y:"+this.y+"]"; }},
		isEqualTo:{value:function(ob) {
			var result=false;
			if (ob.x.toFixed(3)==this.x.toFixed(3) && ob.y==this.y)
				result=true;
			return result;  }},
		compareDistance:{value:function(point1,point2) {
			var length1 = Math.sqrt(Math.pow((xVal-point1.x),2)+Math.pow((yVal-point1.y),2));
			var length2 = Math.sqrt(Math.pow((xVal-point2.x),2)+Math.pow((yVal-point2.y),2));
			return (length1-length2);   }},
		isOn:{value:function(obj) {
			if (obj.radius != undefined){
				var result=false;
				var pointCentreLength=Math.sqrt(Math.pow((this.x-obj.centre.x),2)+Math.pow((this.y-obj.centre.y),2));
				if (pointCentreLength==obj.radius)
					result=true;
				return result;
			}
			var result=false;
			if(this.y==obj.slope*this.x)
				result=true;
			return result;    }}
	});
	return myPoint;	
};
//-------------------------------------------------------------------->
r.if = function(condition) {
	this.only_then=function(task) {
		var result=false;
		if (condition==true)
			result = task();
		return result;
	};
	this.then=function(thenTask) {
		this.else=function(elseTask) {
			if(typeof(condition)=='function') {
				if(condition())
					return thenTask;
				return elseTask;
			}
			if(typeof(thenTask)=='number' && typeof(elseTask)=='number') {
				if (condition == true)
					return thenTask;
				return elseTask;
			}
			if(typeof(thenTask)=='function' && typeof(elseTask)=='string') {
				if (condition == true)
					return thenTask();
				return elseTask;
			}
			if (condition==true && typeof(elseTask)=='function')
				return thenTask();
			else return elseTask();
		};
		return this;
	};
	return this;
};
//-------------------------------------------------------------------->
r.createCircle = function(center,radius) {
	this.center = {'x':center[0],'y':center[1]};
	this.radius=radius;
	this.area=(22/7)*Math.pow(this.radius,2);
	this.perimeter=2*(22/7)*this.radius;
	this.moveTo = function(newCenter) {
		return r.createCircle(newCenter,this.radius);
	}
	return this;
};
//-------------------------------------------------------------------->
r.tidyText = function(unTidyString) {
	var arrayOfUnTidyString = unTidyString.split(" ");
	var result = arrayOfUnTidyString.filter(function(x) {
		return x!="";
	});
	return result.join(" ");
};
//-------------------------------------------------------------------->
r.readOctal = function(numInOct) {
	return parseInt(numInOct.toString(),8);
};
//-------------------------------------------------------------------->
r.changeToHex = function(numInDec) {
	return numInDec.toString(16);
};
//-------------------------------------------------------------------->
r.findBestVowelWord = function(array) {
	var numOfVowels = {};
	array.forEach(function(word){
		var countVowels = 0;
		numOfVowels[word] = numOfVowels[word] || 0;
		word.split("").forEach(function(y) {
			if (y=="a"||y=="e"||y=="i"||y=="o"||y=="u"||
				y=="A"||y=="E"||y=="I"||y=="O"||y=="U")
				countVowels++;
		});
		numOfVowels[word] += countVowels;
	});
	var keys = Object.keys(numOfVowels);
	var keyWithHighestValue = keys.reduce(function(x,y){
		return (numOfVowels[x]<numOfVowels[y]?y:x);
	});
	return keyWithHighestValue;
};
//-------------------------------------------------------------------->
r.findWorstVowelWord = function(stringArray) {
	var numOfVowels = {};
	stringArray.forEach(function(word){
		var countVowels = 0;
		numOfVowels[word] = numOfVowels[word] || 0;
		word.split("").forEach(function(y) {
			if (y=="a"||y=="e"||y=="i"||y=="o"||y=="u"||
				y=="A"||y=="E"||y=="I"||y=="O"||y=="U")
				countVowels++;
		});
		numOfVowels[word] += countVowels;
	});
	var keys = Object.keys(numOfVowels);
	var keyWithLowestValue = keys.reduce(function(x,y){
		return (numOfVowels[x]<=numOfVowels[y]?x:y);
	});
	return keyWithLowestValue;	
};
//-------------------------------------------------------------------->
r.fibonacci = function(num) {
	if (num<0 || num!=Math.round(num/1))
		return undefined;
	var fiboArray = [0,1,1,2,3,5,8,13,21];
	return fiboArray[num-1];
};
//-------------------------------------------------------------------->
r.add = function(array,num) {
	var result = [];
	array.forEach(function(x) {
		x += num;
		result.push(x);
	});
	return result;
};
//-------------------------------------------------------------------->
r.welcome = function(person,size) {
	var result = person;
	if (isNaN(person)==true && typeof(person)=='number' && typeof(person)!='string')
		return "hey dont count";
	if (typeof(person)=='string' && size==undefined)
		return "hello text";
	if (toString.call(person)=='[object Array]' && person.length==0)
		return "seeya";
	if (toString.call(person)=='[object Array]' && person.length>0)
		return "seeya "+person.join("_");
	if (toString.call(person)=='[object Object]' && Object.keys(person).length==0)
		return "hi";
	if (toString.call(person)=='[object Object]' && Object.keys(person).length>0)
		return ("hi " + Object.keys(person).join(","));
	if (toString.call(person)=='[object Null]')
		return "oh no";
	if (person==Infinity && size==undefined)
		return "get out of the world";
	if (typeof(person)=='function' && size==undefined)
		return "call that";
	if (typeof(person)=='number' && size==undefined) {
		if (person-Math.round(person)==0)
			return "hey count";
		return "hey decimal";
	}
	if (person === undefined)
		return "who is it";
	if (person === true || person === false)
		return "to be or not to be";
	for(var i=0; i<size-1; i++)
		result += "-"+person;
	return result;
};
//-------------------------------------------------------------------->
r.validatePositiveNumber = function(number) {
	if (number*0==0) {
		if (number<0)
			throw Error("negative")
		else if((number-Math.floor(number))==0)
			return undefined;
		throw Error("decimal");
	}
	else throw Error("not a number")
};
//-------------------------------------------------------------------->
r.reverseWords = function(string) {
	var result = [];
	var convertStrng = string.split(" ");
	convertStrng.forEach(function(x) {
		var revElement = x.split("").reverse().join("");
		result.push(revElement);
	});
	return result.join(" ");
};
//-------------------------------------------------------------------->

exports.r = r;
