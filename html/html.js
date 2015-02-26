var name = process.argv[2];
var color = process.argv[3];

var  index = {
	html:{
		head:{
			title:"Hello"
		},
		body:{
			h1:"My name is "+name+"(in h1 style)",
			p:"I am "+name,
			b:"My name is "+name+"(in bold)"
		}
	}
};

var openningTag = function(tag) {
	return "<"+tag+">";
}

var clossingTag = function(tag) {
	return "</"+tag+">";
}

var myHTML = function(node) {
	if(typeof node == "string"){
		return node;
	}
	var content = "";
	var tag = Object.keys(node);
	tag.forEach(function(t) {
		if(t == 'body')
			content += "<body bgcolor = "+color+">";
		content += openningTag(t);
		content += myHTML(node[t]);
		content += clossingTag(t);
	});
	return content;
}

var pageIndex = {index:index};

var webPage = function(pageName) {
	if(pageIndex[pageName] != undefined) {
		return myHTML(pageIndex[name]);
	}
	var webPageIndex = index;
	webPageIndex["html"].head.title = pageName;
	return myHTML(webPageIndex);
}
console.log(webPage(name));