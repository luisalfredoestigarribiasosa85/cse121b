/* LESSON 3 - Programming Tasks */

/* Profile Object  */
let myProfile = {
    name: "Luis Estigarribia",
    photo: "./images/LuisCorbata.jpg",
    favotiteFoods: [
        "Milanese",
        "Rice",
        "Pasta",
        "Chicken Wings",
        "grilled pork"
    ],
    hobbies: [
        "Walking with Family",
        "Studying",
        "Watch Movies and Series"
    ],
    placesLived: []
};



/* Populate Profile Object with placesLive objects */
myProfile.placesLived.push({
    place: "Itauguá, Paraguay",
    length: "29 years",
    place2: "Capiatá, Paraguay",
    length2: "1 year"
})



/* DOM Manipulation - Output */

/* Name */
let name = document.getElementById("name");
name.textContent = myProfile.name;
/* Photo with attributes */
let photo = document.getElementById("photo");
photo.setAttribute('src', myProfile.photo);
photo.setAttribute('alt', myProfile.name);

/* Favorite Foods List*/

myProfile.favotiteFoods.forEach(food => {
    let liElement = document.createElement("li");
    liElement.textContent = food;
    document.querySelector("#favorite-foods").appendChild(liElement);
})
/* Hobbies List */

myProfile.hobbies.forEach(hobbie => {
    let hobbieElement = document.createElement("li");
    hobbieElement.textContent= hobbie;
    document.querySelector('#hobbies').appendChild(hobbieElement);
})
/* Places Lived DataList */
let placesLivedElement = document.getElementById("places-lived");

myProfile.placesLived.forEach(place => {
    let placeElement1 = document.createElement("dt");
    placeElement1.innerHTML = place.place;

    let placeElement2 = document.createElement("dd");
    placeElement2.innerHTML = place.length;

    let placeElement3 = document.createElement("dt");
    placeElement3.innerHTML = place.place2;

    let placeElemment4 = document.createElement("dd");
    placeElemment4.innerHTML = place.length2;
    
    placesLivedElement.appendChild(placeElement1);
    placesLivedElement.appendChild(placeElement2);
    placesLivedElement.appendChild(placeElement3);
    placesLivedElement.appendChild(placeElemment4);
})
