console.log("js is connected");
//elements t/f HTML for alt eventListeners
const movieIdBox = document.getElementById("idBox");
const movieIdBtn = document.getElementById("idBtn");

//API CREDS
const BASE_URL = `https://www.omdbapi.com/`;
const API_KEY = "c393ced6";

//ELEMENTS TO/FROM HTML
const moviesWrapper = document.querySelector(".results");
const searchResults = document.querySelector(".searchResults");
const loading = document.getElementById('loading');

//Store in global variable OR in Ls w/stringify in and parse out
//GLOBAL MOVIES VARIABLE (so don't have to use localStorage)
let currentMovies = [];

// Focus on search window on load
window.addEventListener("load", () => {
  idBox.focus();
});

//SUCCESS, FAILURE MESSAGES
//Var is THAT movie
//Var is not THAT movie
//We can't find that movie, Var
//Something has gone wrong. Please try again later.
//It's not you. It's us.
//

//Loading state

//Event listener requests search term anytime it changes
//HANDLING SEARCH
function searchChange(event) {
    showMessage(`Checking with Hollywood`, "loading");
      loading.style.display = 'block';
  searchTerm = event.target.value;
  renderMovies(event.target.value);
  searchResults.innerHTML = event.target.value;
  movieIdBox.value = "";
}
// // Alternate Event Listeners: Click or Enter
// movieIdBtn.addEventListener("click", clickHandlerFn);
// movieIdBox.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") clickHandlerFn(movieIdBox.value);
// });
// function clickHandlerFn(varAsArgument) {
//     console.log(movieIdBox.value);
//     console.log(varAsArgument);
//     //Turn it into var. Pass var to apiCallFn as argument
// }

//CALLING API/REQUESTING DATA AND ORGANIZING RESPONSE
async function renderMovies(searchTerm) {
//   loading.style.display = 'block';

  const response = await fetch(`${BASE_URL}?s=${searchTerm}&apikey=${API_KEY}`);
  console.log(response);
  const data = await response.json();
  console.log(data.Response);

  if (data.Response === 'False') {
    //   loading.style.display = 'none';
  return showMessage(`There's no record of <span class="italic">THAT</span> movie`, "failure");
    }

  currentMovies = data.Search;
  displayMovies(currentMovies);
    loading.style.display = 'none';
  showMessage(`We found <span class="italic">THAT</span> movie`, "success");
}

//Elements t/f HTML for success, error messages
const messageBox = document.querySelector(".message-box");
const statusBox = document.querySelector(".status-box");
const messageText = document.querySelector(".message-text");
//function to display messages

function showMessage(message, type = "info") {
  console.log(message);
  messageText.innerHTML = message;
  const styles =
    {
      success: { bg: "green", border: "yellow", text: "white" },
      failure: { bg: "red", border: "black", text: "black" },
      loading: { bg: "white", border: "black", text: "black" },
    }[type] ;
  messageBox.style.cssText = `
        background-color: ${styles.bg};
        border: 2px solid ${styles.border};
        color: ${styles.text};
        `;
  messageBox.classList.remove("hidden");
  statusBox.classList.add("hidden");
  setTimeout(() => messageBox.classList.add("hidden"), 5000);
  setTimeout(() => statusBox.classList.remove("hidden"), 5000);
  
}
// const intervalId = setInterval(showMessage, 1000);
// setTimeout(() => {
//     clearInterval(intervalId);
//     }, 5000);

//DISPLAYING MOVIES
function displayMovies(movieList) {

  // messageText.innerHTML = `<div class="message-text">Results</div>`;
  moviesWrapper.innerHTML = movieList
    .slice(0, 6)
    .map((movie) => {
      return `
        <div class="results">
  <div class="result">
  <h2>${movie.Title}</h2>
  <img src="${movie.Poster}" alt="">
  <p>${movie.Year}</p>
  <p>IMDB ID: ${movie.imdbID}</p>
  </div>
  </div>`;
    })
    .join("");
}

//SORTING MOVIES
function sortChange(event) {
  const sortOption = event.target.value;
  let sortedMovies = [...currentMovies];

  if (sortOption === "A_Z") {
    sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
    console.log(sortedMovies.sort());
  } else if (sortOption === "Z_A") {
    sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
  } else if (sortOption === "LOW_TO_HIGH") {
    sortedMovies.sort((a, b) => a.Year - b.Year);
  } else if (sortOption === "HIGH_TO_LOW") {
    sortedMovies.sort((a, b) => b.Year - a.Year);
  }
  displayMovies(sortedMovies);
}

// function myFunction() {
//     console.log("Function is running.");
// }
// const intervalId = setInterval(myFunction, 1000);
// setTimeout(() => {
//     clearInterval(intervalId);
//     console.log("Function has stopped.");
// }, 5000);