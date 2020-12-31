# 2章 非同期プログラミング

- [2章 非同期プログラミング](#2章-非同期プログラミング)
  - [イベントループについて](#イベントループについて)
  - [コールバックを利用した非同期APIの実行](#コールバックを利用した非同期apiの実行)
    - [コールバックを使った…同期処理](#コールバックを使った同期処理)
    - [fs.readdir()を使ってみる](#fsreaddirを使ってみる)
      - [存在しないディレクトリを指定した場合](#存在しないディレクトリを指定した場合)
    - [コールバックの規約](#コールバックの規約)
  - [エラーハンドリング](#エラーハンドリング)

## イベントループについて

通常
```
const 金額 = バーコードリーダー.読む(弁当) 
const 温まった弁当 = 電子レンジ.チン(弁当)
レジ.会計する(金額)
商品を渡す(温まった弁当)
```
このパターンだと2行目で待ちが発生する。


```
const 金額 = バーコードリーダー.読む(弁当)
電子レンジ.チン(
    弁当,
    温まった弁当 => 商品を渡す(温まった弁当)
)
レジ.会計する(金額)
```
コールバック関数を使って、「チン」が終わった後に行う処理を指定する。  
この「電子レンジ.チン()」は時間がかかる処理だが、プログラムの進行を止めない。これを**ノンブロッキング**と表現し、I/Oの場合は**ノンブロッキングI/O**と呼ぶ。→ **非同期処理、非同期プログラミング**

## コールバックを利用した非同期APIの実行

```js:setTimeout.js
setTimeout(
    () => console.log('3秒経過しました。'),
    3000
)
console.log('setTimeout()を実行しました。')
```

```
setTimeout()を実行しました。
3秒経過しました。
```
後に書いてある「setTimeout()を実行しました。」が先に出力される。

### コールバックを使った…同期処理

```
const array1 = [0, 1, 2, 3];
const array2 = array1.map((element) => {
    console.log(`${element}を変換します。`);
    return element * 10;
})
console.log('配列の変換が完了しました。', array2);
```

```
0を変換します。
1を変換します。
2を変換します。
3を変換します。
配列の変換が完了しました。 [ 0, 10, 20, 30 ]
```

### fs.readdir()を使ってみる

```fs:use_fs_readdir.js
const fs = require("fs");

const returnValue = fs.readdir(
    '.',
    (err, files) => {
        console.log('fs.readdir()実行結果');
        console.log('err', err);
        console.log('files', files);
    }
);

// 戻り値はありません。
console.log('returnValue', returnValue);
```

```
returnValue undefined
fs.readdir()実行結果
err null
files [ 'arrayConvert.js', 'setTimeout.js', 'use_fs_readdir.js' ]
```

#### 存在しないディレクトリを指定した場合

```javascript:not_found_dir.js
const fs = require("fs");

const returnValue = fs.readdir(
    'hoge',
    (err, files) => {
        console.log('fs.readdir()実行結果');
        console.log('err', err);
        console.log('files', files);
    }
);

// 戻り値はありません。
console.log('returnValue', returnValue);
```

```
returnValue undefined
fs.readdir()実行結果
err [Error: ENOENT: no such file or directory, scandir 'hoge'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'scandir',
  path: 'hoge'
}
files undefined
```

### コールバックの規約

- コールバックはパラメータの最後に書く
- コールバックの引数は…
  - 第1引数：処理中に発生したエラー
  - 第2引数：処理結果
  
## エラーハンドリング

JavaScriptにはtry-catchがある。

parseJsonSync.js
```js: parseJsonSync.js
function parseJsonSync(json,message) {
    try{
        console.log(message);
        return JSON.parse(json);
    } catch(err){
        console.error('エラーキャッチ', err);
    }
}

const okJson = '{ "value": "hoge" }';
const ngJson = '{ "value": "hoge" ';
console.log("parsed:",parseJsonSync(okJson));
console.log("parsed:",parseJsonSync(ngJson));
```

実行結果
```
undefined
parsed: { value: 'hoge' }
undefined
エラーキャッチ SyntaxError: Unexpected end of JSON input
    at JSON.parse (<anonymous>)
    at parseJsonSync (/home/ittimfn/Practice_Hands_on_Node.js/02_Asynchronous_programming/parseJsonSync.js:4:21)
    at Object.<anonymous> (/home/ittimfn/Practice_Hands_on_Node.js/02_Asynchronous_programming/parseJsonSync.js:13:23)
    at Module._compile (node:internal/modules/cjs/loader:1108:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1137:10)
    at Module.load (node:internal/modules/cjs/loader:973:32)
    at Function.Module._load (node:internal/modules/cjs/loader:813:14)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:76:12)
    at node:internal/main/run_main_module:17:47
parsed: undefined
```

コールバックを使用する場合は、try-catchしない。  
エラーハンドリングできないため。
callbackTryCatch.js（NGパターン）
```js:callbackTryCatch.js
function parseJsonAsync(json, callback){
    try {
        setTimeout(() => {
            callback(JSON.parse(json));
        }, 1000)
    } catch(err) {
        console.error('エラーキャッチ', err);
        // エラー発生時にcallbackが実行される。
        callback({});
    }
}

const ngJson = '{ "value": "hoge" ';
parseJsonAsync(ngJson, result => {
    console.log('parse結果:',result);
});
```

実行結果
```
undefined:1
{ "value": "hoge"

SyntaxError: Unexpected end of JSON input
    at JSON.parse (<anonymous>)
    at Timeout._onTimeout (/home/ittimfn/Practice_Hands_on_Node.js/02_Asynchronous_programming/callbackTryCatch.js:4:27)
    at listOnTimeout (node:internal/timers:556:17)
    at processTimers (node:internal/timers:499:7)
```
「エラーをキャッチ」が表示されていないため、catchを通過していないことがわかる。

Node.jsの規約に合わせた修正版。
callbackTryCatchModified.js
```js:callbackTryCatchModified.js
function parseJsonAsync(json, callback){
    setTimeout(() => {
        try {
            callback(null, JSON.parse(json));
        } catch(err) {
            callback(err);
        }
    }, 1000);
}

const ngJson = '{ "value": "hoge" ';
parseJsonAsync(ngJson, (err, result) => {
    console.log('parse結果:', err, result);
});
```

実行結果
```
parse結果: SyntaxError: Unexpected end of JSON input
    at JSON.parse (<anonymous>)
    at Timeout._onTimeout (/home/ittimfn/Practice_Hands_on_Node.js/02_Asynchronous_programming/callbackTryCatchModified.js:4:33)
    at listOnTimeout (node:internal/timers:556:17)
    at processTimers (node:internal/timers:499:7) undefined
```

P.51から再開
