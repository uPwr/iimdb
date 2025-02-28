document.addEventListener("DOMContentLoaded", () => {
    let searchForm = document.getElementById("searchForm");
    let searchInput = document.getElementById("searchInput");
    let resultsContainer = document.getElementById("cardContainer");
    let apiKey = "1f3045fd";
    let query = new URLSearchParams(window.location.search).get("query");

        if (searchForm && searchInput) {
        searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            let query = searchInput.value.trim();
            if (query) window.location.href = `search.html?query=${encodeURIComponent(query)}*`;
        });
        }

    
        if (query && resultsContainer) {
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                resultsContainer.innerHTML = ""; 
        if (data.Response === "True") {
            data.Search.forEach(movie => {
            let movieCard = document.createElement("article");
            movieCard.classList.add("movie-card");

            let movieImg = document.createElement("img");
            movieImg.src = movie.Poster !== "N/A" ? movie.Poster : "./res/no-image.png";
            movieImg.alt = movie.Title;

            let movieTitle = document.createElement("h3");
            movieTitle.textContent = `${movie.Title} (${movie.Year})`;

            let movieLink = document.createElement("a");
            movieLink.href = `movie.html?id=${movie.imdbID}`;
            movieLink.appendChild(movieImg);
            movieLink.appendChild(movieTitle);

            movieCard.appendChild(movieLink);
            resultsContainer.appendChild(movieCard);
            });
            } else {
                let noResults = document.createElement("p");
                noResults.textContent = "Could not find any search results.";
                resultsContainer.appendChild(noResults);
            }
            })
            .catch(() => {
                resultsContainer.innerHTML = "";
                let errorMessage = document.createElement("p");
                errorMessage.textContent = "Could not find any search results.";
                resultsContainer.appendChild(errorMessage);
            });
            }
});

