/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
const fullName = 'Luis Estigarribia';
const currentYear = 2023; 
const profilePicture = 'images/LuisCorbata.jpg';

/* Step 3 - Element Variables */
const nameElement = document.getElementById('name');
const foodElement = document.getElementById('food');
const yearElement = document.querySelector('#year');
const imageElement = document.querySelector('img'); 

/* Step 4 - Adding Content */
nameElement.innerHTML = `<strong>${fullName}</strong>`;
yearElement.textContent = currentYear;
imageElement.setAttribute('src', profilePicture);
imageElement.setAttribute('alt', `Profile Image of ${fullName}`);

/* Step 5 - Arrays */
let favoriteFoods = ['Pizza', 'Burger', 'Sushi', 'Ice Cream']; // Declare an array variable with your favorite foods
foodElement.innerHTML = favoriteFoods.join(', '); // Display the favorite foods array separated by commas

const newFavoriteFood = 'Tacos'; // Declare and instantiate a variable for a new favorite food
favoriteFoods.push(newFavoriteFood); // Add the new favorite food to the array
foodElement.innerHTML += `<br> ${newFavoriteFood}`; // Append the new favorite food with a line break

favoriteFoods.shift(); // Remove the first element in the array
foodElement.innerHTML += `<br>${favoriteFoods.join(', ')}`; // Display the modified array with commas and a line break

favoriteFoods.pop(); // Remove the last element in the array
foodElement.innerHTML += `<br>${favoriteFoods.join(', ')}`; // Display the final modified array with commas and a line break


