// In js evrything is an object

// const p1 = {
//     fname:"Piyush",
//     lname:'Garg',
//     getFullName(){
//         return `${this.fname} ${this.lname}`;
//     },
// };

// const p2 = {
//     fname:"Piyush",
//     lname:'Garg',
//     getFullName(){
//         return `${this.fname} ${this.lname}`;
//     },
// }
// console.log(p1)
// console.log(p1.getFullName());

// The above code is good fname and lname should be updated but
// the function getFullName , it voilate the DRY principle
//  If any error occur on the above code it also seem on the below

// ************************************************************

// Thus we use inheritance 

// const p1 = {
//     fname:"Piyush",
//     lname:'Garg',
//     getFullName(){
//         return `${this.fname} ${this.lname}`;
//     },
// };

// // const p2 = Object.create(p1);
// // or 
// const p2 = {
//     __proto__:p1,
// };

// console.log("p1 is" ,p1)
// console.log("p2 is",p2);
// console.log("p2 is",p2.fname);

// p2.__proto__.fname = "Hack";
// console.log("p1 after is",p1.fname);

// ***********************************************************

// let fname = "Piyush Garg";
// let fname = new String("Piyush");
// let x = 10
// console.log('fname', fname)
// console.log('fname.__proto__', fname.__proto__);
// console.log('fname.at(2)', fname.at(2));


// const p1={
//     xp1:"I am inside p1",
// };

// const p2 = {
//     xp2:"I am insode p2",
// };

// const p3 = {
//     xp3:"I am insode p3",
// };

// Now i want to access p1 inside p2..........................
// prototypal Inheritance
const p1={
    xp1:"I am inside p1",
};

const p2 = {
    xp2:"I am insode p2",
    __proto__:p1,
};

const p3 = {
    xp3:"I am insode p3",
    __proto__:p2,
};


// class Student{
//     constructor(){
//         this.fname = "Piyush";
//     }
//     getName(){
//         return this.fname;
//     }
// }
// const s1 = new Student();


class Student{
    constructor(){
        this.fname = "Piyush";
    }
    getName(){
        return "I am inside get name";
    }
}
const s1 = new Student();

s1.__proto__.getName() // call in browser

const s2 ={__proto__:Student.prototype};


// __proto__ // object me __proto__ attach hota hai
// prototype // Base class me attach hota hai


// let s=""

// s.__proto__ = String__proto__ = Object__proto = null
// x.__proto__ = Number.__proto__ = Object = null
// v.__proto__ = Boolean

