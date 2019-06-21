require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var moment = require("moment");
var axios = require("axios");
var fs = require("fs");

var input = process.argv[2];
switch(input) {
    case "concert-this": 
        concertThis(parseInputs());
        break;
    case "spotify-this-song":
        spotifyThis(parseInputs());
        break;
    case "movie-this":
        movieThis(parseInputs());
        break;
    case "do-what-it-says":
        console.log("made it");
        doIT();
        break;
}
//function parse inputs
function parseInputs() {
    var input = process.argv[3];
    for (var i = 4; i < process.argv.length; i++) {
        input = input.concat("+", process.argv[i]);
    }
    return input;
}
//function for text read and call
function doIT() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
        return console.log(error);
        }
        whatever = data.split(",");
        //add each number to total
        input = whatever[0];
        switch(input) {
            case "concert-this": 
                concertThis(whatever[1]);
                break;
            case "spotify-this-song":
                spotifyThis(whatever[1]);
                break;
            case "movie-this":
                movieThis(whatever[1]);
                break;
        }
    });
}


//function for sog search
function spotifyThis(songName) {
    songName = songName.split('+').join(' ');
    spotify.search({ type: 'track', query: songName, limit: 10} , function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        
        var command = process.argv[0];
        for (var i = 1; i < process.argv.length; i++) {
            command = command.concat(" ", process.argv[i]);
        }
        fs.appendFile("log.txt", command + "\n", function(err) {
            if (err) {
            return console.log(err);
            } else {
                console.log("Logged!");
              }
        });;

        for (var i = 0; i < data.tracks.items.length; i++) { 
            var artists = data.tracks.items[i].artists[0].name;
            console.log(data.tracks.items[i].artists[0].name);
            for (var j = 0; j <data.tracks.items[i].artists.length; j++) {
                artists= artists.concat(", ", data.tracks.items[i].artists[j].name);
            }
            fs.appendFile("log.txt",
            "Artist's Name: " + artists + "\n" + 
            "Song Name: " + data.tracks.items[i].name + "\n" + 
            "Album Name: " + data.tracks.items[i].album.name + "\n" + 
            "Link: " + data.tracks.items[i].preview_url + "\n" + 
            "---------------------------------------------------- \n",
            function(err) {
                if (err) {
                return console.log(err);
                } 
            });;
       }

        for (var i = 0; i < data.tracks.items.length; i++) { 
            var artists = data.tracks.items[i].artists[0].name;
            for (var j = 0; j <data.tracks.items[i].artists.length; j++) {
                artists = artists.concat(", ", data.tracks.items[i].artists[j].name);
            }
            console.log("Artist's Name: " + artists);
            console.log("Song Name: " + data.tracks.items[i].name);
            console.log("Album Name: " + data.tracks.items[i].album.name);
            console.log("Link: " + data.tracks.items[i].preview_url);
            console.log("----------------------------------------------------")
       }
      });
}


//function for concert search
function concertThis(artistName) {

    axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp").then(
        function(response) {
        var fs = require("fs");

        var command = process.argv[0];
        for (var i = 1; i < process.argv.length; i++) {
            command = command.concat(" ", process.argv[i]);
        }
        fs.appendFile("log.txt", command + "\n", function(err) {
            if (err) {
            return console.log(err);
            } else {
                console.log("Logged!");
              }
        });;

        for (var j = 0; j < response.data.length; j++) {
        fs.appendFile("log.txt",
        "Venue Name: " + response.data[j].venue.name + "\n" +
        "Latitude: " + response.data[j].venue.latitude + "\n" +
        "Longitude: " + response.data[j].venue.longitude + "\n" +
        "Date: " + moment(response.data[j].datetime).format('MMMM Do YYYY, h:mm:ss a') + "\n" +
        "---------------------------------------------------- \n" 
        , function(err) {
            if (err) {
            return console.log(err);
            }
        });;
        }

        for (var j = 0; j < response.data.length; j++) {
            console.log("Venue Name: " + response.data[j].venue.name);
            console.log("Latitude: " + response.data[j].venue.latitude);
            console.log("Longitude: " + response.data[j].venue.longitude);
            console.log("Date: " + moment(response.data[j].datetime).format('MMMM Do YYYY, h:mm:ss a'));
            console.log("----------------------------------------------------")
        }
    
        })      
        .catch(function(error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log("---------------Data---------------");
              console.log(error.response.data);
              console.log("---------------Status---------------");
              console.log(error.response.status);
              console.log("---------------Status---------------");
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an object that comes back with details pertaining to the error that occurred.
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
}

//function for movie search
function movieThis(movieName) {
    
    // Then run a request with axios to the OMDB API with the movie specified
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
      function(response) {
        var fs = require("fs");
    
        var command = process.argv[0];
        for (var i = 1; i < process.argv.length; i++) {
            command = command.concat(" ", process.argv[i]);
        }

        fs.appendFile("log.txt", command + "\n" +
        "Title: " + response.data.Title + "\n" +
        "Year: " + response.data.Released + "\n" +
        "IMDB Rating: " + response.data.imdbRating + "\n" +
        "Rotten Tomatoes: " + response.data.Ratings[1].Value + "\n" +
        "Country Produced: " + response.data.Country + "\n" +
        "Language: " + response.data.Language + "\n" +
        "Plot: " + response.data.Plot + "\n" +
        "Actors: " + response.data.Actors, function(err) {
            if (err) {
            return console.log(err);
            } else {
                console.log("Logged!");
              }
            });;

        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Released);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
        console.log("Country Produced: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
     
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    
}