// PART-1 Static import ------------------------------------------------------
// console.log("Start module")

// // import greet from "./module.greet.js" // static import
// import test from "./module.greet.js" // static import

// // console.log(greet);
// console.log(test);

// console.log("end module")

// // firstly module.js process the import statement (module.greet.js) 
// // that's why it firstly print all the console.log 
// // in this file and also the import statement hoist on the top


// PART-2 ----------------------------------------------------

// So their is a another concept of dynamic import




// console.log("Start module")

// import ("./module.greet.js").then((val)=>console.log(val.default))

// console.log("end module")



// So In this output their is no histing that's why console.log of module.js
// print first then afterward console.log of module.greet.js print
// import me promise hai jo ki Queue me chali jayegi aur ye 
// async hai aur jo asyncronus hota hai wo promise return kar deta hai

//output - 

// Start module
// end module
// Start
// End
// [Function: greetMe]


// PART-3 ------------------------------------------------
// // and if we add setTimeout then what change occur lets see 

// console.log("Start module")

// import ("./module.greet.js").then((val)=>console.log(val.default))
// setTimeout(()=>console.log("Timeout Called"),1000)
// console.log("end module")


// PART-4 ---------------------------------------------------
// Now the same Live Binding concept apply in module same as
// commonjs


import {counter,increment} from "./module.greet.js";
console.log("Before counter :" ,counter)//0
increment()
console.log("After counter :" ,counter)//1

//  so common.js have no live binding concept thats why vales is comming 0 and 0 becoz it create copy
//  but module.js have a live binding concept and we passes refernce that's why value is updated
//  their

