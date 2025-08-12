const movie = `http://www.omdbapi.com/?apikey=c393ced6&s=love`;
// insertEl defines where to put data in HTML
const insertEl = document.querySelector(".results");
//Event listeners
const movieIdBox = document.getElementById("idBox");
const movieIdBtn = document.getElementById("idBtn");
const BASE_URL = `https://www.omdbapi.com/`;
const API_KEY = "c393ced6";

function getRequest() {
  const movieRequest = movieIdBox.value.trim();
  if (!movieRequest) {
    alert("Please enter THAT movie.");
    return;
  }
  fetchMovies(movieRequest);
  // alert("Request submitted");
}

//Event Listeners
movieIdBtn.addEventListener("click", getRequest);
movieIdBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getRequest();
});

async function fetchMovies(movieRequest) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${movieRequest}`);
  const data = await res.json();
  const cleanArray = data.Search;
  render(cleanArray);
}

function applyFilter() {
  const cleanArray = localStorage.getItem("cleanArray");
}

function render(cleanArray) {
  console.log(cleanArray);
    const filterValue = document.getElementById("filter").value;
  console.log(filterValue);

  
  if (filterValue === "HIGH_TO_LOW") {
    console.log("Youngest first");
    cleanArray.sort((a, b) => b.Year - a.Year);
    render(cleanArray);
  }

  cleanArray.sort(function (a, b) {
    return a.Year - b.Year;
  });

  const cleanSix = cleanArray.slice(0, 6);
  console.log(cleanSix);
    // const cleanArray = localStorage.getItem("cleanArray");

  // localStorage.setItem

  insertEl.innerHTML = cleanSix
    .map(
      (inserted) =>
        `<div class="results">
  <div class="result">
  <h2>${inserted.Title}</h2>
  <img src="${inserted.Poster}" alt="">
  <p>${inserted.Year}</p>
  <p>IMDB ID: ${inserted.imdbID}</p>
  </div>
  </div>`
    )
    .join("");
}
