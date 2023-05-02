/* selectors */
var genreInput = document.getElementById("genre-dropdown");
var tempoInput = document.getElementById("tempo-dropdown");
var songBtn = document.getElementById("get-song-btn");
var player = document.getElementById("player");

/* event listeners */
genreInput.addEventListener("change", checkDropdowns);
tempoInput.addEventListener("change", checkDropdowns);
songBtn.addEventListener("click", fetchRecommendedTrack);

/* functions */

/**
 * Checks to see if both genre and mood dropdowns are populated
 */
function checkDropdowns() {
  if (genreInput.value !== "" && tempoInput.value !== "") {
    songBtn.disabled = false;
    songBtn.classList.remove("disabled");
  } else {
    songBtn.disabled = true;
    songBtn.classList.add("disabled");
  }
}

/**
 * Get valid access token for Spotify API and save to localStorage
 * https://developer.spotify.com/dashboard/1de952fb45424bf386fb86f7f614b07b/settings
 */
function getSpotifyToken() {
  var tokenEndpoint = "https://accounts.spotify.com/api/token";
  var clientID = "1de952fb45424bf386fb86f7f614b07b";
  var clientSecret = "dbef79c4c9194664b0e02648ff826b4d";
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientID + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
    json: true,
  };

  fetch(tokenEndpoint, options)
    .then((response) => response.json())
    .then((data) => {
      // saving to localStorage
      localStorage.setItem("spotifyToken", data.access_token);
    })
    .catch((error) => console.error(error));
}

/**
 * Generates recommendation API query based on params
 */
function generateRecommendationUrl(genre, liveness) {
  var baseUrl = "https://api.spotify.com/v1/recommendations?";
  var finalUrl = baseUrl + "seed_genres=" + genre;
  var livenessString = "";

  // assign livenessString based on liveness input param
  switch (liveness) {
    case "party":
      livenessString = "min_liveness=.8&max_liveness=1";
      break;
    case "upbeat":
      livenessString = "min_liveness=.5&max_liveness=.7";
      break;
    case "chill":
      livenessString = "min_liveness=.1&max_liveness=.4";
      break;
  }

  // assemble finalUrl
  finalUrl = finalUrl + "&" + livenessString;

  return finalUrl;
}

/**
 * Fetch recommended track based on user input
 */
function fetchRecommendedTrack() {
  // only run if both dropdowns are selected
  if (genreInput.value && tempoInput.value) {
    player.classList.remove("hidden");
    var url = generateRecommendationUrl(genreInput.value, tempoInput.value);
    console.log(url);
  }
}

// check if token exists in localStorage, if not, fetch valid token
if (localStorage.getItem("spotifyToken") === null || undefined) {
  getSpotifyToken();
}

var query = generateRecommendationUrl("pop", "chill");
console.log(query);
