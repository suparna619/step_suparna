var fs = require('fs');
var static_content = {};
static_content['comments_template'] = fs.readFileSync('./templates/comments.html','utf-8');
var comments_file = './data/comments.json';
var comments = fs.existsSync(comments_file) && 
	JSON.parse(fs.readFileSync(comments_file,'utf-8')) || [];

var getContentType = function(path){
	var type = {
		html:'text/html',
		jpg:'image/jpeg',
		gif:'image/gif',
		css:'text/css',
		js:'application/x-javascript'
	};
	var extention = path.slice(path.lastIndexOf('.')+1);
	return type[extention.toLowerCase()] || 'text/dontKnow';	
};

var handleMissingContent = function(req, res){
	console.log('unhandled request: ',req.url);
	res.statusCode = 404;
	res.end();
};
var applyTemplate = function(text, data){
	var result = text;
	Object.keys(data).forEach(function(key){
		var pattern = new RegExp(key,'g');
		result = result.replace(pattern,data[key]);
	});
	return result;
};
var COMMENT = '<p>time<br/>name<br/>text</p>';
var renderComments = function(){
	var to_html = function(comment){
		return applyTemplate(COMMENT,comment);
	};
	var innerHTML = comments.map(to_html).join('\r\n');
	return static_content['comments_template'].replace('DATETIME_NAME_COMMENTS_LIST',innerHTML);
}
var serveComments = function(req, res){
	res.writeHead(200,{'Content-Type':getContentType('.html')});
	res.end(renderComments());
};
var servePublicContent = function(req,res){
	var localPath = './public'+req.url;
	console.log('serving ',localPath);	
	var sendContent = function(err, text){
		if(err){
			console.log('error loading file',err);
			res.statusCode = 500;
			res.end();
			return;
		}
		res.writeHead(200,{'Content-Type':getContentType(localPath)});
		res.end(text);
	};
	fs.readFile(localPath,'',sendContent);
}
var handlePublic = function(req,res){
	if(!fs.existsSync('./public'+req.url)) return false;
	servePublicContent(req,res);
	return true;	
};
var processAddComment = function(req,res){
	var params = {};
	req.url.split('?')[1].split('&').forEach(function(kv){
		var parts = kv.split('=');
		params[parts[0]] = parts[1];
	});
	comments.unshift({time:new Date().toString(),name:params.name,text:params.comment});
	fs.writeFile(comments_file,JSON.stringify(comments));
	res.writeHead(302,{Location:"comments.html"});	
	res.end();
};
var processPostComment = function(req,res){
	var params = {};
	var data = '';
	req.on('data',function(chunk){
		data += chunk;
	});
	req.on('end',function(){
		data.split('&').forEach(function(kv){
			var parts = kv.split('=');
			params[parts[0]] = parts[1];
		});
		comments.unshift({time:new Date().toString(),name:params.name,text:params.comment});
		fs.writeFile(comments_file,JSON.stringify(comments));
		res.writeHead(302,{Location:"comments.html"});
		res.end();	
	});	
};
var handlePrivate  = function(req,res){
	if(req.url == '/comments.html'){
		serveComments(req,res);
		return true;
	}
	if(req.url.match(/^\/addComment/)){
		processAddComment(req,res);
		return true;
	}
	if(req.url.match(/^\/postComment/)){
		processPostComment(req,res);
		return true;
	}	
	return false;
}
//TODO: handle /
var requestListener = function (req, res) {
	handlePublic(req,res) || handlePrivate(req,res) || handleMissingContent(req,res);
};
var server = require('http').createServer(requestListener).listen(8080);