'use strict'

const express = require('express');
const router = express.Router();

const todos = [
    {id:1, title:'ネーム', completed:false},
    {id:2, title:'下書き', completed:true}
];

router.route('/api/todos/:id(\\d+)')
    .get((req, res) => {
        console.log('GET');
        console.log(req.params.id);
        const todoId = Number(req.params.id);
        console.log('todoId',todoId);

        for (let i=0; i<todos.length; i++) {
            if(todos[i].id == todoId){
                console.log(todos[i]);
                res.status(200).send(todos[i]);
                return ;
            }
        }

        // 本当は400を返す。
        res.status(400).send(todoId + " is NotFound");

    })
    .post((req, res) => {
        console.log('POST');
        res.status(200).send('nothing');
    })

module.exports = router;