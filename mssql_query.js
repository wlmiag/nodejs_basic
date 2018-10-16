var mssql = require('./mssql_connect');

exports.myquery = function myquery(sqlString,callback) {
    var conn = new mssql.mssql({
        'userName': 'sa',
        'password': '123456',
        'server': '1.1.1.1',
        'options': {
            'port': 1433,
            'database': 'abc',
            encrypt: false,
            tdsVersion: "7_1"//sql server 2000 的需要加上这个，其他版本请注释此参数
        }
    });

    conn.query(sqlString, function (err, data) {
            if (!err) {
                // console.log(data)       //成功返回数据
                callback(data)
            }
            else {
                console.log(err)      //出错返回
            }
        }
    );
}

// myQuery('select * from hrjisuanjieguo',function (data) {
//     console.log(data)
// })






