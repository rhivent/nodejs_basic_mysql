const http = require('http');
const fs = require('fs');
const url = require('url');
const qString = require('querystring');

http.createServer(function(req,res){
	var kodeStatus = 0;
	var fileName = "";

	if(req.url != "/favicon.ico"){
		var access = url.parse(req.url);
		/* REQUEST GET */ 
		if(access.pathname == "/"){
			var dataQuery = qString.parse(access.query);
			res.writeHead(200,{"Content-Type":"application/json"});
			res.end(JSON.stringify(dataQuery));
		}
		/* REQUEST POST */
		else if(access.pathname == "/form"){
			if(req.method.toUpperCase() == "POST"){
				var data_post = "";
				req.on('data',function(chunck){
					data_post += chunck;
				});

				req.on('end',function(){
					data_post = qString.parse(data_post);
					res.writeHead(200,{"Content-Type":"text/plain"});
					res.end(JSON.stringify(data_post));
				});
			}else{ // GET
				res.writeHead(200,{"Content-Type":"text/html"});
				fs.createReadStream("./template/form.html").pipe(res);
			}
		}else{
			res.writeHead(200,{"Content-Type":"text/html"});
			res.end("Page Not Found !");
		}

		// console.log(access.query);
		// bentuknya Objek
		// console.log(dataQuery);
		// 
		// console.log(dataQuery.name);
		// console.log(dataQuery.alamat);
		// res.end();
		// console.log(access);
		// menggunakan pathname dan query utk menvalidasi 
		// data yang terpassing di url
	// 	if(access.pathname == "/"){
	// 		fileName = "./template/index.html";
	// 	}else if(access.pathname == "/contact"){
	// 		fileName = "./template/contact.html";
	// 	}else {
	// 		fileName = "./template/notfound.html";
	// 	}	
	}

	// res.writeHead(kodeStatus,{"Content-Type" : "text/html"});
	// fs.createReadStream(`./template/${fileName}`).pipe(res);
		// console.log(req.url);
		// res.write("Hello from node Js Server\n");
		// res.write(`Your request is ${req.url}`);
		// res.end();
	// }
}).listen(3000);

console.log("server is running");