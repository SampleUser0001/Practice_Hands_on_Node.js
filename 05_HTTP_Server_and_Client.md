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