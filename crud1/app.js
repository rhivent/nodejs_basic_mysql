const http = require("http");
const url = require("url");
const routes = require("routes")();
const view = require("swig");
const mysql = require("mysql");
const qString = require("querystring");
const connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	database:"nodejs",
	user:"root",
	password:""
});

routes.addRoute('/',function(req,res){
	connection.query("select * from mahasiswa",function(err,rows,field){
		if(err) throw err;

		let html = view.compileFile('./template/index.html')({
			title:"DATA MAHASISWA",
			data:rows
		});
		res.writeHead(200,{"Content-Type":"text/html"});
		res.end(html);
	});
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

routes.addRoute('/insert',function(req,res){
	if(req.method.toUpperCase() == "POST"){
		let data_post = "";
		req.on("data",function(chuncks){
			data_post += chuncks;
		});

		req.on("end",function(){
			data_post = qString.parse(data_post);
			connection.query("insert into mahasiswa set ? ",data_post,
				function(err,field){
					if(err) throw err;

					res.writeHead(302,{"Location":"/"});
					res.end();
				}
			);
		});
	}else{
		let html = view.compileFile('./template/form.html')({
			title:"FORM MAHASISWA",
		});		
		res.writeHead(200,{"Content-Type":"text/html"});
		res.end(html);
	}
});

routes.addRoute('/update/:nim',function(req,res){

		connection.query("select * from mahasiswa where ?",
			{nim : this.params.nim},
			function(err,rows,field){
				if(rows.length){
					var data = rows[0];
					if(req.method.toUpperCase() == "POST"){
						let data_post = "";
						req.on('data',function(chuncks){
							data_post += chuncks;
						});

						req.on('end',function(){
							data_post = qString.parse(data_post);
							connection.query("update mahasiswa set ? where ?",[
								data_post,
								{nim:data.nim}
								],
								function(err,field){
									if(err) throw err;
 
									res.writeHead(302,{"Location":"/"});
									res.end();	
								}
							);
						});
					}else{
						let html = view.compileFile('./template/form_update.html')({
							title:"UPDATE MAHASISWA",
							data:data
						});		
						res.writeHead(200,{"Content-Type":"text/html"});
						res.end(html);
					}		
				}else{
					let html = view.compileFile('./template/notfound.html')();
					res.writeHead(404,{"Content-Type":"text/html"});
					res.end(html);			
				}
			}
		);
});

routes.addRoute('/delete/:nim',function(req,res){
	connection.query("delete from mahasiswa where ?",{
		nim:this.params.nim
	},function(err,bisadiubah){
		if(err) throw err;

		res.writeHead(302,{"Location":"/"});
		res.end();
	});
});

http.createServer(function(req,res){
	let path = url.parse(req.url).pathname;
	let match = routes.match(path);
	if(match){
		match.fn(req,res,match);
	}else{
		let html = view.compileFile('./template/notfound.html')();
		res.writeHead(404,{"Content-Type":"text/html"});
		res.end(html);
	}
}).listen(3000);

console.log("Server is running...");