'use strict'

const express = require('express');
const bodyParser = require('body-parser')


let todos = [
    {id:1, title:'ネーム', completed:false},
    {id:2, title:'下書き', completed:true}
];
const app = express();

app.get('/api/todos', (req, res) => {
    if(!req.query.completed){
        return res.json(todos);
    }

    // GETのパラメータに'completed'がある場合
    // 'completed=true'が来ていればtrue。
    const completed =  req.query.completed === 'true'
    res.json(todos.filter(todo => todo.completed === completed))
});

let id = todos.length;

// Todo登録
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.post('/api/todos', (req, res, next) =>{
    res.setHeader('Content-Type', 'application/json');
    console.log('POST');
    console.log('req.body', req.body)

    const { title } = req.body;
    if(typeof title !== 'string' || !title ){
        // titleがリクエストに含まれていない場合はステータスコード400
        const err = new Error('title is required.');
        err.statusCode = 400;
        return next(err);
    }

    // Todoの作成
    const todo = { id: id+=1 , title, completed:false };
    todos.push(todo);
    // 201(Created)
    res.status(201).json(todo);
});

// エラー制御
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({error: err.message});
});

app.listen(3000);

const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});

nextApp.prepare().then(
    () => app.get('*', nextApp.getRequestHandler()),
    err => {
        console.err(err);
        process.exit(1);
    }
);
