/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */
function add(numbers1, numbers2) {
    return numbers1 + numbers2;
}

function addNumbers() {
    let addNumber1 = Number(document.querySelector('#add1').value);
    let addNumber2 = Number(document.querySelector('#add2').value);
    document.querySelector('#sum').value = add(addNumber1, addNumber2);
}

document.querySelector('#addNumbers').addEventListener('click', addNumbers);

/* Function Expression - Subtract Numbers */
function subtract(numbers1, numbers2) {
    return numbers1 - numbers2;
}

function subtractNumbers() {
    let subtractNumber1 = Number(document.querySelector('#subtract1').value);
    let subtractNumber2 = Number(document.querySelector('#subtract2').value);
    document.querySelector('#difference').value = subtract(subtractNumber1, subtractNumber2);
}

document.querySelector('#subtractNumbers').addEventListener('click', subtractNumbers);

/* Arrow Function - Multiply Numbers */
let multiply = (number1, number2) => {
    return number1 * number2;
};

function multiplyNumbers() {
    let factor1 = Number(document.querySelector('#factor1').value);
    let factor2 = Number(document.querySelector('#factor2').value);
    document.querySelector('#product').value = multiply(factor1, factor2);
}

document.querySelector('#multiplyNumbers').addEventListener('click', multiplyNumbers);

/* Open Function Use - Divide Numbers */
function divide(numbers1, numbers2) {
    return numbers1 / numbers2;
}

function divideNumbers() {
    let dividend = Number(document.querySelector('#dividend').value);
    let divisor = Number(document.querySelector('#divisor').value);
    document.querySelector('#quotient').value = divide(dividend, divisor);
}

document.querySelector('#divideNumbers').addEventListener('click', divideNumbers);


/* Decision Structure */
let actualDate = new Date();
let actualYear = actualDate.getFullYear();
document.getElementById('year').innerHTML = actualYear;

/* ARRAY METHODS - Functional Programming */
/* Output Source Array */
let numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
document.getElementById('array').innerHTML = numbersArray;

/* Output Odds Only Array */
let oddsOnly = numbersArray.filter((number) => {
  return number % 2 !== 0; //This filters the odd numbers only.
});

document.getElementById('odds').innerHTML = oddsOnly;

/* Output Evens Only Array */
let evensOnly = numbersArray.filter((number) => {
    return number % 2 === 0;
});
document.getElementById('evens').innerHTML = evensOnly;

/* Output Sum of Org. Array */
let sumArray = numbersArray.reduce((sum, number) => {
    return sum + number;
})
document.getElementById('sumOfArray').innerHTML = sumArray;
/* Output Multiplied by 2 Array */
let multipliedArray = numbersArray.map((number) => {
    return number * 2;
})
document.getElementById('multiplied').innerHTML = multipliedArray;
/* Output Sum of Multiplied by 2 Array */
let sumMultipliedArray = multipliedArray.reduce((sum, number) => {
    return sum + number;
}, 0);
document.getElementById('sumOfMultiplied').innerHTML = sumMultipliedArray;
