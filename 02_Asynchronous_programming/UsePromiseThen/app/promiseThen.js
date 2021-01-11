'use strict'

const okJson = '{"Foo": 1}';

const stringPromise = Promise.resolve(okJson);
console.log(stringPromise);

const numberPromise = stringPromise.then(str => str.length);
console.log(numberPromise);
console.log(stringPromise);

const unrecoveredPromise = Promise.reject(new Error('エラー')).then(() => 1 );
console.log(unrecoveredPromise);