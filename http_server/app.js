const http = require('http');

http.createServer(function(req,res){
	if(req.url != "/favicon.ico"){
		// console.log(req.url);
		res.writeHead(200,{"Content-Type" : "text/plain"});
		res.write("Hello from node Js Server\n");
		res.write(`Your request is ${req.url}`);
		res.end();
	}
}).listen(3000);

console.log("server is running");