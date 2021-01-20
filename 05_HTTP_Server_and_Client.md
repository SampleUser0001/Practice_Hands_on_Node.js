# 5章 HTTPサーバとHTTPクライアント

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

### 引数を渡す

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

P.193後半から再開