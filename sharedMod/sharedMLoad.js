require('./sharedModule1'); //panggil skill n set lang :"PHP"
console.log('========================');
// skill lang otomatis menjadi PHP, krn sudah di setting di 
// sharedModule1.js
// jika di setting ulang di sharedModule2.js mka lang mjd 
// settingan dari sharedModule2
require('./sharedModule2');