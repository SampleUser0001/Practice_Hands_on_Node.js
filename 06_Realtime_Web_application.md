# 6章 リアルタイムWebアプリケーション

- [6章 リアルタイムWebアプリケーション](#6章-リアルタイムwebアプリケーション)
  - [ポーリング](#ポーリング)
  - [ロングポーリング](#ロングポーリング)
  - [SSE(Server Sent Events)](#sseserver-sent-events)
    - [実装](#実装)
      - [ブラウザを開きながらREPLでTODOを追加](#ブラウザを開きながらreplでtodoを追加)
      - [原因調査](#原因調査)

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

#### 原因調査

エラーが発生している。

```
GET http://localhost:3000/api/todos/events net::ERR_INCOMPLETE_CHUNKED_ENCODING 200 (OK)
```
