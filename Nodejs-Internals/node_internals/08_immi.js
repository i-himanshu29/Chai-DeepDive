// const fs = require("fs");

// fs.readFile(__filename,()=>{
//     console.log("readFile 1");
//     setImmediate(()=>console.log('Immediate 1'))
// })

// setTimeout(()=>console.log("setTimeout 1"),0);


// setImmediate(()=>{
//     console.log('Immediate 2')
// })

// PART-2--------------------------------------

const fs = require("fs");

fs.readFile(__filename,()=>{
    console.log("readFile 1");
    setImmediate(()=>console.log('Immediate 1'))
})

setTimeout(()=>console.log("setTimeout 1"),0);

process.nextTick(()=>console.log("nextTick 1"))
Promise.resolve().then(()=>console.log('Promise'))
setTimeout(()=>console.log('setTimeout 2'),0)

setImmediate(()=>{
    console.log('Immediate 2')
})


// PART-3---------------------------------------------
const fs = require("fs");

fs.readFile(__filename,()=>{
    console.log("readFile 1");
    setImmediate(()=>console.log('Immediate 1'))
})

setTimeout(()=>console.log("setTimeout 1"),2000);


setImmediate(()=>{
    console.log('Immediate 2')
})