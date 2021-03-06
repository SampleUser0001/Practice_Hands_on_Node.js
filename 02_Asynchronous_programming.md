# 2章 非同期プログラミング

- [2章 非同期プログラミング](#2章-非同期プログラミング)
  - [イベントループについて](#イベントループについて)
  - [コールバックを利用した非同期APIの実行](#コールバックを利用した非同期apiの実行)
    - [コールバックを使った…同期処理](#コールバックを使った同期処理)
    - [fs.readdir()を使ってみる](#fsreaddirを使ってみる)
      - [存在しないディレクトリを指定した場合](#存在しないディレクトリを指定した場合)
    - [コールバックの規約](#コールバックの規約)
  - [エラーハンドリング](#エラーハンドリング)
  - [同期/非同期](#同期非同期)
    - [アンチパターン](#アンチパターン)
    - [OKパターン](#okパターン)
    - [OKパターン2](#okパターン2)
    - [コールバックヘル（アンチパターン）](#コールバックヘルアンチパターン)
  - [Promiseインスタンスの生成と状態遷移](#promiseインスタンスの生成と状態遷移)
    - [Promiseとは](#promiseとは)
    - [Promiseのステータス](#promiseのステータス)
    - [Promiseの実装例](#promiseの実装例)
    - [then()](#then)
    - [catch()](#catch)
    - [finally()](#finally)
  - [参考](#参考)

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

## 同期/非同期

**同期と非同期を混ぜてはいけない。**

### アンチパターン

parseJSONAsyncWithCache_antiPattern.js（アンチパターン）
```js
function parseJSONAsync(json, callback){
  setTimeout(() => {
      try {
          callback(null, JSON.parse(json));
      } catch(err) {
          callback(err);
      }
  }, 1000);
}


const cache = {}
function parseJSONAsyncWithCache(json, callback) {
  const cached = cache[json]
  if (cached) {
    callback(cached.err, cached.result)
    return
  }
  parseJSONAsync(json, (err, result) => {
    cache[json] = { err, result }
    callback(err, result)
  })
}

// 1回目の実行
parseJSONAsyncWithCache(
  '{"message": "Hello", "to": "World"}',
  (err, result) => {
    console.log('1回目の結果', err, result)
    // コールバックの中で2回目を実行
    parseJSONAsyncWithCache(
      '{"message": "Hello", "to": "World"}',
      (err, result) => {
        console.log('2回目の結果', err, result)
      }
    )
    console.log('2回目の呼び出し完了')
  }
)
console.log('1回目の呼び出し完了')
```
```
1回目の呼び出し完了
1回目の結果 null { message: 'Hello', to: 'World' }
2回目の結果 null { message: 'Hello', to: 'World' }
2回目の呼び出し完了
```

### OKパターン

常に非同期処理が実行されるようにする。

```js
function parseJSONAsync(json, callback){
  setTimeout(() => {
      try {
          callback(null, JSON.parse(json));
      } catch(err) {
          callback(err);
      }
  }, 1000);
}

const cache = {}
function parseJSONAsyncWithCache(json, callback) {
  const cached = cache[json]
  if (cached) {
    // 常にcallbackを使う
    setTimeout(() => callback(cached.err, cached.result),0)
    return
  }
  parseJSONAsync(json, (err, result) => {
    cache[json] = { err, result }
    callback(err, result)
  })
}

// 1回目の実行
parseJSONAsyncWithCache(
  '{"message": "Hello", "to": "World"}',
  (err, result) => {
    console.log('1回目の結果', err, result)
    // コールバックの中で2回目を実行
    parseJSONAsyncWithCache(
      '{"message": "Hello", "to": "World"}',
      (err, result) => {
        console.log('2回目の結果', err, result)
      }
    )
    console.log('2回目の呼び出し完了')
  }
)
console.log('1回目の呼び出し完了')
```

```
1回目の呼び出し完了
1回目の結果 null { message: 'Hello', to: 'World' }
2回目の呼び出し完了
2回目の結果 null { message: 'Hello', to: 'World' }
```

### OKパターン2

process.nextTick()を使う。  
setTimeout()の場合、Node.jsのイベントループのフェーズに従い、複数のフェーズを順番に通過する必要があるが、  
process.nextTick()の場合は、コールバックを処理するための特定のフェーズを持っていないため、現在実行中の処理が完了次第、すぐ実行される。ただし、Node.jsでしか実行できない。
（表現が妥当か分からん…）

```js
function parseJSONAsync(json, callback){
  setTimeout(() => {
      try {
          callback(null, JSON.parse(json));
      } catch(err) {
          callback(err);
      }
  }, 1000);
}

const cache = {}
function parseJSONAsyncWithCache(json, callback) {
  const cached = cache[json]
  if (cached) {
    // 常にcallbackを使う
    process.nextTick(() => callback(cached.err, cached.result),0)
    return
  }
  parseJSONAsync(json, (err, result) => {
    cache[json] = { err, result }
    callback(err, result)
  })
}

// 1回目の実行
parseJSONAsyncWithCache(
  '{"message": "Hello", "to": "World"}',
  (err, result) => {
    console.log('1回目の結果', err, result)
    // コールバックの中で2回目を実行
    parseJSONAsyncWithCache(
      '{"message": "Hello", "to": "World"}',
      (err, result) => {
        console.log('2回目の結果', err, result)
      }
    )
    console.log('2回目の呼び出し完了')
  }
)
console.log('1回目の呼び出し完了')
```
```
1回目の呼び出し完了
1回目の結果 null { message: 'Hello', to: 'World' }
2回目の呼び出し完了
2回目の結果 null { message: 'Hello', to: 'World' }
```

### コールバックヘル（アンチパターン）

ネストを深くしてはいけない。

NGパターン
```js
asyncFunc1(input, (err, result) => {
  if (err) {
    // エラーハンドリング
  }
  asyncFunc2(result, (err, result) => {
    if (err) {
      // エラーハンドリング
    }
    asyncFunc3(result, (err, result) => {
      if (err) {
        // エラーハンドリング
      }
      asyncFunc4(result, (err, result) => {
        if (err) {
          // エラーハンドリング
        }
 // ...
      })
    })
  })
})
```

別のファンクションに分ける。  
OKパターン  
```js
function first(arg, callback) {
  asyncFunc1(arg, (err, result) => {
    if(err){
      return callback(err);
    }
    second(result, callback);
  })
}

function second(arg, callback) {
  asyncFunc2(arg, (err, result) => {
    if(err){
      return callback(err);
    }
    third(result, callback);
  })
}

// 中略

first(input, (err, result) => {
  if(err){
    // エラーハンドリング
  }
})

```

## Promiseインスタンスの生成と状態遷移

### Promiseとは

非同期処理をいい感じに記載するための仕組み。何も考えずに書くとコールバックヘルになってしまうので、それを防ぐ。  

### Promiseのステータス

| ステータス | 説明                |
| :------   | :--                |
| pending   | 結果が未確定        |
| fulfilled | 非同期処理に成功した |
| rejected  | 非同期処理に失敗した | 
| settled   | 非同期処理終了後の総称。（fulfilled or rejected） |

### Promiseの実装例

parseJSONAsyncPromise.js
``` js : parseJSONAsyncPromise.js

const ok_json = '{"Foo": 1}';
console.log(JSON.parse(ok_json));

function parseJsonAsync(json){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(JSON.parse(json));
            } catch(err) {
                reject(err);
            }
        }, 1000);
    });
}

const toBeFulfilled = parseJsonAsync(ok_json);
const toBeRejected = parseJsonAsync('NG');

console.log('*************** Promise生成直後 ***************') ;
console.log(toBeFulfilled) ;
console.log(toBeRejected) ;
setTimeout(() => { 
  console.log('******************** 1秒後 ********************') ;
  console.log(toBeFulfilled) ;
  console.log(toBeRejected) ;
}, 1000) 
```

実行結果  
(※Node.js Ver.14.15.4)
```
{ Foo: 1 }
*************** Promise生成直後 ***************
Promise { <pending> }
Promise { <pending> }
(node:8) UnhandledPromiseRejectionWarning: SyntaxError: Unexpected token N in JSON at position 0
    at JSON.parse (<anonymous>)
    at Timeout._onTimeout (/app/parseJSONAsyncPromise.js:9:30)
    at listOnTimeout (internal/timers.js:554:17)
    at processTimers (internal/timers.js:497:7)
(Use `node --trace-warnings ...` to show where the warning was created)
(node:8) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:8) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
******************** 1秒後 ********************
Promise { { Foo: 1 } }
Promise {
  <rejected> SyntaxError: Unexpected token N in JSON at position 0
      at JSON.parse (<anonymous>)
      at Timeout._onTimeout (/app/parseJSONAsyncPromise.js:9:30)
      at listOnTimeout (internal/timers.js:554:17)
      at processTimers (internal/timers.js:497:7)
}
```

### then()
Promiseインスタンスの状態がfulfilledまたはrejectedになったときに実行するコールバックを登録する。

戻り値：変換したPromiseインスタンスを戻す。元のインスタンスは影響を受けない。

```js
promise.then(
  value => {
    // onFulfilled
  },
  err => {
    // onRejected
  }
);
```

P.67から再開。

### catch()

### finally()





## 参考

- [とほほのPromise入門](http://www.tohoho-web.com/ex/promise.html)