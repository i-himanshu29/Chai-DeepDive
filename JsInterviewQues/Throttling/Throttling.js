// Throttling is a technique used to limit the number of times a function can be executed in a given time frame. 
// It’s extremely useful when dealing with performance-heavy operations, such as resizing the window
//  or scrolling events, where repeated triggers can lead to performance issues.

//Story- Ek chooti si bacchi hai jise choclate bahot pasand hai
// Wo apni mamaa ke paas jaati hai aur she want a choclate
// Mamma says 3 o'clock par milegi 
// Abb wo chahe 1 o'clock par maange , 2o'clock par , chahe wo 2 baar ya 5 baar ya 10 baar maange choclate
// lekin use 3'clock par milega , hum doobara time nhi badhayenge . 

// Called throttling - INTERVIEW QUESTION/
// agar baar baar call karte jaooge toh pichli call ko remove karte jaynge
// Eg. Jaise class 9 bje hi join kar paooge  chaahe jitni baar hi join ki button daba do

let counter = 1;
function getSearchResult(){
    console.log(`Doing an api call:${counter++}`);
}

function throttle(myFn,delay){
    let permission = true;
    return function(){
        if(permission == true){
            myFn();
            permission = false;
            setTimeout(()=>{
                permission = true;
            },delay);
        }
    }
};
const optimizedGetSearchResults = throttle(getSearchResult,1000);