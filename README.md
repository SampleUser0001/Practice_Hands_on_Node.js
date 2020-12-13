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
      - [sliceメソッド](#sliceメソッド)
      - [sortメソッド](#sortメソッド)
      - [for文](#for文)
      - [for...of文](#forof文)
      - [コールバック関数](#コールバック関数)
    - [クラス](#クラス)
      - [クラス宣言](#クラス宣言)
      - [コンストラクタ呼び出し](#コンストラクタ呼び出し)
      - [継承](#継承)
      - [継承クラスのコンストラクタ呼び出し](#継承クラスのコンストラクタ呼び出し)
      - [オーバーライドメソッドの呼び出し](#オーバーライドメソッドの呼び出し)
      - [プロトタイプチェーン](#プロトタイプチェーン)
        - [継承関係がある場合](#継承関係がある場合)
      - [Javaと異なる点](#javaと異なる点)
    - [等価性](#等価性)
  - [CommonJSとESモジュール](#commonjsとesモジュール)
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

```javascript
>  const arr2 = ['foo', 'bar', 'baz'] 
undefined
> arr2
[ 'foo', 'bar', 'baz' ]
> const[head1, head2, ...arr4] = arr2 
undefined
> arr4
[ 'baz' ]
> arr2
[ 'foo', 'bar', 'baz' ]
```

#### sliceメソッド
もとの変数に影響がない = イミュータブル
```javascript
> arr2
[ 'foo', 'bar', 'baz' ]
> arr2.slice(0,2)
[ 'foo', 'bar' ]
> arr2.slice(0,-1)
[ 'foo', 'bar' ]
> arr2.slice(1,-1)
[ 'bar' ]
> arr2.slice(2,-1)
[]
> arr2.slice(2,-1)
[]
> arr2.slice(0,-1)
[ 'foo', 'bar' ]
> arr2.slice(0,-2)
[ 'foo' ]
> arr2.slice(2)
[ 'baz' ]
> arr2.slice(1)
[ 'bar', 'baz' ]
> arr2.slice()
[ 'foo', 'bar', 'baz' ]
> arr2
[ 'foo', 'bar', 'baz' ]
```

#### sortメソッド
もとの変数に影響がある = ミュータブル

```javascript
> arr2
[ 'foo', 'bar', 'baz' ]
> arr2.sort
[Function: sort]
> arr2.sort()
[ 'bar', 'baz', 'foo' ]
> arr2
[ 'bar', 'baz', 'foo' ]
> arr3
Uncaught ReferenceError: arr3 is not defined
> const arr3 = ['a', ...arr2, 'b', 'c'] 
undefined
> arr3
[ 'a', 'bar', 'baz', 'foo', 'b', 'c' ]
> arr3.sort((a,b) => a.length - b.length)
[ 'a', 'b', 'c', 'bar', 'baz', 'foo' ]
> arr3
[ 'a', 'b', 'c', 'bar', 'baz', 'foo' ]
> 
```

#### for文

```javascript
> for (let i=0; i<arr2.length; i++) { console.log(arr2[i]) }
bar
baz
foo
undefined
> 
```

#### for...of文

```javascript
> for (const e of arr2) { console.log(e) }
bar
baz
foo
undefined
```

#### コールバック関数

```javascript
> arr2.forEach(console.log)
foo 0 [ 'foo', 'bar', 'baz' ]
bar 1 [ 'foo', 'bar', 'baz' ]
baz 2 [ 'foo', 'bar', 'baz' ]
undefined
```
```javascript
> arr2.map(e => e+e)
[ 'foofoo', 'barbar', 'bazbaz' ]
```
```javascript
> arr2.filter(e=>e.startsWith('b'))
[ 'bar', 'baz' ]
```
```javascript
> arr2.find(e => e.startsWith('b'))
'bar'
```

```javascript
> arr2.sort()
[ 'bar', 'baz', 'foo' ]
> arr2
[ 'bar', 'baz', 'foo' ]
> .editor
// Entering editor mode (Ctrl+D to finish, Ctrl+C to cancel)
arr2.find( e => {
  console.log(e)
  return e.endsWith('z')
})

bar
baz
'baz'
```

### クラス

#### クラス宣言

```javascript
class Foo {
    // private
    #privateField = 1

    // public
    publicField = 2

    // static private
    static #staticPrivateField = 3

    // static public
    static staticPublicField = 4

    // コンストラクタ
    constructor(parameter) {
        this.filedInitializedInConstructor = parameter
        console.log('Foo constructor')
    }

    // private getter
    get #computed(){
        return this.publicField * 2
    }

    // public getter
    get computed() {
        return this.#computed
    }

    // private setter
    set #computed(value){
        this.publicField = value / 2
    }

    // public setter
    set computed(value) {
        this.#computed = value
    }

    // private Method
    #privateMethod() {
        return this.#privateField
    }

    // public Method
    publicMethod() {
        return this.#privateField
    }

    // static private Method
    static #staticPrivateMethod() {
        return this.#privateField
    }

    static staticPublicMethod() {
        return this.#staticPrivateField
    }
}
```

#### コンストラクタ呼び出し

```javascript
> const fooInstance = new Foo(100)
Foo constructor
undefined
```

#### 継承

```javascript
class Bar extends Foo {
    constructor(parameter) {
        super(parameter)
        this.subClassPublicField = 100
        console.log('Bar constructor')
    }

    // override
    publicMethod() {
        return super.publicMethod() * this.subClassPublicField
    }
}
```

#### 継承クラスのコンストラクタ呼び出し

```javascript
> const barInstance = new Bar(100)
Foo constructor
Bar constructor
undefined
```

#### オーバーライドメソッドの呼び出し

```javascript
// こっちはsuperクラス
> fooInstance.publicMethod()
1
// こっちはsubクラス
> barInstance.publicMethod()
100
```

#### プロトタイプチェーン

クラス宣言のうち、コンストラクタ、(public?)メソッド、getter,setterがprototypeに追加される。  
インスタンス生成時にprototypeから、__proto__変数に代入される。

```javascript
> Foo.prototype
{}
> Object.getOwnPropertyNames(Foo.prototype)
[ 'constructor', 'computed', 'publicMethod' ]
> Foo.prototype.publicMethod
[Function: publicMethod]
> fooInstance.__proto__ === Foo.prototype
true
```

instanceofはインスタンスの__proto__変数とクラスのprototype変数を比較する。  
元のクラスから生成したものでなくても、__proto__自体を書き換えるとtrueと判定される。

```javascript
> fooInstance instanceof Foo
true
> const plainObject = {}
undefined
> plainObject.__proto__ = Foo.prototype
{}
> plainObject instanceof Foo
true
```

##### 継承関係がある場合

ここまではまあいい…
```javascript
> barInstance instanceof Foo
true
> barInstance.__proto__ === Bar.prototype
true
```

subクラスでは2つしか定義していないので、「getOwnPropertyNames（所有者？）」ではこの2つしか出ない。
```javascript
> Object.getOwnPropertyNames(Bar.prototype)
[ 'constructor', 'publicMethod' ]
```

__プロトタイプチェーンたる理由__
```javascript
> barInstance.__proto__ === Foo.prototype
false
> barInstance.__proto__.__proto__ === Foo.prototype
true
```

すべての親はObjectクラス
```javascript
> fooInstance.__proto__.__proto__ === Object.prototype
true
> barInstance.__proto__.__proto__.__proto__ === Object.prototype
true
```

#### Javaと異なる点

1. staticメソッドはインスタンスから呼べない。
2. subクラスでpublicメソッドを呼ぶとき、中にsuperクラスのprivateメソッドがあるとエラーになる。

### 等価性

「==」と「===」がある。

0と空文字
```javascript
> 0 == ''
true
> 0 === ''
false
```

別に生成したオブジェクトの比較はfalseになる。
```javascript
> { foo: 1 } === { foo: 1 }
false
> { foo: 1 } == { foo: 1 }
false
```

オブジェクトを代入して生成した場合はtrueになる。
```javascript
> const obj5 = { foo: 1}
undefined
> const obj6 = obj5
undefined
> obj5 === obj6
true
```

## CommonJSとESモジュール

…というものがある。

P.32から再開。


# 参考

- [O'Reilly Japan:ハンズオンNode.js](https://www.oreilly.co.jp/books/9784873119236/)
