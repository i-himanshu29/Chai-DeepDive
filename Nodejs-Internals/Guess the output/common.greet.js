// console.log("Start");

// exports.greet = "welcome"
// module.exports
// console.log(module.exports===exports)//true





// PART-2-------------------------------------
// console.log("Start");
// function greetMe(){
//     return "Welcome";
// }

// const start = Date.now();
// while(Date.now()-start < 5000){} // just for blocking delay

// console.log("End")

// module.exports = greetMe





//PART -3 ---------------------------------------------------
// Live Binding 


// console.log("Start");
// function greetMe(){
//     return "Welcome";
// }

// const start = Date.now();
// while(Date.now()-start < 5000){} // just for blocking delay

// console.log("End")

// let counter = 0;
// function increment(){
//     counter++;
// }

// module.exports = {counter,increment}






//PART-4....................................................

// now tell me output 


// console.log(module.exports === exports);//true
// exports.greet = "Welcome";
// console.log(module.exports === exports);//true


console.log(module.exports === exports);//true
console.log("before export",module.exports)
console.log("before export :",exports)
exports = "Welcome";
console.log(module.exports === exports);//false
console.log("After export",module.exports)
console.log("After export :",exports)