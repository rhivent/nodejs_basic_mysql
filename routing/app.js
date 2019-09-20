const http = require("http");
const url = require("url");
const routes = require("routes")();
const view = require("swig");

routes.addRoute('/',function(req,res){
	let html = view.compileFile('./template/index.html')({
		title : "index page from Riventus",
	});
	res.writeHead(200,{"Content-Type":"text/html"});
	res.end(html);
});

routes.addRoute('/profile/:nama?',function(req,res){
	res.writeHead(200,{"Content-Type":"text/plain"});
	if(this.params.nama == 'undefined')
	{
		res.end(`PROFILE PAGE ${this.params.nama}`);
	}else{
		res.end(`PROFILE PAGE`);
	}
});

routes.addRoute('/contact',function(req,res){
	let html = view.compileFile('./template/contact.html')();
	res.writeHead(200,{"Content-Type":"text/html"});
	res.end(html);
});

http.createServer(function(req,res){
	// res.writeHead(404,{"Content-Type" : "text/plain"});
	// res.end("Hellow Node.js ;");
	let path = url.parse(req.url).pathname;
	let match = routes.match(path);
	if(match){
		match.fn(req,res,match);
	}else{
		res.writeHead(404,{"Content-Type":"text/plain"});
		res.end("Page NOT FOUND !!!");
	}
}).listen(3000);

console.log("Server is running...");