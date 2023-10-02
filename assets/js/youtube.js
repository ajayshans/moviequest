// // // This consists of all Javascript related to Youtube Functions while working so testing can be conducted separately. This will be combined into a single JS towards the end of the project

function getVideoURL(sampleTitle) {
    var ytApiKey = "AIzaSyB8PzB4thIJ1yyzTuJhkEhy3FlEEIZVsJg"
    searchInput = sampleTitle.toLowerCase().replace(" ", "+") + "+movie+trailer"
    var searchResult = "https://www.googleapis.com/youtube/v3/search?key=" + ytApiKey + "&part=snippet&type=video&q=" + searchInput;
    
    fetch(searchResult).then(function (response) {
        return response.json();})
}

var sampleTitle = "Shawshank Redemption" // Note: we will use latestMovieTitle here when combining the 2 JS files
console.log(getVideoURL(sampleTitle))