# Practice_Hands_on_Node.js
ハンズオンNode.jsの勉強

- [Practice_Hands_on_Node.js](#practice_hands_on_nodejs)
- [1章 イントロダクション](#1章-イントロダクション)
  - [Dockerで起動する](#dockerで起動する)
  - [対話型インタプリタモード(REPL)](#対話型インタプリタモードrepl)
  - [JavaScriptの基本](#javascriptの基本)
    - [関数の代入](#関数の代入)
    - [アロー関数式](#アロー関数式)
    - [オブジェクト](#オブジェクト)
      - [宣言](#宣言)
      - [値の取得](#値の取得)
      - [変数の追加/削除](#変数の追加削除)
  - [参考](#参考)

# 1章 イントロダクション

## Dockerで起動する
REPLを使うために使う。
```
docker run -it node /bin/bash
```

## 対話型インタプリタモード(REPL)

```
node 
```

## JavaScriptの基本

### 関数の代入

```
> const add3 = function addFn(a, b) { return a + b }
undefined
> add3(10,5)
15
> add3.name
'addFn'
```

### アロー関数式
Javaでいうところのラムダ式。

```
> const add4 = (a, b) => { return a + b }
undefined
> add4(10,5)
15
```

### オブジェクト

#### 宣言
```
> const obj1 = { propA: 1, propB: 2 }
undefined
```

#### 値の取得
```
> obj1.propA
1
> obj1['propA']
1
```

#### 変数の追加/削除
```
> obj1.propC = 3
3
> obj1
{ propA: 1, propB: 2, propC: 3 }
> delete obj1.procC
true
> obj1
{ propA: 1, propB: 2, propC: 3 }
```
…消えないな？

## 参考

- [O'Reilly Japan:ハンズオンNode.js](https://www.oreilly.co.jp/books/9784873119236/)
