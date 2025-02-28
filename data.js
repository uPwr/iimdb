import { fetchTopMovies, oData } from './api.js';
import { renderTrailers } from './caroussel.js';

async function movies() {
    await fetchTopMovies(); 
    displayRandomTrailers();
    displayTopMovies(); 
}

//Show the trailer
function displayRandomTrailers() {
    if (!oData.topMovieList || oData.topMovieList.length === 0) {
        console.error("");
        return;
    }

    let shuffledMovies = [...oData.topMovieList].sort(() => 0.5 - Math.random());
    let randomTrailer = shuffledMovies.slice(0, 5);

    randomTrailer.forEach((movie, index) => {
        renderTrailers(movie, index + 1);
    });
}
//show toprank
function displayTopMovies() {
    if (!oData.topMovieList || oData.topMovieList.length === 0) {
        return;
    }

    const container = document.getElementById('cardContainer');
    if (!container) {
        return;
    }

    oData.topMovieList.slice(0, 20).forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const movieLink = document.createElement('a');
        movieLink.href = `movie.html?id=${movie.imdbID}`;
        movieLink.style.textDecoration = 'none';
        movieLink.style.color = 'inherit';

        const moviePoster = document.createElement('img');
        moviePoster.src = movie.Poster !== "N/A" ? movie.Poster : "./res/no-image.png";
        moviePoster.alt = `${movie.Title} poster`;
        
        const ratingBadge = document.createElement('div');
        ratingBadge.classList.add('rating');
        ratingBadge.textContent = movie.Rating;
        
        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.Title;
        
        const movieYear = document.createElement('p');
        movieYear.textContent = movie.Year;
        movieYear.style.color = '#aaa';
        movieYear.style.fontSize = '0.9rem';

        movieLink.appendChild(moviePoster);
        movieLink.appendChild(ratingBadge);
        movieLink.appendChild(movieTitle);
        movieLink.appendChild(movieYear);

        movieCard.appendChild(movieLink);
        container.appendChild(movieCard);
    });
}


window.onload = movies;
