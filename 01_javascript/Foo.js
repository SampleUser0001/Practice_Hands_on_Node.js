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