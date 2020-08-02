'use strict'
console.log('%c HI', 'color: firebrick')

/* 1- on event DOMContentLoaded:
        - fetch the images from "https://dog.ceo/api/breeds/image/random/4"
        - parse the response as JSON
        - insert the images in the div with id="dog-image-container" using some tool of iteration e.g. "foreach()" */
/* 2- on event DOMContentLoaded:
        - fetch the api from 'https://dog.ceo/api/breeds/list/all'
        - parse the response as JSON
        - insert the breeds as list items in the unordered list with id="dog-breeds"
 */
/*  3- change the color of any clicked list items (event.target())
 */
/*  4- filter breeds by first letter using the dropdown menu
*/

document.addEventListener("DOMContentLoaded", () => {
    // DOM selectors
    const dogImageContainer = document.querySelector("#dog-image-container div");
    const dogBreedsList = document.querySelector("#dog-breeds");
    const breedDropdown = document.querySelector("#breed-dropdown");
    
    // fetching dog photos into their assigned div
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then (resp => resp.json())
    .then (images => images.message.forEach(image => 
        dogImageContainer.innerHTML += `<img src="${image}" class="col" alt="cute-dog">`
    ));
    //Some styling
    dogImageContainer.style.display = "flex";
    document.querySelector("h1").style.textAlign = "center"
    // fetching dog breeds into their assigned list
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(resp => resp.json())
    .then(dogs => Object.keys(dogs.message).forEach(dog => 
        dogBreedsList.innerHTML += `
        <li>
        <a href="" class="list-group-item list-group-item-action">${dog}</a>
        </li>
        `
    ));
    // event listener for changing colors of listed dog breeds
    dogBreedsList.addEventListener("click", e => {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        e.preventDefault()
        e.target.style.color = `#${randomColor}`
    });
    // event listener for changing the breeds list according to the selected letter
    breedDropdown.addEventListener("change", () => {
    dogBreedsList.innerHTML = ""
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(resp => resp.json())
    // take the keys of the resp's object and put them in array-->
    .then(dogs => Object.keys(dogs.message)
    // filter array elemnts by the value of the selection
    .filter(dog => dog.charAt(0) === breedDropdown.value)
    // iterate over the selected elements
    .forEach(dog => 
        dogBreedsList.innerHTML += `
        <li><a href="" class="list-group-item list-group-item-action">${dog}</a></li>
        `
    ));
});
});