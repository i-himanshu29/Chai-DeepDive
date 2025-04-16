// setTimeout(()=>console.log("setTimeout 1"),0);
// setImmediate(()=>{console.log('Immediate 1')})


//PART-2--------------------------------------
setTimeout(()=>console.log("setTimeout 1"),0);// internally 1ms kar deta hai
setImmediate(()=>{console.log('Immediate 1')})
for(let i=0;i<2000000;i++){}