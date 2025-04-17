// Object literals - {}
// Advantages 
    // - Simple 
    // - This is not act as a blueprint(Structure same hai but the values are the different one)
    // - Agar aap ko ek object bnanana hai aur object ko baar baar copy nhi karna tlb uske jaise
    //  koi aur nhi bnanana toh use object literals


// const person = {
//     fname:'Piyush',
//     lname:'Garg',
//     contact:"9999999999",
//     getName:function(){
//         console.log('Piyush');
//     },
//     getContact() {},
// };


// console.log(person.lname)
// console.log(person.getName());

// const p2 = {
//     fname:"Himanshu",
//     lname:'Maurya',
//     contact:"9998888888",
//     getName:function(){
//         console.log('Himanshu ji');
//     },
// };
// console.log(p2.getName());


// ***********************************************************

// // Normal Function - camelCasing 
// // getAge() , addNums() , printthis()

// // Base Blue Print - Before ES6
// // Constructor function - PascalCasing
// // So In the below Person is a contructor function  joki responsible for creating more  objects 

// function Person(fname, lname,contact){
//     this.fname = fname;
//     this.lname = lname;
//     this.contact = contact;

//     this.getName = function(){
//         console.log(this.fname , this.lname)
//     }

//     this.getContact = function(){
//         console.log(this.contact);
//     };
// }

// // person object bnanaa hoga toh use new keyword
// const person1 = new Person("Piyush","Garg","99999999999")
// const p2 = new Person("Himanshu","Maurya","88888888888")
// const p3 = new Person("John","Doe","77777777777")

// console.log(person1)
// console.log(person1.lname)

// p2.getName();
// p3.getName();


// **************************************************************************

// After ES6 
// Class Keyword

class Person {
    constructor(fname,lname,contact){
        this.fname = fname;
        this.lname = lname;
        this.contact = contact;
    }
    getContact(){
        console.log(this.contact);
    }

    getName(){
        console.log(this.fname , this.lname);
    }
}

const person1 = new Person("Piyush","Garg","99999999999")
const p2 = new Person("Himanshu","Maurya","88888888888")
const p3 = new Person("John","Doe","77777777777")


person1.getName();
p2.getName();
p3.getName();