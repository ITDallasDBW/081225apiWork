console.log("js is connected");

//API CREDS
const BASE_URL = `https://www.omdbapi.com/`;
const API_KEY = "c393ced6";
//
//Global variable (so don't have to use localStorage)
let currentMovies = [];

//ELEMENTS TO/FROM HTML
const moviesWrapper = document.querySelector(".results");
const searchResults = document.querySelector(".searchResults");
const loading = document.getElementById("loading");

// Focus on search window on load
window.addEventListener("load", () => {
  idBox.focus();
});

//Try/Catch
//Enter, click to activate
//Loading state

//Alt. event listener requests search term anytime it changes
//HANDLING SEARCH
// function searchChange(event) {
// showMessage(`Checking with Hollywood`, "loading");
// searchTerm = event.target.value;
// fetchData(event.target.value);
// searchResults.innerHTML = event.target.value;
// movieIdBox.value = "";
// }

// Event Listeners: Click or Enter
const movieIdBox = document.getElementById("idBox");
const movieIdBtn = document.getElementById("idBtn");

movieIdBtn.addEventListener("click", clickHandlerFn);
movieIdBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") clickHandlerFn();
});
//What the listeners do...
function clickHandlerFn() {
  const searchData = movieIdBox.value;
  // console.log(movieIdBox.value);
  //Pass var to apiCallFn as argument
  fetchData(searchData);
  //reset search box to blank and focused
        movieIdBox.value = "";
        idBox.focus();

}

//CALLING API/REQUESTING DATA AND ORGANIZING RESPONSE

async function fetchData(searchTerm) {
  const loadState = document.querySelector(".loading");
  //begin skeleton loading state
loadState.classList.remove('hide__spinner')
  const res = await fetch(`${BASE_URL}?s=${searchTerm}&apikey=${API_KEY}`);
  console.log(res);

  const data = await res.json();
  console.log(res.status);
  console.log(data.Response);
  //end skeleton loading state
    loadState.classList += ' hide__spinner'
  if (data.Response === "False") {
    if (res.status === 401) {
      showMessage(`Get a key`, "failure");
    } else {
      showMessage(
        `There's no record of <span class="italic">THAT</span> movie`,
        "failure"
      );
    }
  }
  currentMovies = data.Search;
  displayMovies(currentMovies);
  showMessage(`We found <span class="italic">THAT</span> movie`, "success");
}
//status = 200 means got data successfully
//if data.Response is false, there were no results
//401 means bad API key

//Elements t/f HTML for success, error messages
const messageBox = document.querySelector(".message-box");
const statusBox = document.querySelector(".status-box");
const messageText = document.querySelector(".message-text");

//function to display messages
function showMessage(message, type = "info") {
  console.log(message);
  messageText.innerHTML = message;
  const styles = {
    success: { bg: "green", border: "yellow", text: "white" },
    failure: { bg: "red", border: "black", text: "black" },
    loading: { bg: "white", border: "black", text: "black" },
  }[type];
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

//DISPLAYING MOVIES
function displayMovies(movieList) {
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
  console.log(sortOption);
  displayMovies(sortedMovies);
}
