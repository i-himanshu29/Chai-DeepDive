console.log("Global Execurion starts");

var globalVariable = "I am a global variable";

function globalFunction(){
    console.log("Inside global function")
}

console.log(globalVariable);
globalFunction();

console.log("Global Execution Context ends");


// Work like that----------------
// Global Execution Context
// 1.Memory Phase
// 2.Code Phase

// In memory phase - stores all the variable and function
// variable initally undefined but the function loaded with all body in memory phase
// Hence we have in memory phase:
// globalVariable = undefined
// globalFunction(){
//     console.log("Inside global function")
// }

// Now in Code Phase => code executed line by line
// 1st. console.log("Global Execurion starts");
// 2nd. assigned the value to the global variable means
// globalVariable = I am a global variable
// 3rd. Console.log(globalVariable) which printed => I am a  global variable
// 4th. function call means globalFunction(); => Now ab fir se ek local context bnega for this fn call

// that means local context have two things -> memory phase and code phase
//i.e
// function globalFunction(){
//     console.log("Inside global function")
// }

//  now function have not any local variable that means memory phase khaali rahega
// and i code phase =>  console.log("Inside global function")//Inside global function

// now local context delete ho jayega
//  and came to global execution context
// console.log("Global Execution Context ends");//Global Execution Context ends


//Part-2******************************************************************


// console.log("Global Execurion starts");

// var globalVariable = "I am a global variable";


// console.log(globalVariable);
// globalFunction();

// console.log("Global Execution Context ends");

// function globalFunction(){
//     console.log("Inside global function")
// }

// it give same result becoz memory phase me funstion ke saath whole body load hoti hai

//Part-3****************************************************************************************



console.log("Global Execurion starts");

var globalVariable = "I am a global variable";


console.log(globalVariable);
globalFunction();

console.log("Global Execution Context ends");

var globalFunction = function(){
    console.log("Inside global function")
}

// Now it give error becoz hamne variable me function ko store kar liya hai jo
// ki intially undefined hogi in memory phase


//THE ABOVE CONCEPT IS KNOWN AS THE -> HOISTING 