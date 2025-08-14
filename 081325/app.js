console.log("js is connected")
const movieIdBox = document.getElementById("idBox");
const movieIdBtn = document.getElementById("idBtn");

//API CREDS
const BASE_URL = `https://www.omdbapi.com/`;
const API_KEY = "c393ced6";

//ELEMENTS TO/FROM HTML
const moviesWrapper = document.querySelector(".results");
const searchName = document.querySelector('.searchName')

//GLOBAL MOVIES VARIABLE (so don't have to use localStorage)
let currentMovies = []


//and store in global variable OR in Ls w/stringify in and parse out
//Re/Display data
//Sort data

//Event listener requests search term anytime search term changes
//HANDLING SEARCH
function searchChange(event) {
    searchTerm = event.target.value;
    renderMovies(event.target.value);
    searchName.innerHTML = event.target.value;
}

//CALLING API/REQUESTING DATA AND ORGANIZING RESPONSE
async function renderMovies(searchTerm) {
    const response = await fetch(`${BASE_URL}?s=${searchTerm}&apikey=${API_KEY}`);
    console.log(response);
    const data = await response.json();
    console.log(data.Response)
    // if (data.Response === 'False') {
    // alert("NO")}
    currentMovies = data.Search;
    displayMovies(currentMovies)
}

//DISPLAYING MOVIES
function displayMovies(movieList) {
    moviesWrapper.innerHTML = movieList.slice(0, 6).map((movie) => {
        return `
        <div class="results">
  <div class="result">
  <h2>${movie.Title}</h2>
  <img src="${movie.Poster}" alt="">
  <p>${movie.Year}</p>
  <p>IMDB ID: ${movie.imdbID}</p>
  </div>
  </div>`
    }).join("");
}

//SORTING MOVIES
function sortChange(event) {
    const sortOption = event.target.value;
    let sortedMovies = [...currentMovies]

    if (sortOption === "A_Z") {
        sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
        console.log(sortedMovies.sort());
    } else if (sortOption === "Z_A") {
        sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
    } else if (sortOption === "LOW_TO_HIGH") {
        sortedMovies.sort((a, b) => a.Year - b.Year)
    }  else if (sortOption === "HIGH_TO_LOW") { 
        sortedMovies.sort((a, b) => b.Year - a.Year)
    }
    displayMovies(sortedMovies);
}
//get, validate search data
// function userRequest() {
//     console.log("getRequest");
//     //turn it into variable and pass to fetchMovies
// }




// //Event Listeners: Click or Enter
// movieIdBtn.addEventListener("click", userRequest);
// movieIdBox.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") getRequest();
// });

//Focus on search window on load
// window.addEventListener('load', () => {
//     idBox.focus();
// });