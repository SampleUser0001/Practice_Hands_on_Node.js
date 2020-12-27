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

```js:not_found_dir.js
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

## コールバックの規約

- コールバックはパラメータの最後に書く
- コールバックの引数は…
  - 第1引数：処理中に発生したエラー
  - 第2引数：処理結果
  
## エラーハンドリング

P.49から再開