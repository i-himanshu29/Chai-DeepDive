// Debounce & Throttling is used to optimized the performance of web app.
// They are used to limit the rate at which the function are called(executed)

// Debouncing --
// It is a programming technique used to limit the rate at which a function is
// executed. It ensures that a function (like a APi call or event handler)
// is only invoked after a specific period of inactivity.

// Why use Debouncing---
// Prevent execssive funcion calls(e.g., API requests on every keystrokes).
// Optimizes performance by reducing unncessary computation.
// Commly used in search bars , input fields , resize eventa , etc.
// Debounce

// Story--
//- Ek chooti si bacchi hai jise choclate bahot pasand hai
// Wo apni mamaa ke paas jaati hai aur she want a choclate
// Mamma says 5min wait karo fir milegi
// Abhi 3 min hi hue the aur uss chooti bacchi ne doobara se choclate maanga
// toh fir uski counting doobara se start ho jayegi
// usko choclate tab milegi jab 5min over ho jayega aur wo beech me disturb nhi karegi
// Called Debounce - INTERVIEW QUESTION/
// agar baar baar call karte jaooge toh pichli call ko remove karte jaynge

// let counter = 1;
// function getSearchResult(){
//     console.log(`Doing a Api call: ${counter++}`);
// }

// function jaadoKarlo(myFn,delay){
//     let timerId;
//     return function(){
//         clearTimeout(timerId);
//         timerId = setTimeout(()=>{
//             myFn();
//         },delay);
//     };
// }

// const optimizedGetSerachResults = jaadoKarlo(getSearchResult,1000);
// **************************************************************

let counter = 1;
function getSearchResult() {
  console.log(`Doing a Api call: ${counter++}`);
}

function debounce(myFn, delay) {
  let timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      myFn();
    }, delay);
  };
}

const optimizedGetSerachResults = debounce(getSearchResult, 1000);
