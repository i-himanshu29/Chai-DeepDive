// this -> Current context

// Strict mode and non-script mode

"use strict";
// - when you are using use strict then you must have to give datatype to your variable
// let a = 5; 


// - without use strict you are free to not use datatype
// a = 5 

// "this" behave differently in strict mode and non-strict mode

// If you are using "use strict " and you are define a this keyword in a function then
// this give undefined while using "use strict" otherwise give window object


// If the value of this keyword is undefined or null , this keyword will be replace with
//global Object(only in non-strict mode).




// "use strict";

// this -> Current context
// this in global space
console.log("this:",this); // global object
// depend on where you are running tis keyword - if browser then give window object and if environment - empty object ayega

const human = {
    name:"Himanshu",
    age:"24",
    designation:"SDE",
    startWorking:function(){
        console.log(this);
        console.log(`Hello ${this.name}, you are currently a ${this.designation}`);

    },
};

human.startWorking();

// this inside a function******************************************

function demo(){
    //non-strict mode => global object-  window object
    // strict mode => undefined
    console.log("demo this",this); // undefined while using "use strict" otherwise give window object
}

demo();

// this value depends on how this is called
// use "use strict";
demo();
window.demo();//window ne demo call kiya means refernce

// this inside a object method*******************************************************
const anObject = {
    key1:"sample",
    key2:function(){
        console.log("anObject this " ,this); // global object
        console.log(this.key1); // sample
    },
};

anObject.key2();

// call apply Bind methods (sharing methods)*****************************************


// this inside arrow function****************************************************

// function sumOfTwoNums(x,y){
//  return x+y;
// }
// sumOfTwoNums(4,3)


// const sumOfTwoNums = (x,y)=>{
//  return x+y;
// }
// console.log(sumOfTwoNums(4,3))

//In arrow function we can use this becoz of enclosing lexical environment and if parent environment 
//  not present then it automatically use this outside the arrow fn.
console.log(this) // automatically came
const sumOfTwoNums = (x,y)=>{
    console.log(this)//enclosing lexical environment
    return x+y;
}
console.log(sumOfTwoNums(4,3))




// this inside nested arrow function*************************************************

function ajjeb(){
    // console.log(this) 
    const demo = ()=>{
        console.log(this)//enclosing lexical environment
    };
    demo();
}
ajjeb();


// this inside DOM**********************************************
//  Button wala eg.


//constructor *****************************************

class ChaiCode{
    constructor(){
        console.log(this)
    }
}


const obj= new ChaiCode();
