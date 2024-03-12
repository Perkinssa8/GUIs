// java is a prototype-based language
function MyClass (){
    this.myNumber = myNumber;
    console.log("i got called!");
}

MyClass.prototype.myMethod = function(){
    console.log(`myNumber is ${this.myNumber}`);
}

setTimeout(instance.myMethod)

//create instance of classe
const instance = new MyClass(10);

// how 'this' keyword works and can be modified to pass an object 
// setTimeout(instance.myMethod, 2000); doesn't work
setTimeout(instance.myMethod.bind(instance), 2000); //works
// or
setTimeout(() => instance.myMethod(), 2000); //works

const instance2 = new MyClass(20);
instance.otherNewMethod = function(){
    console.log("Instance specific method");
}

MyClass.prototype.newMethod = function(){
    console.log("new method");
}
const instance3 = new MyClass(30); //can change the behavior of a class after it was created