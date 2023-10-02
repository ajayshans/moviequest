// This consists of all Javascript related to The Movie Database Functions while working so testing can be conducted separately. This will be combined into a single JS towards the end of the project

var movieTitle = []
// Note: Want to be able to pass this through Youtube API
var latestMovieTitle = movieTitle.slice(-1)[0];


function searchAPI(event, genreId) {
    event.preventDefault();

    // Step 1: Fetch the first page to determine total pages
    var apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=0a5329b198d874cdfd05a37c220a128b&with_genres=' + genreId;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        var maxPages = Math.min(data.total_pages, 100);
        var randomPage = Math.floor(Math.random() * maxPages) + 1;
      
        return fetch(apiUrl + '&page=' + randomPage); // Step 2: Fetch the randomly selected page
    })
    .then(response => response.json())
    .then(data => {
        if (data.results && data.results.length) {
            // Step 4: Randomly select a movie from the results of the randomly selected page
            var randomIndex = Math.floor(Math.random() * data.results.length);
            var randomMovie = data.results[randomIndex];
            // Below pushes the title of the generated movie to the movieTitle array
            movieTitle.push(randomMovie.title);

            var movieDisplay = document.getElementById('movieDisplay');
            movieDisplay.innerHTML = ` 
                <h2>${randomMovie.title}</h2>
                <p>${randomMovie.overview}</p>
                <img src="https://image.tmdb.org/t/p/w500${randomMovie.poster_path}" alt="${randomMovie.title}" />
            `;
        } else {
            document.getElementById('messageDisplay').innerText = "No movies found for the selected genre.";
        
        }
    })
    .catch(function(error) {
        document.getElementById('messageDisplay').innerText = 'There was a problem with the fetch operation: ' + error.message;
    });
}