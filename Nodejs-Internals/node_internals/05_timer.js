// setTimeout(()=>console.log("Timeut Called 1"),0)

// setTimeout(()=>{
//     console.log("Timeout Called 2")
//     // process.nextTick(()=>{
//     //     console.log('this is inside next tick')
//     // })
// },0)
// // setTimeout(()=>console.log("Timeout Called 3"),0)

// console.log("console 1");
// Promise.resolve().then(()=>console.log('promise'))
// process.nextTick(()=>console.log("process.nextTick 1"));
// console.log("console 2");


// PART-2-----------------------------------------------------

setTimeout(()=>console.log("Timeout Called 1"),0)

setTimeout(()=>{
    console.log("Timeout Called 2")
    process.nextTick(()=>{
        console.log('this is inside next tick')
    })
},0)
setTimeout(()=>console.log("Timeout Called 3"),0)

console.log("console 1");
Promise.resolve().then(()=>console.log('promise'))
process.nextTick(()=>console.log("process.nextTick 1"));
console.log("console 2");
