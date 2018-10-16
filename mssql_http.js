var http = require('http');
var fs = require('fs');
var url = require('url');
var template = require('art-template');
var myquery = require('./mssql_query');

http
    .createServer(function (req, res) { // 简写方式，该函数会直接被注册为 server 的 request 请求事件处理函数
        // 使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
        var parseObj = url.parse(req.url, true);

        // 单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）
        var pathname = parseObj.pathname;

        if (pathname === '/') {
            fs.readFile('./views/index.html', function (err, data) {
                if (err) {
                    return res.end('404 Not Found.')
                }
                myquery.myquery('select * from hrjisuanjieguo',function (comments) {
                    console.log(comments)
                    var htmlStr = template.render(data.toString(), {
                        comments: comments
                    });
                    res.end(htmlStr)
                })
            })
        } else if (pathname.indexOf('/public/') === 0) {
            //    如果请求路径是以 /public/ 开头的，则我认为你要获取 public 中的某个资源
            //    所以我们就直接可以把请求路径当作文件路径来直接进行读取
            fs.readFile('.' + pathname, function (err, data) {
                if (err) {
                    return res.end('404 Not Found.')
                }
                res.end(data)
            })
        } else {
            // 其它的都处理成 404 找不到
            fs.readFile('./views/404.html', function (err, data) {
                if (err) {
                    return res.end('404 Not Found.')
                }
                res.end(data)
            })
        }
    })
    .listen(3000, function () {
        console.log('running...')
    });
