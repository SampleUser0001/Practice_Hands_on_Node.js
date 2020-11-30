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
        - [スプレッド構文による追加（オブジェクト）](#スプレッド構文による追加オブジェクト)
        - [レスト構文による削除（オブジェクト）](#レスト構文による削除オブジェクト)
        - [変数名をオブジェクトの値から生成する](#変数名をオブジェクトの値から生成する)
      - [getter,setterを使う](#gettersetterを使う)
      - [Objectクラスでアクセスする](#objectクラスでアクセスする)
    - [配列（定義, length, indexOf, includes, join）](#配列定義-length-indexof-includes-join)
      - [push,pop,unshift,shift](#pushpopunshiftshift)
      - [スプレッド構文による追加（配列）](#スプレッド構文による追加配列)
      - [レスト構文による削除（配列）](#レスト構文による削除配列)
  - [参考](#参考)

# 1章 イントロダクション

## Dockerで起動する
REPLを使うために使う。
```sh
docker run -it node /bin/bash
```

## 対話型インタプリタモード(REPL)

```
node 
```

## JavaScriptの基本

### 関数の代入

```javascript
> const add3 = function addFn(a, b) { return a + b }
undefined
> add3(10,5)
15
> add3.name
'addFn'
```

### アロー関数式
Javaでいうところのラムダ式。

```javascript
> const add4 = (a, b) => { return a + b }
undefined
> add4(10,5)
15
```

### オブジェクト

#### 宣言
```javascript
> const obj1 = { propA: 1, propB: 2 }
undefined
```

#### 値の取得
```javascript
> obj1.propA
1
> obj1['propA']
1
```

#### 変数の追加/削除
```javascript
> obj1.propC = 3
3
> obj1
{ propA: 1, propB: 2, propC: 3 }
> delete obj1.propC
true
> obj1
{ propA: 1, propB: 2 }
```

##### スプレッド構文による追加（オブジェクト）
もとのオブジェクトに影響が出ないように変数の追加、削除を行う。  
```javascript
> const obj2 = { ...obj1, propC: 3 } 
undefined
> obj1
{ propA: 1, propB: 2 }
> obj2
{ propA: 1, propB: 2, propC: 3 }
```

##### レスト構文による削除（オブジェクト）
```javascript
>  const { propA, ...obj3 } = obj2 
undefined
> obj2
{ propA: 1, propB: 2, propC: 3 }
> obj3
{ propB: 2, propC: 3 }
```

##### 変数名をオブジェクトの値から生成する

```javascript
>  const obj4 = { propB: 'b', propD: 'd' } 
undefined
>  { ...obj2, [obj4.propB + obj2.propC]: 'abc', ...obj4, propA: true } 
{ propA: true, propB: 'b', propC: 3, b3: 'abc', propD: 'd' }
> obj2
{ propA: 1, propB: 2, propC: 3 }
> obj4.propB
'b'
> obj2.propC
3
> 
```
プロパティが重複する場合、あと優先。

#### getter,setterを使う

定義
```javascript
> .editor
// Entering editor mode (Ctrl+D to finish, Ctrl+C to cancel)
const price = {
 value: 100,
 get withTax() {
 // 同じオブジェクトのプロパティはthisから参照可能（this.value）
 // Math.floor()は数値の小数点を切り捨てる
 return Math.floor(this.value * 1.1)
 },
 set withTax(withTax) {
 // Math.ceil()は数値の小数点を切り上げる
 this.value = Math.ceil(withTax / 1.1)
 }
} 
```

使用例
```javascript
> price.withTax
110
> price.withTax = 333
333
> price.withTax
333
> price
{ value: 303, withTax: [Getter/Setter] }
```

#### Objectクラスでアクセスする

```javascript
> obj2
{ propA: 1, propB: 2, propC: 3 }
> Object.keys(obj2)
[ 'propA', 'propB', 'propC' ]
> Object.value(obj2)
Uncaught TypeError: Object.value is not a function
> Object.values(obj2)
[ 1, 2, 3 ]
> Object.entries(obj2)
[ [ 'propA', 1 ], [ 'propB', 2 ], [ 'propC', 3 ] ]
> 
```

### 配列（定義, length, indexOf, includes, join）

```javascript
> const arr1 = ['foo', 'bar'] 
undefined
> arr1
[ 'foo', 'bar' ]
> arr1.length
2
> arr1[1]
'bar'
> arr1.indexOf(bar)
Uncaught ReferenceError: bar is not defined
> arr1.indexOf('bar')
1
> arr1.indexOf('hgoge')
-1
> arr1.includes('bar')
true
> arr1.includes('hoge')
false
> arr1.join('-')
'foo-bar'
> arr1.join()
'foo,bar'
```

#### push,pop,unshift,shift

- push
  - 配列の末尾に追加する
- pop
  - 配列の末尾から取得し、配列から削除する。
- unshift
  - 配列の先頭に追加する
- shift
  - 配列の先頭から取得し、配列削除する。

```javascript
> arr1.push('hoge')
3
> arr1
[ 'foo', 'bar', 'hoge' ]
> arr1.push('piyo','fuga')
5
> arr1
[ 'foo', 'bar', 'hoge', 'piyo', 'fuga' ]
> arr1.pop()
'fuga'
> arr1
[ 'foo', 'bar', 'hoge', 'piyo' ]
> arr1.unshift('pepepe')
5
> arr1
[ 'pepepe', 'foo', 'bar', 'hoge', 'piyo' ]
> arr.unshift('pupupu','popopo')
Uncaught ReferenceError: arr is not defined
> arr1.unshift('pupupu','popopo')
7
> arr1
[
  'pupupu', 'popopo',
  'pepepe', 'foo',
  'bar',    'hoge',
  'piyo'
]
> arr1.shift()
'pupupu'
> arr1
[ 'popopo', 'pepepe', 'foo', 'bar', 'hoge', 'piyo' ]
> 
```

#### スプレッド構文による追加（配列）

```javascript
> const arr2 = ['foo', 'bar', 'baz'] 
undefined
>  const arr3 = ['a', ...arr2, 'b', 'c'] 
undefined
> arr2
[ 'foo', 'bar', 'baz' ]
> arr3
[ 'a', 'foo', 'bar', 'baz', 'b', 'c' ]
> 
```

#### レスト構文による削除（配列）

P.22から再開する

## 参考

- [O'Reilly Japan:ハンズオンNode.js](https://www.oreilly.co.jp/books/9784873119236/)
