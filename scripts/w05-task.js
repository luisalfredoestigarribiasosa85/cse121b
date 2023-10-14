/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.querySelector("#temples");
let templeList = [];

/* async displayTemples Function */
const displayTemples = (temples) => {
    // Clear existing content
    templesElement.innerHTML = "";

    // Loop through filtered temples and create HTML elements
    temples.forEach(temple => {
        let article = document.createElement("article");
        let h3 = document.createElement("h3");
        h3.innerHTML = temple.templeName;

        let img = document.createElement("img");
        img.src = temple.imageUrl;
        img.alt = temple.location;

        article.appendChild(h3);
        article.appendChild(img);

        templesElement.appendChild(article);
    });
}

/* async getTemples Function using fetch()*/
let getTemples = async () => {
    try {
        const response = await fetch('https://byui-cse.github.io/cse121b-ww-course/resources/temples.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
            templeList = data;
            displayTemples(templeList);
            console.log(templeList);
        } else {
            throw new Error('Invalid data format received');
        }
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

/* reset Function */
const reset = () => {
    templesElement.innerHTML = "";
}

/* sortBy Function */
const sortBy = (temples) => {
    reset();
    const filter = document.getElementById("sortBy").value;

    console.log("Filter:", filter); // Log filter value

    switch (filter) {
        case "utah":
            displayTemples(temples.filter(temple => temple.location.toLowerCase().includes("utah")));
            break;
        case "notutah":
            displayTemples(temples.filter(temple => !temple.location.toLowerCase().includes("utah")));
            break;
        case "older":
            displayTemples(temples.filter(temple => {
                const dedicatedYear = parseInt(temple.dedicated.split(", ")[0]);
                return dedicatedYear < 1950;
            }));
            break;
        case "all":
            displayTemples(temples);
            break;
        default:
            console.error("Invalid filter option");
    }
};


getTemples();

/* Event Listener */
document.querySelector("#sortBy").addEventListener("change", () => sortBy(templeList));
