'use strict'

const http = require('http');

// ToDo一覧
const todos = [
    {id:1, title:'ネーム', completed:false },
    {id:2, title:'下書き', completed:true }
];

// HTTPサーバの初期化
const server = http.createServer((req, res) => {
    if(req.url === '/api/todos'){
        if(req.method === 'GET'){
            // GETメソッドの場合、JSONを全部返す
            res.setHeader('Content-Type','application/json');
            return res.end(JSON.stringify(todos));
        } else {
            // GET以外は何もしない。
            res.statusCode = 405;
        }
    } else {
        // /api/todos以外のURLは存在しない。
        res.statusCode = 404;
    }
    res.end();
}).listen(3000);
