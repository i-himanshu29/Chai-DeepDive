// PART-1 ---------------------------------------------------
// console.log("Start");
// function greetMe(){
//     return "Welcome";
// }

// const start = Date.now();
// while(Date.now()-start < 5000){} // just for blocking delay

// console.log("End")

// export default greetMe // default export






// PART-2 ---------------------------------------------------------

// console.log("Start");
// function greetMe(){
//     return "Welcome";
// }
// function greet(){
//     return "Welcome";
// }

// const start = Date.now();
// while(Date.now()-start < 5000){} // just for blocking delay

// console.log("End")

// export {greet,greetMe} // Named Export





// PART-3------------------------------------------------------------------
// Live Binding Concept 
// console.log("Start");
// function greetMe(){
//     return "Welcome";
// }

// const start = Date.now();
// while(Date.now()-start < 5000){} // just for blocking delay

// console.log("End")

let counter = 0;
function increment(){
    counter++;
}

export {counter , increment}


