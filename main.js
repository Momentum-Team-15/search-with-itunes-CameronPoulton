let searchResults = document.getElementById("search-results");
let form = document.getElementById("form");
let input = document.getElementById("music-search");
let audio = document.getElementById("audio-player");

form.addEventListener("submit", event => {
    event.preventDefault();
    let search = input.value;
    let url = `https://itunes.apple.com/search?term=${search}&limit=20`;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (music) {
            searchResults.innerHTML='';
            buildResults(music.results);
        })
})

function buildResults(itunesArray) {
    for (let itunes of itunesArray) {
        let resultsDiv = document.createElement("div");
        let picture = document.createElement("img");
        let title = document.createElement("h4");
        let artist = document.createElement("p");
        let audioButton = document.createElement("button");
        
        audio.src = `${itunes.previewUrl}`;
        picture.src = `${itunes.artworkUrl100}`;
        title.innerText = `${itunes.trackName}`;
        artist.innerText = `${itunes.artistName}`;
        audioButton.innerText = `play preview`;
        
        resultsDiv.classList.add("results");
        picture.classList.add("pic");
        title.classList.add("title");
        audioButton.classList.add(`resultPrev`);
        
        audioButton.addEventListener("click", (event) => {
            audio.src="";
            audio.src =`${itunes.previewUrl}`;
            audio.volume = 0.1;
        })

        resultsDiv.appendChild(picture);
        resultsDiv.appendChild(title);
        resultsDiv.appendChild(artist);
        resultsDiv.appendChild(audioButton);
        searchResults.appendChild(resultsDiv);

    }
}
