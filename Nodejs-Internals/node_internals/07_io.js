// const fs = require("fs");

// fs.readFile(__filename,()=>{
//     console.log("readFile 1");
// })

// setTimeout(()=>console.log("setTimeout 1"),0)
// process.nextTick(()=>console.log("nextTick 1"))
// Promise.resolve().then(()=>console.log('Promise'))


// PART-2---------------------------------------
// const fs = require("fs");

// fs.readFile(__filename,()=>{
//     console.log("readFile 1");
// })

// setTimeout(()=>console.log("setTimeout 1"),0)
// process.nextTick(()=>console.log("nextTick 1"))
// Promise.resolve().then(()=>console.log('Promise'))

// // io polling
// setImmediate(()=>{
//     console.log("immediate")
//     setTimeout(()=>console.log("setTimeout 3"),0)
// })


//PART-3------------------------------------------

const fs = require("fs");

fs.readFile("sample.txt",()=>{
    console.log("readFile 1");
})

setTimeout(()=>console.log("setTimeout 1"),0)
process.nextTick(()=>console.log("nextTick 1"))
Promise.resolve().then(()=>console.log('Promise'))

// io polling
setImmediate(()=>{
    console.log("immediate")
    setTimeout(()=>console.log("setTimeout 3"),0)
})