# Practice_Hands_on_Node.js
ハンズオンNode.jsの勉強

- [Practice_Hands_on_Node.js](#practice_hands_on_nodejs)
  - [各章リンク](#各章リンク)
  - [その他](#その他)
    - [コールバックのサンプル](#コールバックのサンプル)
- [参考](#参考)

## 各章リンク

| 章  | リンク | 備考 | 
| :-- | :-- | :-- |
| 01 | [1章 イントロダクション](./01_Introduction.md) | 終了 |
| 02 | [2章 非同期プログラミング](02_Asynchronous_programming.md) | 中断 |
| 03 | | 後でやる |
| 04 | | 後でやる |
| 05 | [5章 HTTPサーバとHTTPクライアント](./05_HTTP_Server_and_Client.md) | 終了 |
| 06 | 6章 リアルタイムWebアプリケーション | 後でやる |
| 07 | [7章 データストレージ](./07_DataStrage.md) | 後でやる |
| 08 | 8章 ユニットテストとデバッグ | 後でやる |
| 09 | 9章 デプロイ | 後でやる |
| 10 | 10章 パッケージ管理 | 後でやる |
| 11 | 11章 Node.jsとJavaScript標準 | 後でやる |
| 付録A | Node.jsのインストール | 後でやる |
| 付録B | JavaScriptとコンパイル | 後でやる |


## その他

### コールバックのサンプル

```javascript : parseJSONAsync.json
'use strict';

function parseJSONAsync(json , callback){
    setTimeout(() => {
        try {
            callback(null, JSON.parse(json));
        } catch(err) {
            callback(err);
        }
    }, 1000);
}

parseJSONAsync('{"value":"hoge"}', (err, result) => {
    console.log("コールバックで呼ばれる");
    console.log('実行結果:', err, result);
});
```

実行結果
```
コールバックで呼ばれる
実行結果: null { value: 'hoge' }
```


# 参考

- [O'Reilly Japan:ハンズオンNode.js](https://www.oreilly.co.jp/books/9784873119236/)
