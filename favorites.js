
if (window.location.pathname.includes('favorites.html')) {
    document.addEventListener("DOMContentLoaded", () => {
        const apiKey = "1f3045fd";
        const cardContainer = document.getElementById("cardContainer");
        const favoritesTitle = document.getElementById("favoritesTitle");
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        
        if (favorites.length === 0) {
            favoritesTitle.textContent = "You haven't added any favorites yet";
            return;
        }
        
        favoritesTitle.textContent = `Your favorites (${favorites.length})`;
        
        favorites.forEach(movieId => {
            fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`)
                .then(response => response.json())
                .then(movie => {
                    if (movie.Response === "True") {
                        const movieCard = document.createElement("div");
                        movieCard.classList.add("movie-card");
                        movieCard.dataset.id = movie.imdbID;
                        
                        movieCard.innerHTML = `
                            <a href="movie.html?id=${movie.imdbID}" style="text-decoration:none;color:inherit;">
                                <img src="${movie.Poster !== "N/A" ? movie.Poster : "./res/no-image.png"}" alt="${movie.Title} poster">
                                <h3>${movie.Title}</h3>
                                <p style="color:#aaa;font-size:0.9rem;">${movie.Year}</p>
                            </a>
                            <button class="remove-fav-btn" data-id="${movie.imdbID}">Remove from favorites</button>
                        `;
                        
                        cardContainer.appendChild(movieCard);
                        
                        // Lägg till event listener för borttagningsknappen
                        movieCard.querySelector(".remove-fav-btn").addEventListener("click", removeFromFavorites);
                    }
                })
                .catch(error => console.error(error));
        });
    });
}

// Funktion för att ta bort från favoriter
function removeFromFavorites(event) {
    const movieId = event.target.dataset.id;
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    favorites = favorites.filter(id => id !== movieId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    
    // Ta bort filmkortet från UI
    const movieCard = event.target.closest(".movie-card");
    movieCard.classList.add("fade-out");
    
    setTimeout(() => {
        movieCard.remove();
        
        // Uppdatera rubriken
        const favoritesTitle = document.getElementById("favoritesTitle");
        if (favorites.length === 0) {
            favoritesTitle.textContent = "You haven't added any favorites yet";
        } else {
            favoritesTitle.textContent = `Your favorites (${favorites.length})`;
        }
    }, 300);
}