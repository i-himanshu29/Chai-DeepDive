const fs = require('fs')

console.log("one")

fs.readFile(__filename,()=>{
    console.log('Two')
})

console.log('Three')