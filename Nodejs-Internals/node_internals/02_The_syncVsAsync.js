import crypto from 'crypto'

// const calls = 1;
const calls = 4;

//sync
const startTime = Date.now();
//run one by one to check changes
// crypto.pbkdf2Sync("password","salt",100000,512,"sha512")
// crypto.pbkdf2Sync("password","salt",100000,512,"sha512")
// crypto.pbkdf2Sync("password","salt",100000,512,"sha512")
// crypto.pbkdf2Sync("password","salt",100000,512,"sha512")
console.log(`MainThread:`,Date.now()-startTime)

// or 

// async 
setTimeout(()=>console.log("Timeout called",0))
for(let i=0;i<calls;i++){
    crypto.pbkdf2("password","salt",100000,512,"sha512",()=>{
        console.log(`ThreadPool:${i+1}`,Date.now()-startTime);
    })
}