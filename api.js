export let oData = {};

export async function fetchTopMovies() {
    try {
        const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
        if (!response.ok) throw new Error(`HTTP-feil: ${response.status}`);

        let movies = await response.json();
        oData.topMovieList = movies;
    } catch (error) {
        console.error(error);
    }
}
