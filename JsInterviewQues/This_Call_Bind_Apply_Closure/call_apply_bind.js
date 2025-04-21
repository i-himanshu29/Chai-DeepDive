//1. Call method is used to call the function with the given this value and argument
// can be passed individually

// 2. Apply method is similar to call method , the only difference is that 
// instead of passing argument individually , will pass the argument in a list/array

// 3.Bind method is simiar to calll method. It is also used to override this value , but the difference is it will not invoke
//  the function instantly but return a function with attached this and
// argumnet which can be called later.

//call apply bind => methods
// you know na function so when you use that function in the object then 
//  this is called method


//From Hitesh Sir
// 1.Call - Immediatelly invoked fn with specified "this"
// 2.Apply - Same as call but args passes as an "Array"
// 3.Bind - Returns a "new function" when called had it's "this" value
// set to provided value

//function
function startWorking(){
    console.log(this);
    console.log(`Hello ${this.name}, you are currently a ${this.designation}`);
}


//methods
// const human = {
//     name:"Himanshu",
//     age:"24",
//     designation:"SDE",
//     startWorking:function(){
//         console.log(this);
//         console.log(`Hello ${this.name}, you are currently a ${this.designation} at the ${this.age}`);

//     },
// };
// // human.startWorking()
// const person2 ={
//     firstName:"Nil",
//     age:"22",
//     designation:"SWE"
// };

// // person2.startWorking()

// // console.log(human.startWorking)
// // human.startWorking.call()
// human.startWorking.call(person2)//call change the context

// ************************************************************************
// Now if we pass some parameter in function then see it beaviour

const human = {
    name:"Himanshu",
    age:"24",
    designation:"SDE",
    startWorking:function(state,country){
        console.log(this);
        console.log(`Hello ${this.name}, you are currently a ${this.designation} at the ${this.age} - ${state}  - ${country}`);

    },
};
human.startWorking("chai code")
const person2 ={
    firstName:"Nil",
    age:"22",
    designation:"SWE"
};

human.startWorking.call(person2,"Uttar Pradesh", "India")//passing argument


// Apply********************************************************************************************

// const person = {
//     name:"Himanshu",
//     lastName:"Maurya",
//     profession:"Software developer",
//     printFullName:function(state,country){
//         console.log(this);
//         console.log(`Hello ${this.name} ${this.lastName} doing ${this.profession} - ${state} , ${country}`);

//     },
// };
// person.printFullName("chai code")
// const person1 ={
//     name:"Adi",
//     lastName:"Kumar",
//     profession:"AI Engineer",
// };

// // person.printFullName.call(person1,"Uttar Pradesh", "India")//passing argument
// person.printFullName.apply(person1,["Uttar Pradesh", "India"])//changing context and take argument in array form

//*************************************************************************************

// Bind 

const person = {
    name:"Himanshu",
    lastName:"Maurya",
    profession:"Software developer",
    printFullName:function(state,country){
        console.log(this);
        console.log(`Hello ${this.name} ${this.lastName} doing ${this.profession} - ${state} , ${country}`);

    },
};
person.printFullName("chai code")
const person1 ={
    name:"Adi",
    lastName:"Kumar",
    profession:"AI Engineer",
};

// person.printFullName.call(person1,"Uttar Pradesh", "India")//passing argument
// person.printFullName.apply(person1,["Uttar Pradesh", "India"])//changing context and take argument in array form
const result = person.printFullName.bind(person1,"Uttar Pradesh", "India")//changing context and give me new function and i will call when i needed
result();
