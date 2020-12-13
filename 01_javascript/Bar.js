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