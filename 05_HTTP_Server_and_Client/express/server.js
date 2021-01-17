'use strict'

const express = require('express');
const todos = [
    {id:1, title:'ネーム', completed:false},
    {id:2, title:'下書き', completed:true}
];
const app = express();

app.get('/api/todos/:id(\\d+)', (req, res) => {
    const id = Number(req.params.id);
    console.log("id:",id);
    res.json(todos);
});
app.listen(3000);
console.log('server start.');