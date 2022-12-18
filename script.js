const filmTime = document.getElementById('film-item')
//declare the json url as an API for easy access.
const API = "http://localhost:3000/films";

fetch(API)
.then((res) => res.json())
.then(renderFilm) 
 //const allMovies = renderFilm;


//rendering only the one poster and its details.
function renderFilm(film) {
    const filmMenuDiv = document.getElementById("film-menu");
    const titleDiv = document.getElementById("film-details"); 
    const runDiv = document.getElementById("runtime")
    const showDiv = document.getElementById("showtime")
    const availableDiv = document.getElementById("Available-tickets")

    filmMenuDiv.src = film.poster;

    const filmTitle = document.createElement("p");
    filmTitle.textContent = film.title;
    titleDiv.append(filmTitle);

    const filmRuntime = document.createElement("p");
    filmRuntime.textContent = film.runtime;
    runDiv.append(filmRuntime);

    const filmShowtime = document.createElement("p");
    filmShowtime.textContent = film.showtime;
    showDiv.append(filmShowtime);

    const filmAvailability = document.createElement("p");
    filmAvailability.textContent = (film.capacity - film.tickets_sold);
    availableDiv.append(filmAvailability);
     
    //for the buying of tickets button 
    const button = document.getElementById("sell");
    const btn = parseInt(availableDiv.innerText);
    console.log(btn);
    button.addEventListener('click', () => {
       if (btn >= 1) {
        availableDiv.innerText = (availableDiv.innerText - 1)
        
       }
      
       if (availableDiv.innerText < 0) {
        availableDiv.innerText = '0';
        alert ('Sorry, we are currently sold out of tickets for this film.')
       }

       /*if (availableDiv.innerHTML <= 0) {
        button.innerHTML = 'SOLD OUT'
       }*/

    
    })

}
//a second fetch request to get the movie list.
function getFilms(){
    fetch("http://localhost:3000/films")
    .then((response) => response.json())
    .then(renderFilms);
}
getFilms();

function renderFilms(films) {
    films.forEach(filmDetails);
}

function filmDetails(details) {
    const titlesElement = document.getElementById("film-item");

    let listElement = document.createElement("li");
    listElement.innerText = details.title;
    listElement.className = 'film-item'
    
    let imgElement = document.createElement("film-details");
    imgElement.src = details.poster;

  const moviePoster = document.getElementById('film-menu')

    titlesElement.append(listElement);
    listElement.addEventListener('click', () => {
        console.log(details.title)
        document.getElementById('film-details').innerText = details.title
        document.getElementById('runtime').innerText = details.runtime
        document.getElementById('showtime').innerText = details.showtime
        document.getElementById('Available-tickets').innerText = details.capacity - details.tickets_sold
        moviePoster.src = details.poster
    })
}