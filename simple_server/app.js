const http = require('http');
const fs = require('fs');

http.createServer(function(req,res){
	var kodeStatus = 0;
	var fileName = "";
	if(req.url == "/"){
		// index
		kodeStatus = 200;
		fileName = "index.html";
	}else if(req.url == "/contact"){
		// contact
		kodeStatus = 200;
		fileName = "contact.html";
	}else{
		// not found
		kodeStatus = 404;
		fileName = "notfound.html";
	}

	res.writeHead(kodeStatus,{"Content-Type" : "text/html"});
	fs.createReadStream(`./template/${fileName}`).pipe(res);
		// console.log(req.url);
		// res.write("Hello from node Js Server\n");
		// res.write(`Your request is ${req.url}`);
		// res.end();
	// }
}).listen(3000);

console.log("server is running");