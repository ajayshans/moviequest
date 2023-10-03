document.getElementById('submit-button').addEventListener('click', function() { // select dropdown //
    var selectedGenre = document.getElementById('dropdown-genre').value;
    var selectedDecade = document.getElementById('dropdown-release').value;
    var originalLanguage = document.getElementById('dropdown-lang').value;

    searchAPI(selectedGenre, selectedDecade, originalLanguage);
});

function searchAPI(genreId, decade, originalLanguage) {  // searching first for genre to take into account any date option //
    var apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=0a5329b198d874cdfd05a37c220a128b&with_genres=' + genreId;

    // then added the date option here //
    if (decade !== "Any") {
    var startDate = decade + '-01-01';
    var endDate = (parseInt(decade) + 9).toString() + '-12-31';
    apiUrl += '&primary_release_date.gte=' + startDate + '&primary_release_date.lte=' + endDate;
    }

    if (originalLanguage && originalLanguage !== "Any") {
        apiUrl += '&with_original_language=' + originalLanguage;
    }

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        var maxPages = Math.min(data.total_pages, 100);
        var randomPage = Math.floor(Math.random() * maxPages) + 1;
      
        return fetch(apiUrl + '&page=' + randomPage); // Fetch the randomly selected page
    })
    // post search functionality below //
    .then(response => response.json())
    .then(data => {
        if (data.results && data.results.length) {
            // Randomly select a movie from the results of the randomly selected page
            var randomIndex = Math.floor(Math.random() * data.results.length);
            var randomMovie = data.results[randomIndex];

            var movieDisplay = document.getElementById('movieDisplay');
            movieDisplay.innerHTML = ` 
                <h2>${randomMovie.title}</h2>
                <p>${randomMovie.overview}</p>
                <img src="https://image.tmdb.org/t/p/w500${randomMovie.poster_path}" alt="${randomMovie.title}" />
            `;
            localStorage.setItem('movieData', JSON.stringify(data));
        }
    })
    .catch(function(error) {
        document.getElementById('messageDisplay').innerText = 'There was a problem with the fetch operation: ' + error.message;
    });
}

// I added this to be linked to history on main page //
var savedData = JSON.parse(localStorage.getItem('movieData'));

//included the clear be to be linked to index//
localStorage.removeItem('movieData');
