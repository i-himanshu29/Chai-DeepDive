// class TaskScheduler {
//     constructor(concurrency){
//         this.concurrency = Number(concurrency);
//         this.runningTasks = 0;
//         this.__waitingQueue = [];
//     }

//     getNextTask(){
//         if(this.runningTask < this.concurrency && this.__waitingQueue.length > 0){
//             const nextTask = this.__waitingQueue.shift()
//             nextTask();
//         }
//     }
//     addTask(task){
//         return new Promise((resolve,reject)=>{
//             async function __taskRunner(){
//                 this.runningTasks += 1;
//                 try {
//                     const result = await task()
//                     console.log(`Result`,result);
//                     resolve(result);
//                 } catch (err) {
//                     console.log(`Task Failed`,err);
//                     reject(err);
//                 }finally{
//                     this.runningTasks -= 1;
//                     // see if there is any task in queue
//                     // if so run that
//                     this.getNextTask();
//                 }
//             }
//             if(this.runningTasks < this.concurrency){
//                 __taskRunner.call(this);
//             }else{
//                 this.__waitingQueue.push(__taskRunner.bind(this));
//             }
//         });
//     }
// }

// const scheduler = new TaskScheduler(2);

// scheduler.addTask(
//     ()=>new Promise((res)=>setTimeout(()=>res('Task 1'),5*1000))
// );
// scheduler.addTask(
//     ()=>new Promise((res)=>setTimeout(()=>res('Task 2'),5*1000))
// );
// scheduler.addTask(
//     ()=>new Promise((res)=>setTimeout(()=>res('Task 3'),5*1000))
// );
// scheduler.addTask(
//     ()=>new Promise((res)=>setTimeout(()=>res('Task 4'),5*1000))
// );

// PART-2*******************************************************************
class TaskScheduler {
  constructor(concurrency) {
    this.concurrency = Number(concurrency);
    this.runningTasks = 0;
    this.__waitingQueue = [];
  }

  getNextTask() {
    if (this.runningTask < this.concurrency && this.__waitingQueue.length > 0) {
      const nextTask = this.__waitingQueue.shift();
      nextTask();
    }
  }
  addTask(task) {
    return new Promise((resolve, reject) => {
      async function __taskRunner() {
        this.runningTasks += 1;
        try {
          const result = await task();
          console.log(`Result`, result);
          resolve(result);
        } catch (err) {
          console.log(`Task Failed`, err);
          reject(err);
        } finally {
          this.runningTasks -= 1;
          // see if there is any task in queue
          // if so run that
          this.getNextTask();
        }
      }
      if (this.runningTasks < this.concurrency) {
        __taskRunner.call(this);
      } else {
        this.__waitingQueue.push(__taskRunner.bind(this));
      }
    });
  }
}

const scheduler = new TaskScheduler(2);

scheduler.addTask(
    ()=>new Promise((res)=>setTimeout(()=>res('Task 1'),5*1000))
);
scheduler.addTask(
    ()=>new Promise((res)=>setTimeout(()=>res('Task 2'),5*1000))
);
scheduler.addTask(
    ()=>new Promise((res)=>setTimeout(()=>res('Task 3'),5*1000))
);
scheduler.addTask(
    ()=>new Promise((res)=>setTimeout(()=>res('Task 4'),5*1000))
);

async function savedToDb(message) {
  return new Promise(
    (res, rej) =>
      setTimeout(() => {
        console.log(`Message ${message} saved to DB!`);
        res();
      }),
    2 * 1000
  );
}

function chat() {
  const messages = Array(100).fill(null);

  messages.forEach((_, index) => {
    const message = `Message:${index}`;
    scheduler.addTask(() => savedToDb(message));
  });
}
