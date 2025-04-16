// require module
// const fs = require("fs")

// console.log("Start commonjs")
// const greetMe = require("./common.greet.js");

// console.log(greetMe)

// console.log("end commonjs")


// PART-2-------- ---------------------------------
// Live binding 

const {counter,increment} = require("./common.greet.js");
console.log("Before counter :" ,counter)
increment()
console.log("After counter :" ,counter) // creates copy


