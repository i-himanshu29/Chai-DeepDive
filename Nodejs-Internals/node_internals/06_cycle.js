console.log("console 1");
Promise.resolve().then(()=>console.log('promise'))
process.nextTick(()=>console.log("process.nextTick 1"));
console.log("console 2");

Promise.resolve().then(()=>{
    console.log("Promise.resolve 1")
    process.nextTick(()=>console.log("inside promise process.nextTick"))
});
process.nextTick(()=>{
    console.log("process.nextTick 2")
    Promise.resolve().then(()=>console.log('Promise inside nextTick 2'))
})