// This consists of all Javascript related to Youtube Functions while working so testing can be conducted separately. This will be combined into a single JS towards the end of the project

var Test = "Shawshank Redemption" // Note: we will use latestMovieTitle here when combining the 2 JS files
var youtubePreview = document.getElementById('youtube-preview')

function getVideoURL(sampleTitle) {
    var ytApiKey = "AIzaSyB8PzB4thIJ1yyzTuJhkEhy3FlEEIZVsJg"
    searchInput = sampleTitle.toLowerCase().replace(" ", "+") + "+movie+trailer"
    var searchResult = "https://www.googleapis.com/youtube/v3/search?key=" + ytApiKey + "&part=snippet&type=video&q=" + searchInput;

    fetch(searchResult)
    .then(response => response.json())
    .then(data => {
        var vidID = data.items[0].id.videoId
        var trailerEmbedURL = "https://www.youtube.com/embed/" + vidID + "?enablejsapi=1"
        youtubePreview.setAttribute("src", trailerEmbedURL)
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error.message);
    })
};

getVideoURL(Test);