'use strict'

const express = require('express');
const app = express();

app.use('/api/todos/:id(\\d+)', require('./routes/todos'));
app.listen(3000);

console.log('app start')