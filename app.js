// Objek reference
// dimana objek yang di taruh di dlm variabel di copi
// dan sehingga ketika value pada key di variabel obj2 berubah
// maka parent objek (myObj) nilainya juga 
// ikut berubah sehingga ini disebut objeck 
// reference

// nah utk membuat objek parent tidak berubah nilainya
// ketika kita sudah mengcopi objek awal ke 
// variabel lainnya maka menggunakan method objek
// factory

// var myObj = {
// 	name:"Riventus",
// 	age:23,
// };

// var obj2 = myObj;
// obj2.age = 19;

// console.log(myObj);


// this mereferensikan Objek Instance dari myObj
// console.log(this === myObj);
var myObj = {
	name : "riventus",
	age : 23,
	print : function(){
		console.log(this.name+" is "+this.age+" years old");
// console.log(this === myObj);
// hasilnya true karena myObj langusng di inisiasi dengan keyword this
// sehingga utk memanggil key di dlm suatu myObj maka nilai nya harus direferensikan
// oleh myObj dan supaya lebih mudah javascript menggunakan keyword this
// utk memanggil key index 

	} 
};


function myFunction(){
	console.log("im myFunction");
	console.log(this.data);
	// console.log(this === global);

}

myObj.print();
console.log("---------");
myFunction();