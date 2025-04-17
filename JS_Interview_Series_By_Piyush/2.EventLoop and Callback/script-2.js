console.log("Start of script 2"); //1

setTimeout(() => {
  console.log("This is from the task Queue (setTimeout)"); //3
}, 0);

console.log("End of script"); //2

// Let's know why setTimeout() executed at last

// Same created Global execution context
//  1. Memory phase
//  2. Code Phase

// In js we have 'call Stack'

// 1.Push into call stack
// 2. Call stack waits for nothing
// take the GEC and push it into call-stack and that code executed line by line

// So whatever time you have provided into setTimeout , it will executed after that.

// if we write 0 time then also it will executed after that
// 'Start of script 2' and 'End of script'

// call-stack is wait for nothing although it executed at last the reason
// is setTimeout is not a part of JS , It is a part of web Api's from web browser

// if u want to run js code then u have to push your code in call-stack

// ********************************************************************************
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
// |                    |------------|   |          |           |promise        |          |
// |                          |    |high priority   |   |-----------------|     |          |
// |                          |     -----|----------|---|  | CB|  |CB|    |     |          |
// |--------------------------|----------|          |   |-----------------|     |          |
//                            |                      ---------------------------|----------|
//                            |                 ---------------------           |
//                            |---------------- |      |CB|  |CB|    |----------|
//                add to call stack             |--------------------|
//                     event loop                 task Queue

// Event loop watches the taskqueue and if any item came into task Queue then e
//  event loop add to the call stack and after code is executed int call-stack
// will delete the call stack code

// ******************************************************************************

// Now the Question even if add time 0s then why it executed at last

// console.log("Start of script 2");

// setTimeout(() => {
//     console.log("This is from the task Queue (setTimeout)");
//   }, 0);

//   console.log("End of script");

// saara code GEC me jayega waha se first line execute hogi aur result ayega
// 'Start of script 2'.

// Now the setTimeout execute and go to the webApi and register a timer although
// timer is 0s, then imediatelly go into task-queue , Here event loop dekhta hai kuch toh aya hai task-queue
// me but wo ye bhi dekhta hai ki abhi call-stack khaali nhi hai ,
//  toh wo wait karta hai and then  console.log("End of script"); executed
// after that setTimeout execute

// that's why
// output is

// Start of script 2
//  End of Script
// This is from the task Queue (setTimeout)

// ***********************************************************************

console.log("Start of script ");//1

setTimeout(() => {
  console.log("A");//4
}, 0);
setTimeout(() => {
  console.log("B");//5
}, 0);
setTimeout(() => {
  console.log("c");//6
}, 2 * 1000);

console.log("End of script");//2
console.log("Bye Bye");//3
