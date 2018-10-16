var fs = require('fs');

function read1() {
    return new Promise(function (resolve, reject) {
        fs.readFile('./db.js',function () {
            console.log('read1');
            resolve('r1')
        })
    });
}
function read2() {
    return new Promise(function (resolve, reject) {
        fs.readFile('./db.js',function () {
            console.log('read2');
            resolve('r2')
        })
    });
}
function read3() {
    return new Promise(function (resolve, reject) {
        fs.readFile('./db.js',function () {
            console.log('read3');
            resolve('r3')
        })
    });
}

read1()
    .then(function (data) {
        // console.log(data)
        return read2()
    })
    .then(function (data) {
        // console.log(data)
        return read3()
    })
    .then(function (data) {
        // console.log(data)
        console.log(4)
    });

// 结果
// read1
// read2
// read3
// 4





