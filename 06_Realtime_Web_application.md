# 6章 リアルタイムWebアプリケーション

- [6章 リアルタイムWebアプリケーション](#6章-リアルタイムwebアプリケーション)
  - [用語一覧](#用語一覧)
  - [ポーリング](#ポーリング)
  - [ロングポーリング](#ロングポーリング)
  - [SSE(Server Sent Events)](#sseserver-sent-events)
    - [実装](#実装)
      - [ブラウザを開きながらREPLでTODOを追加](#ブラウザを開きながらreplでtodoを追加)
        - [障害調査(差分確認)](#障害調査差分確認)
  - [WebSocket](#websocket)

## 用語一覧

| 略語 | フル |
| :-- | :-- |
| SPA | シングルページアプリケーション |
| CSR | Client Side Rendering |
| SSR | Server Side Rendering |
| SSG | Static Site Generation |
| SSE | Server Sent Events |

## ポーリング

定期的に画面を更新して、最新を維持するようにする。  
無駄なGETが発生するので、そのへんとのトレードオフ。

## ロングポーリング

サーバにGETが来た時点で、更新がされるまで待機する。

## SSE(Server Sent Events)

一度確立したHTTP接続を維持したまま、データ更新が発生するたびにサーバからデータを送る。  
この本ではこれを実装する。

### 実装

```
cd 06_Realtime_Web_application/todo-sse
npm install isomorphic-fetch
npm install
npm start
```

[http://localhost:3000](http://localhost:3000)

ハンズオンNode.jsから引用。
```
Google ChromeのDevToolsを開いた状態でhttp://localhost:3000にアクセスします。DevToolsの［Network］タブ内に/api/todos/eventsへのリクエストが表示され、これを選択してさらにその中の［EventStream］タブを開くと、SSEの通信の内容が図6-4のように表示されます。
```
…と書いてあるが、eventsへのリクエスト出ないぞ？

#### ブラウザを開きながらREPLでTODOを追加

```
cd 06_Realtime_Web_application/todo-sse
npm install isomorphic-fetch
```

```
node --experimental-repl-await
```

```
require('isomorphic-fetch')

.editor

await fetch('http://localhost:3000/api/todos', {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json'
  },
  body: JSON.stringify({ title: 'ペン入れ' })
})
```
Ctrl + D

サーバに「ペン入れ」タスクが追加され、ブラウザが更新自動で更新される。  
**正しく動いているっぽいのに、eventsがブラウザの開発ツールで出ないぞ？**

##### 障害調査(差分確認)

```
diff hands-on-nodejs/ch06/todo-sse/app.js Practice_Hands_on_Node.js/06_Realtime_Web_application/todo-sse/app.js
diff hands-on-nodejs/ch06/todo-sse/components/Todos.js Practice_Hands_on_Node.js/06_Realtime_Web_application/todo-sse/components/Todos.js
diff hands-on-nodejs/ch06/todo-sse/pages/active.js Practice_Hands_on_Node.js/06_Realtime_Web_application/todo-sse/pages/active.js
diff hands-on-nodejs/ch06/todo-sse/pages/completed.js Practice_Hands_on_Node.js/06_Realtime_Web_application/todo-sse/pages/completed.js
diff hands-on-nodejs/ch06/todo-sse/pages/index.js Practice_Hands_on_Node.js/06_Realtime_Web_application/todo-sse/pages/index.js
```

## WebSocket

リアルタイムWebアプリケーションの４つ目の手段。  
Socket.IOを使って実装する。  

```
cd 06_Realtime_Web_application/todo-socket-io
npm install
npm start
```

[http://penguin.linux.test:3000/](http://penguin.linux.test:3000/)  
[http://localhost:3000/](http://localhost:3000/)
