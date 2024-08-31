const JAMENDO_API_KEY = '07549b44';  // Replace with your Jamendo API key
const TRACK_URL = `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_API_KEY}&format=json&limit=10`;
const URL = `https://api.jamendo.com/v3.0/albums/?client_id=${JAMENDO_API_KEY}&format=jsonpretty&artist_name=we+are+fm`;

// Fetch tracks from Jamendo
fetch(URL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        data.results.forEach(album => {
            console.log(`Track Name: ${album.name}, Download URL: ${track.audiodownload}`);
        });
    })
    .catch(error => {
        console.error('Error fetching album information:', error);
    });
