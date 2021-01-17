'use strict'

const express = require('express');
const router = express.Router();

const todos = [
    {id:1, title:'ネーム', completed:false},
    {id:2, title:'下書き', completed:true}
];

router.route('/')
    .get((req, res) => {
        const todoId = Number(req.params.id);
        res.send(todos);
    })
    .post((req, res) => {

    })

module.exports = router;