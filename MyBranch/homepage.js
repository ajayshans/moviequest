function searchAPI(event, genreId) {
  event.preventDefault();

  var apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&with_genres=' + genreId;

  fetch(apiUrl)
  .then(function(responce) {
      if (!responce.ok) {
          throw new Error('Not Working');
      }
      return response.json();
  })

  .then(function(data) {
      if(data.results && data.results.length) { //check results exist//
          var randomIndex = Math.floor(Math.random() * data.results.length);
          var randomMovie = data.results[randomIndex];

          var movieDisplay = document.getElementById('movieDisplay'); //details of movie: CHECK FORMAT//
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
// limit the genres so we don't have to get all the ID's??? //
// will need a "search again" button to appear //s