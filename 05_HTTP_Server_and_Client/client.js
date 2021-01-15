'use strict'

const http = require('http');

const url = 'http://localhost:3000/api/todos';

// GET
http.request(url, res => {
    let responseData = '';
    console.log('GET', url);
    console.log('statusCode', res.statusCode);
    res.on('data', chunk => responseData += chunk);
    res.on('end', () => console.log('responseData', JSON.parse(responseData)));
}).end();

// POST
http.request(
    url,
    {method: 'POST'},
    res => {
        console.log('POST', url);
        console.log('statusCode', res.statusCode);
    }).end();

const notFoundUrl = 'http://localhost:3000/api/hogehoge';
http.request(notFoundUrl, res => {
    console.log('GET', notFoundUrl);
    console.log('statusCode', res.statusCode);
}).end();