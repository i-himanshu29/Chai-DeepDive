console.log("Start of script 3")//1

setTimeout(()=>{
    console.log("This is from the Task Queue(set Timeout)")//4
},0);

Promise.resolve().then(()=>{
    console.log("This id from the Microtask Queue(Promise)")//3
});

console.log("End of Script");//2

//Because- Promise have the higher priority from setTimeout

// javascript->
            // Synchronus
            // Single Threaded   
                                    // Default 

// Execution context
            // -execute one line of code at a time 
            // -each operation waits for the last one to complete before executing


// Blocking code  vs  Non Blocking Code 
//  Blocking code and Non Blocking Code depends on usecases
//Blocking code-
// block the flow of program 
// Read File Sync 

//Non Blocking Code -
// Does not block execution
// Read File Async 

//                                       EVENT LOOP
// 
// |-------------------------------------|                            WEB API
// |                                     |          |--------------------------------------|
// |     MEMORY HEAP    | CALL STACK |   |          |   DOM API                            |
// |     |---------|    |------------|   |          |  SET TIMEOUT------------|            |
// |     |         |    |    fn      |   |          | SET INTERVAL      register call back |
// |     |---------|    |      fn    |   |          |  fetch()--                |          |
// |                    | global     |   |          |           |               |          |
// |                    |------------|   |          |micro-taskQ|promise        |          |
// |                          |    |high priority   |   |-----------------|     |          |
// |                          |     -----|----------|---|  | CB|  |CB|    |     |          |
// |--------------------------|----------|          |   |-----------------|     |          |
//                            |                      ---------------------------|----------|
//                            |                 ---------------------           |          
//                            |---------------- |      |CB|  |CB|    |----------|         
//                add to call stack             |--------------------|
//                   event loop                       task Queue

// ****************************************************************************************************************

//  First execute 'Start of script 3'
// then after setTimeout go to webApi with timer and it execute imediatelly 
// and  go into task-queue where event loop see something is their but it will not execute it 
// because abhi call-stack khaali nhi hai
//  Now we know promises are also work as async and it is also a part
//  of webApi and Promise have higher priority and resolve on the spot means fullfilled and 
// Promise code is not go into task-queue it go into micro-task-queue whic has higher priorty 
// from task-queue and 
// Now 'End of Script' executed then Promise from micro-task-queue and setTimeout from task-queue


// **********************************************************************************************************

//STARVATION ----
// Jab ek promise resolve hota hai toh wo dusre ko micro-task-queue me daal deta hai
// isse microtask queue khaali hi nhi hogi toh agar koi cheej tas-queue me padi hai toh wo
// foreever wait karti rahegi is process ko Starvation bolte hai


// Now imagine this , if micro tasks keep popping up without allowing other
// tasks a chance to run , what happens next? Well , in this scenario , the callback Queue won,t
// get an opportunity to execute its tasks . This situation is what we call the starvation of
// tasks in the callback queue.

console.log("Start of script 3")//1

setTimeout(()=>{
    console.log("This is from the Task Queue(set Timeout)")//4
},0);

Promise.resolve().then(()=>{
    console.log("This id from the Microtask Queue1(Promise)")//3
    Promise.resolve().then(()=>{
        Promise.resolve().then(()=>{
            Promise.resolve().then(()=>{
                Promise.resolve().then(()=>{
        
                })
            })
        })
    })
});
Promise.resolve().then(()=>{
    console.log("This id from the Microtask Queue2(Promise)")//3
});
Promise.resolve().then(()=>{
    console.log("This id from the Microtask Queue3(Promise)")//3
});
Promise.resolve().then(()=>{
    console.log("This id from the Microtask Queue4(Promise)")//3
});

console.log("End of Script");//2