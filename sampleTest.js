var assert = require("assert");
var test = {};

var person1 = {name:"Krishna",
				gender:"M",
				isFrom:{city:"Dwaraka",population_of_city:100000,stateDetail:{name:"Gujrat",capital:"Gandhinagar",population:40000000}},
				likes:["Milk"],
				loves:["Sweets"],
				do_not_like:["Bad Uncles"],
				hasCousins:105,
				hasChildren:0,
				hasBrother:0,
				hasSister:0,
				relation:"Brother of Durga",
				proffession:"Charioteor",
				hates:[],
				can:""
			};

var person2 = {name:"Arjun",
				gender:"M",
				isFrom:{city:"Dwaraka",population_of_city:100000,stateDetail:{name:"Gujrat",capital:"Gandhinagar",population:40000000}},
				likes:["Milk"],
				loves:["Archery"],
				do_not_like:[],
				hasCousins:1,
				hasChildren:2,
				hasBrother:0,
				hasSister:0,
				relation:"Cousin of Krishna",
				proffession:"Warrior",
				hates:["Shah Rukh Khan movies"],
				can:""
			};


var person3 = {name:"Karan",
				gender:"M",
				isFrom:{city:"Kolkata",population_of_city:15000000,stateDetail:{name:"West Bengal",capital:"Kolkata",population:70000000}},
				likes:["Charity"],
				loves:["Sweets"],
				do_not_like:[],
				hasCousins:0,
				hasChildren:0,
				hasBrother:5,
				hasSister:0,
				relation:"",
				proffession:"Warrior",
				hates:["Dishonesty"],
				can:"Fly planes"
			};

var person4 = {name:"Sudhama",
				gender:"M",
				isFrom:{city:"Bangalore",population_of_city:10000000,stateDetail:{name:"Karnataka",capital:"Bangalore",population:100000000}},
				likes:["Rice"],
				loves:["Sweets","Rain"],
				do_not_like:[],
				hasCousins:0,
				hasChildren:0,
				hasBrother:0,
				hasSister:1,
				relation:"",
				proffession:"",
				hates:["Charity"],
				can:"Cook"
			};

var person5 = {name:"Durga",
				gender:"F",
				isFrom:{city:"Cuttack",population_of_city:1000000,stateDetail:{name:"Odisha",capital:"Bhuvaneswar",population:50000000}},
				likes:["Long walks","Idiots"],
				loves:["Flowers"],
				do_not_like:[],
				hasCousins:0,
				hasChildren:0,
				hasBrother:1,
				hasSister:0,
				relation:"Sister of Krishna",
				proffession:"",
				hates:["Dishonesty","Bad Uncles"],
				can:"Perform Magic"
			};

var person6 = {name:"Ali",
				gender:"M",
				isFrom:{city:"Kolkata",population_of_city:15000000,stateDetail:{name:"West Bengal",capital:"Kolkata",population:70000000}},
				likes:["Sweets","Chaat"],
				loves:["Wrestling"],
				do_not_like:[],
				hasCousins:0,
				hasChildren:0,
				hasBrother:0,
				hasSister:0,
				relation:"",
				proffession:"Scientist",
				hates:["Milk"],
				can:"Fly planes"
			};


var person = [person1,person2,person3,person4,person5,person6];
var is_From = function(city) {
	var result = [];
	person.forEach(function(x) {
		if (x.isFrom.city == city)
			result.push(x.name);
	});
	return result;
};
var do_like = function(choice) {
		var count = 0;
		person.forEach(function(x) {
		if (x.likes.filter(function(y){ return y == choice}) == choice){
				count += 1;
			};
		});
		return count;
};

var love_or_like = function(love_thing,like_thing){
	var result=[];
	person.forEach(function(x) {
		if (x.loves.filter(function(y){ return y ==love_thing })==love_thing || 
			x.likes.filter(function(y){ return y ==like_thing })==like_thing){
				result.push(x.name);
			};
	});
	return result;
};

var all_states = function() {
	var array = [];
	person.forEach(function(x) {
		array.push(x.isFrom.stateDetail.name);
	});
	var stateName = {};
	array.forEach(function(x){
		stateName[x] = stateName[x] || 0;
		});
	return Object.keys(stateName);
};

var total_population_of_states_where_person_hates_something = function(hatingThing) {
	var total = 0;
	person.forEach(function(x){
		if (x.hates.filter(function(y){ return y==hatingThing}) == hatingThing)
			total += x.isFrom.stateDetail.population;
	});
	return total;
};

var find_if_has_brother = function(name) {
	var find_parson = person.filter(function(x) {
		return (x.name == name);
	});
	if (find_parson[0].hasBrother != 0)
		return "Yes";
	return "No";
};

var find_if_can = function(name,task) {
	var find_parson = person.filter(function(x) {
		return (x.name == name);
	});
	if (find_parson[0].can == task)
		return "Yes";
	return "No";
};

var find_brother_or_sister = function(name,relation) {
	var find_parson = person.filter(function(x) {
		var split_relation = x.relation.split(" ");
		return (split_relation[0]==relation && split_relation[2]==name);
	});
	if (find_parson.length != 0)
		return find_parson[0].name;
	return "Don't has " + relation;
};

var findNumber = function(gender,key,thing) {
	var count = 0;
	var choosePerson = person.filter(function(x) {
		return (x[key] == thing);
	});
	choosePerson.forEach(function(y) {
		if (y.gender == gender)
			count +=1;
	});
	return count;
};

var num_of_people_lives_in_state_capital = function() {
	var count = 0;
	person.forEach(function(x) {
		if (x.isFrom.city == x.isFrom.stateDetail.capital)
			count++;
	});
	return count;
};



test.who_all_are_from_Dwaraka = function() {
	assert.deepEqual(is_From("Dwaraka"),["Krishna","Arjun"]);
};

// test.nobody_is_from_timbuktu = function() {
// 	assert.deepEqual(is_From("Timbuktu"),[]);
// };

// test.nobody_is_from_Kolkata = function() {
// 	assert.deepEqual(is_From("Kolkata"),["Karan","Ali"]);
// };

test.how_many_like_milk = function() {
	assert.deepEqual(do_like("Milk"),2);
};

// test.how_many_like_Rosogulla = function() {
// 	assert.deepEqual(do_like("Rosogulla"),0);
// };

test.who_all_love_Sweets_or_like_Milk = function() {
	assert.deepEqual(love_or_like("Sweets","Milk"),["Krishna","Arjun","Karan","Sudhama"]);
};

test.from_which_states_people_are = function(){
	assert.deepEqual(all_states(),["Gujrat","West Bengal","Karnataka","Odisha"]);
};

test.total_population_of_states_where_person_hates_Didhonesty = function(){
	assert.deepEqual(total_population_of_states_where_person_hates_something("Dishonesty"),120000000);
};
test.does_Krishna_has_brother = function() {
	assert.deepEqual(find_if_has_brother("Krishna"),"No");
};
test.does_durga_can_perform_magic = function() {
	assert.deepEqual(find_if_can("Durga","Perform Magic"),"Yes");
};
test.who_is_the_sister_of_Krishna = function() {
	assert.deepEqual(find_brother_or_sister("Krishna","Brother"),"Don't has Brother");
};
test.how_many_males_like_rice = function() {
	assert.deepEqual(findNumber("M","hates","Shah Rukh Khan movies"),1);
};
test.how_many_people_live_in_state_capital = function() {
	assert.equal(num_of_people_lives_in_state_capital(),3);
};


exports.test = test;