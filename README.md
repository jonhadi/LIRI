# LIRI

This app I made is called LIRI short for Language Interpretation and Recognition Interface

LIRI takes a few commands and processes them. It searches and returns information on songs, movies, and artist's events

To accomplish this, LIRI utilizes Nodejs and the following node modules: Axios for "Bands in Town" API for concerts search and OMDB for movie searches,Node-Spotify-API, moment for time readablity, and DotEnv for asset protection.

TO USE:
User will need to install Nodejs and the listed modules above.
User also will need their own spotify API key
User will then need to make their own .env file
In the .env file: (do not copy the hyphens)
---------------------------------------
# Spotify API keys

SPOTIFY_ID=[your-spotify-id]
SPOTIFY_SECRET=[your-spotify-secret]
---------------------------------------
where user inputs their spotify key this will keep the file in a file that is not uploaded to Git
This is accomplished by a .gitignore file with the following
---------------------------------------
node_modules
.DS_Store
.env
---------------------------------------

HOW TO USE:
In your console window go the directory the files this repo is located in
 - these are the four commands you can type into the console:

"node LIRI.js concert-this [artist's name]"
 - this command returns the artist's events with the venue name, latitude and longitude and date of the event

"node LIRI.js spotify-this-song [song's name]"
- this command returns artists, song, album, and preview url to 10 songs relevent to the searched song

"node LIRI.js movie-this [movie's name]"
 - this command will return a movie's title, released, rating, plot, actors, language

"node LIRI.js do-what-it-says"
 - this last commands needs a command in a text document named "random.txt"

