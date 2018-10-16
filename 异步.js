var fs = require('fs');

fs.readFile('./db.js', function () {
    console.log('read1')
});

fs.readFile('./db.js', function () {
    console.log('read2')
});

fs.readFile('./db.js', function () {
    console.log('read3')
});

console.log(4);

//结果
// 4
// read1
// read3
// read2
