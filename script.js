/**
 Get valid access token for Spotify API and save to localStorage
 https://developer.spotify.com/dashboard/1de952fb45424bf386fb86f7f614b07b/settings
*/
function getSpotifyToken() {
  var tokenEndpoint = 'https://accounts.spotify.com/api/token';
  var clientID = '1de952fb45424bf386fb86f7f614b07b';
  var clientSecret = 'dbef79c4c9194664b0e02648ff826b4d';
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(clientID + ':' + clientSecret),
    },
    body: 'grant_type=client_credentials',
    json: true,
  };

  fetch(tokenEndpoint, options)
    .then((response) => response.json())
    .then((data) => {
      // saving to localStorage
      localStorage.setItem('spotifyToken', data.access_token);
    })
    .catch((error) => console.error(error));
}

if (localStorage.getItem('spotifyToken') === null) {
  getSpotifyToken();
}
