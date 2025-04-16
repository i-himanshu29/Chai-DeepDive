FileSystem.readFile(__filename,()=>{
    console.log("readFile 1")
})
setTimeout(()=>console.log("Timeout called 1"),0)
console.log('log')