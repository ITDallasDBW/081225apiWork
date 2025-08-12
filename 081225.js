// let a = 1;
// let b = 2;
// function adding() {
//     let resultC = a+b;
//     console.log(resultC);
//     localStorage.setItem("storedC", resultC);
// }
// adding();
// // console.log(resultC);
// function typing() {
//     let typingC = localStorage.getItem("storedC");
//     console.log(typingC);
//     adding(typingC);
// }
// typing();







const movieLookup = `http://www.omdbapi.com/?apikey=c393ced6&s=love`;
// insertEl defines where to put data in HTML
const insertEl = document.querySelector(".results");
//Event listeners
const movieIdBox = document.getElementById("idBox");
const movieIdBtn = document.getElementById("idBtn");
const BASE_URL = `https://www.omdbapi.com/`;
const API_KEY = "c393ced6";


function applyFilter() {
  let filtering = localStorage.getItem("fetchResults");
      console.log(Array.isArray(filtering));

  let filterValue = document.getElementById('filter').value;

console.log(filterValue);
if (filterValue === 'A_Z') {
  console.log("Sort alpha");
} else if (filterValue === 'Z_A') {
  console.log("Reverse alpha");
} else if (filterValue === 'LOW_TO_HIGH') {
  console.log('Oldest first');
    filtering.sort((a,b) => a.Year - b.Year)
} else if (filterValue === 'HIGH_TO_LOW') {
  console.log('Newest first');
} else {
    console.log('No filter')}
    //pass data to display
    console.log(filtering);
    console.log(Array.isArray(filtering));
// render(filtered)
render(filtering);
}




// function filterData() {
//     let filterValue = document.getElementById("filter").value;
// //if no sort, pass LS to render
// //if sort requested, sort LS and pass to render
// }

function render(filtering) {
  const cleanSix = (filtering).slice(0, 6);

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



async function fetchMovies(movieRequest) {
        console.log(movieRequest)

  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${movieRequest}`);
    console.log(movieRequest)

  const data = await res.json();
  const cleanArray = data.Search;
  localStorage.setItem("fetchResults", cleanArray);
  console.log(cleanArray);
  console.log(Array.isArray(cleanArray));
  applyFilter();
}

//validate data for search and submit request
function getRequest() {
  const movieRequest = movieIdBox.value.trim();
  if (!movieRequest) {
    alert("Please enter THAT movie.");
    return;
  }
//   console.log(movieRequest)
  fetchMovies(movieRequest);
}

//Event Listeners: Click or Enter
movieIdBtn.addEventListener("click", getRequest);
movieIdBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getRequest();
});

//Focus on search window on load
window.addEventListener('load', () => {
    idBox.focus();
});