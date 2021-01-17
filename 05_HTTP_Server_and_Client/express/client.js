'use strict'

const url = new URL('/api/todos?completed=true', 'http://localhost:3000')
console.log(url);
console.log(url.searchParams.get('completed'));
