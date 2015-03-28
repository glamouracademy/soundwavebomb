var howOften = 2; //number often in seconds to rotate
var current = 0; //start the counter at 0
var ns6 = document.getElementById&&!document.all; //detect netscape 6

// place your images, text, etc in the array elements here
var items = new Array();
    items=[
        "Sticks and stones may break my bones but now your words can hurt me",
        "If a 2D picture is worth one thousand words then a 3D picture has got to be worth like way more.  Maybe like a million words?",
        "Put your money where your mouth is",
        "Give your friend a fart",
        "THE ONLY physical manifestation of sound",
        "Helping millions still not be able to express themselves",
        "Did I sleep... not?",
        "Printers can print sound now",
        "The things say you can not be undone",
        "Sorry we didn't buy the domain",
        "Its like sheet music but completely different",
        "There may be some lossiness",
        "Mince your words",
        "Horse powered",
        "You can record plants too",
        "A revolutionary way to create your very own tramp stamp designs",
        "Sorry its not FLAC",
        "Better sound quality than most Idaho potatoes",
        "Say it with style",
        "Style it with say",
        "Give your sweetheart a fart and tell them it says something sweet",
        "Sound has never looked so good",
        "Its over nine thousand",
        "Ambrosia for your thoughts"
    ];

function rotater() {
    document.getElementById("placeholder").innerHTML = items[current];
    current = (current==items.length-1) ? 0 : current + 1;
    setTimeout("rotater()",howOften*1000);
}

// function rotater() {
//     if(document.layers) {
//         document.placeholderlayer.document.write(items[current]);
//         document.placeholderlayer.document.close();
//     }
//     if(ns6)document.getElementById("placeholderdiv").innerHTML=items[current]
//         if(document.all)
//             placeholderdiv.innerHTML=items[current];

//     current = (current==items.length-1) ? 0 : current + 1; //increment or reset
//     setTimeout("rotater()",howOften*1000);
// }
window.onload=rotater;
