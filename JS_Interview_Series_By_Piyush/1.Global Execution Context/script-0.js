// PART-1**********************************
// console.log(`Value of x is ${x}`);
// var x = 10;

// How it works -------

// Global Execution Context
// - Memory Phase
// - Code Phase

// Memory Phase
// - whatever the variable is created in memory phase their initial value is undefined
//  Memory phase me value nhi aati only variable load hota hai
// i.e var x = undefined


// Code phase
// - Our code is executed line by line
//  console.log(`Value of x is ${x}`); // result is value of x is undefined

// Now in second step values updated to var x = 10
// hence the final value is => value of x is undefined

// Now the global execution context will delete


// Part-2************************************

x = 30;
console.log(`Value of x is ${x}`);
var x = 10;

// How it works -------
// Created Global Execution Context
// -i> Memory Phase
// -ii> Code Phase

// X IS THE ONLY VARIABLE HENCE LOAD it into memory phase like => x = undefined

// now code phase
//  x = 30 => this line assigned the value of x=30 in memory phase
// console.log(`Value of x is ${x}`); => it searches the value of x in 
//  memory phase that is 30 means value of x is 30

// now third line x = 10;
// it assigned the value 10 to memory phase 
// our code end here and execution context delete
// value of x is 30


//Part-3 ******************************************
x = 20;
console.log(`Value of x1 is ${x}`);//Value of x1 is 20
var x = 10;
console.log(`Value of x2 is ${x}`);//Value of x2 is 10

//HOISTING ->
// We defined varible x below the console x1 (line-54) but we will able access at the 
// above of console x1 (line-52)and also on console x1(line-53)
// that means mai uski definition se pahle hi usse access kar pa raha 
//  that's called hoisting (i.e )

// Hoisting is also done with the function as well


//  But when i write let on the place of var then it give error
x = 20;
console.log(`Value of x1 is ${x}`);//Value of x1 is 20
let x = 10;
console.log(`Value of x2 is ${x}`);//Value of x2 is 10

// Error: Cannnot access x before initalization

// Interviewer ask: 
// var = Hoist ? Yes 
// let = Hoist ? No
// const = Hoist ? No // as per above concept

// But the actual ans is Yes
// var = Hoist ? Yes 

// let = Hoist ? Yes
// const = Hoist ? Yes
// So why error comming? becoz of Temporal Dead Zone (TDZ)


// let say this zone is dead zone 
// means agar app dead zone ke andar x ko access karne ka try karoge 
// toh mai apko error dunga

// |---------------------------------------------|
// |x = 20;                                      |
// |console.log(`Value of x1 is ${x}`);          |
// |---------------------------------------------|

// let x = 10;
// console.log(`Value of x2 is ${x}`);

// means x ko memory phase me lega as => x = undefined
// but code phase me jab value assign karoge toh error dega
// Cannnot access x before initalization
//  means dead zone ke andar x ko access nhi kar sakte

// From google ...
// The Temporal Dead Zone (TDZ) in JavaScript is a period of time, 
// starting when a block of code is entered and ending when the
//  variable is declared and initialized, where variables declared 
//  with let and const are not accessible. If you try to access a variable within its TDZ, 


// Now we can say that let and const are Hoist but we cannot access becoz of TDZ 