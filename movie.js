
if (window.location.pathname.includes('movie.html')) {
    document.addEventListener("DOMContentLoaded", () => {
        const apiKey = "1f3045fd";
        const movieId = new URLSearchParams(window.location.search).get("id");
        const movieInfoContainer = document.getElementById("movieInformation");

        if (movieId && movieInfoContainer) {
            fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}&plot=full`)
                .then(response => response.json())
                .then(movie => {
                    document.title = `${movie.Title} (${movie.Year}) - My Movie Database`;
                    
                    const movieDetail = `
                        <div class="movie-poster-container">
                            <img class="movie-poster" src="${movie.Poster !== "N/A" ? movie.Poster : "./res/no-image.png"}" alt="${movie.Title} poster">
                        </div>
                        <div class="movie-details">
                            <h1>${movie.Title} <span style="font-weight:normal;color:#aaa;">(${movie.Year})</span></h1>
                            <div class="movie-meta">
                                <span>${movie.Rated}</span> | 
                                <span>${movie.Runtime}</span> | 
                                <span>${movie.Genre}</span> | 
                                <span>${movie.Released}</span>
                            </div>
                            <p class="movie-plot">${movie.Plot}</p>
                            <div class="movie-director"><strong>Director:</strong> ${movie.Director}</div>
                            <div class="movie-cast"><strong>Cast:</strong> ${movie.Actors}</div>
                            <div class="movie-rating">
                                <span>IMDb Rating:</span> 
                                <span class="rating-value">${movie.imdbRating}</span>/10
                                <span style="color:#aaa;">(${movie.imdbVotes} votes)</span>
                            </div>
                            <button class="fav-btn" id="addToFavBtn" data-id="${movie.imdbID}" style="margin-top:1.5rem;max-width:200px;">
                                Add to favorites
                            </button>
                        </div>
                    `;
                    
                    movieInfoContainer.innerHTML = movieDetail;
                    
                    // Implementera favoritknappsfunktionalitet
                    document.getElementById("addToFavBtn").addEventListener("click", addToFavorites);
                })
                .catch(error => {
                    movieInfoContainer.innerHTML = `<p class="error-message">Failed to fetch movie details. Please try again later.</p>`;
                    console.error(error);
                });
        }
    });
}

// Funktion för att hantera favoritfilmer
function addToFavorites(event) {
    const movieId = event.target.dataset.id;
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    if (!favorites.includes(movieId)) {
        favorites.push(movieId);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        event.target.textContent = "Added to favorites";
        event.target.classList.add("added");
    } else {
        event.target.textContent = "Already in favorites";
    }
}