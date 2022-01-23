const lodash = require('lodash');

const data = [
    {
        id:"1",
        name:"One",
        url: "One.jpg"
    },
    {
        id:"2",
        name:"Two",
        url: "Two.jpg"
    },
    {
        id:"3",
        name:"Three",
        url: "Three.jpg"
    },
    {
        id:"4",
        name:"Four",
        url: "Four.jpg"
    },
    {
        id:"5",
        name:"Five",
        url: "Five.jpg"
    },
    {
        id:"6",
        name:"Six",
        url: "Six.jpg"
    },
    {
        id:"7",
        name:"Seven",
        url: "Seven.jpg"
    },
]

let swipedData = [
    {
        user:"a",
        id:"2",
        name:"Two",
        url: "Two.jpg"
    },
    {
        user:"a",
        id:"6",
        name:"Six",
        url: "Six.jpg"
    },
    {
        user:"a",
        id:"7",
        name:"Seven",
        url: "Seven.jpg"
    },
]
// let bb = lodash.groupBy(lodash.map(swipedData,"user"));
let bb = lodash.map(swipedData, 'id');
console.log(bb)

var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;
}

for(let id of bb){
    removeByAttr(data,'id',id)
}

// for(var i = 0; i < data.length; i++) {
//     if(bb.inclu ) {
//         data.splice(i, 1);
//         break;
//     }
// }

console.log(data)


// let swipedData = [
//     {
//         user:"a",
//         id:"2",
//         name:"Two",
//         url: "Two.jpg"
//     },
//     {
//         user:"a",
//         id:"6",
//         name:"Six",
//         url: "Six.jpg"
//     },
//     {
//         user:"a",
//         id:"7",
//         name:"Seven",
//         url: "Seven.jpg"
//     },
// ]

// let obj = swipedData[0]
