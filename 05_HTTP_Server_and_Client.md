# 5章 HTTPサーバとHTTPクライアント

- [5章 HTTPサーバとHTTPクライアント](#5章-httpサーバとhttpクライアント)
  - [expressを使用する](#expressを使用する)
  - [expressによるルーティング機能](#expressによるルーティング機能)
    - [起動](#起動)
    - [実行結果（200）](#実行結果200)
    - [実行結果（400）](#実行結果400)
  - [5.4 ExpressによるToDo管理アプリケーションの開発](#54-expressによるtodo管理アプリケーションの開発)
    - [isomorphic-fetchをREPLで使う](#isomorphic-fetchをreplで使う)
    - [GET:引数を渡す](#get引数を渡す)
    - [POST:fetchでjsonを送信する](#postfetchでjsonを送信する)
  - [ReactとNode.jsを使用したユニバーサルWebアプリケーション](#reactとnodejsを使用したユニバーサルwebアプリケーション)

## expressを使用する

事前にexpressをinstallする
```
npm install express
```

## expressによるルーティング機能

### 起動

```
cd 05_HTTP_Server_and_Client/express2/
npm install
node app.js
```

### 実行結果（200）

```
curl localhost:3000/api/todos/1
```
```
{"id":1,"title":"ネーム","completed":false}
```


### 実行結果（400）

```
curl localhost:3000/api/todos/3
```
```
3 is NotFound
```

## 5.4 ExpressによるToDo管理アプリケーションの開発

###  isomorphic-fetchをREPLで使う

```
node --experimental-repl-await
```

```
require('isomorphic-fetch')
fetch

await fetch('http://localhost:3000/api/todos')
console.log(_.status, await _.json())
```

```
> await fetch('http://localhost:3000/api/todos')
Response {
  size: 0,
  timeout: 0,
  [Symbol(Body internals)]: {
    body: PassThrough {
      _readableState: [ReadableState],
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      _writableState: [WritableState],
      allowHalfOpen: true,
      [Symbol(kCapture)]: false,
      [Symbol(kCallback)]: null
    },
    disturbed: false,
    error: null
  },
  [Symbol(Response internals)]: {
    url: 'http://localhost:3000/api/todos',
    status: 200,
    statusText: 'OK',
    headers: Headers { [Symbol(map)]: [Object: null prototype] },
    counter: 0
  }
}
> console.log(_.status, await _.json())
200 [
  { id: 1, title: 'ネーム', completed: false },
  { id: 2, title: '下書き', completed: true }
]
undefined
```

### GET:引数を渡す

```
node --experimental-repl-await
```

```
require('isomorphic-fetch')
await fetch('http://localhost:3000/api/todos?completed=true')
console.log(_.status, await _.json())
```

```
200 [ { id: 2, title: '下書き', completed: true } ]
```

### POST:fetchでjsonを送信する

そのままだとアプリ側でPOSTが処理できないので、パッケージを入れる。  
- [Espresso&Onigiri:Node.js の express で POST した値を取ろうとしたら request.body が undefined になる](https://va2577.github.io/post/99/)
- [Express:v4:req.body](https://expressjs.com/en/4x/api.html#req.body)

```
npm install body-parser
```

jsonをPOSTで処理するためにはアプリでこの2行がいる。
```js
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
```


```
node --experimental-repl-await
```

```js
require('isomorphic-fetch')
.editor
await fetch('http://localhost:3000/api/todos' ,{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ title: 'ペン入れ' })
})
```

```js
console.log(_.status, await _.json())
```
```json
> console.log(_.status, await _.json())
201 { id: 3, title: 'ペン入れ', completed: false }
undefined
```

POSTした結果を見る。
```js
await fetch('http://localhost:3000/api/todos')
console.log(_.status, await _.json())
```
```json
200 [
  { id: 1, title: 'ネーム', completed: false },
  { id: 2, title: '下書き', completed: true },
  { id: 3, title: 'ペン入れ', completed: false }
]
undefined
```

## ReactとNode.jsを使用したユニバーサルWebアプリケーション

```
npm install
npm start
```

http://localhost:3000

