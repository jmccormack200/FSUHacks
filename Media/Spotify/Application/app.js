/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var models = require('./Models');

var client_id = '68936a4eacc64a06b638174901fba9b0'; // Your client id
var client_secret = '6b4c802e54e64825bd10b685c3e84f40'; // Your client secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

var my_access_token;
var my_refresh_token;

var current_tracks;
var track_index;

// URLS
var TWENTIES_PLAYLIST_URL = 'https://api.spotify.com/v1/users/aerocarl/playlists/2HemUjvtkZIawAAQuiYJij/tracks';
var THIRTIES_PLAYLIST_URL = 'https://api.spotify.com/v1/users/1248415055/playlists/7D525nXo6V3xCkRsyHN4D5/tracks';
var FOURTIES_PLAYLIST_URL = 'https://api.spotify.com/v1/users/mekopants/playlists/2bOcgNmdFWY5oULrL7eqVl/tracks';
var FIFTIES_PLAYLIST_URL = 'https://api.spotify.com/v1/users/mervynvankuyen/playlists/5ZNKySqQVGPXlIomBnmt0r/tracks';
var SIXTIES_PLAYLIST_URL = 'https://api.spotify.com/v1/users/spotify/playlists/2NFOUmp2wyR5CrXtKDkUkB/tracks';
var SEVENTIES_PLAYLIST_URL = 'https://api.spotify.com/v1/users/spotify/playlists/00K2xasnm9pDQk53SzNCht/tracks';
var EIGHTIES_PLAYLIST_URL = 'https://api.spotify.com/v1/users/1262328643/playlists/2ebEBVymSfgbd1mi9s8bye/tracks';
var NINETIES_PLAYLIST_URL = 'https://api.spotify.com/v1/users/spotify/playlists/2uAichKSjJSyrmal8Kb3W9/tracks';
var TWO_THOUSANDS_PLAYLIST_URL = 'https://api.spotify.com/v1/users/1244736452/playlists/4fjhjT7CRZdUWsBeBxbaqo/tracks';
var TWENTY_TENS_PLAYLIST_URL = 'https://api.spotify.com/v1/users/mvila1992/playlists/6ndNVkGhC0TNqXleBwX9ns/tracks';

// REQUEST PARAMS
reqVars = {
    YEAR:'year'
}

// PARAMETERS
var PARAMETERS = '?fields=items(track(name,href,artists,id,preview_url,uri,album(images)))&limit=10&offset=0'

// TRACKS
var tracks = []

var Message = function(success, object, errors) {
    return {success: success, object: object, errors: errors};
}

var nextChannel = -1;
var currentChannel = -1;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

/**
 * Serial 
 */

var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
portName = process.argv[2];

var myPort = new SerialPort(portName, {
    baudRate: 9600,
    parser: serialport.parsers.readline('\r\n')
}, false);

var PortOperations = {
    
    initialize: function(callback) {
        
        myPort.open(function (error) {
        
        if ( error ) {
            console.log('failed to open: '+ error);
            callback(error);
        } else {
            console.log('open');
            myPort.on('data', function(data) {

                nextChannel = data;
                if (currentChannel != nextChannel) {
                    // channel changed
                    console.log('data received: ' + data);
                    // Request for a playlist
                    console.log('currentChannel != nextChannel');
                    switch (data) {
                        case '0':
                            console.log('==============>1920\'s channel');
                            playlist.request(1920);
                            break;
                        case '1':
                            console.log('==============>1930\'s channel');
                            playlist.request(1930);
                            break;
                        case '2':
                            console.log('==============>1940\'s channel');
                            playlist.request(1940);
                            break;
                        case '3':
                            console.log('==============>1950\'s channel');
                            playlist.request(1950);
                            break;
                        case '4':
                            console.log('==============>1960\'s channel');
                            playlist.request(1960);
                            break;
                        case '5':
                            console.log('==============>1970\'s channel');
                            playlist.request(1970);
                            break;
                        case '6':
                            console.log('==============>1980\'s channel');
                            playlist.request(1980);
                            break;
                        case '7':
                            console.log('==============>1990\'s channel');
                            playlist.request(1990);
                            break;
                        case '8':
                            console.log('==============>2000\'s channel');
                            playlist.request(2000);
                            break;
                        case '9':
                            console.log('==============>2010\'s channel');
                            playlist.request(2010);
                            break;

                    }
                    currentChannel = nextChannel;
                }

            });
            myPort.write("ls\n", function(err, results) {

                if (err) {
                    console.log('err ' + err);
                } else {
                    console.log('results ' + results);
                }

            });
            callback(null);
        }
        });
    },
    
    write: function(track){
        myPort.write(track.track_name + '\n' + track.artist + '\n', function(err, results){
            if (err) {
                console.log('err ' + err);
            } else {
                console.log('results ' + results);
            }
        });
    }
}

var playlist = {
    
    request: function(year){
        
        console.log('======================================================');
        console.log('The requested year is ' + year);
        var YEAR_URL;
        switch (year) {
            case 1920:
                YEAR_URL = TWENTIES_PLAYLIST_URL;
                break;
            case 1930:
                YEAR_URL = THIRTIES_PLAYLIST_URL;
                break;
            case 1940:
                YEAR_URL = FOURTIES_PLAYLIST_URL;
                break;
            case 1950:
                YEAR_URL = FIFTIES_PLAYLIST_URL;
                break;
            case 1960:
                YEAR_URL = SIXTIES_PLAYLIST_URL;
                break;
            case 1970:
                YEAR_URL = SEVENTIES_PLAYLIST_URL;
                break;
            case 1980:
                YEAR_URL = EIGHTIES_PLAYLIST_URL;
                break;
            case 1990:
                YEAR_URL = NINETIES_PLAYLIST_URL;
                break;
            case 2000:
                YEAR_URL = TWO_THOUSANDS_PLAYLIST_URL;
                break;
            case 2010:
                YEAR_URL = TWENTY_TENS_PLAYLIST_URL;
        }

        console.log('year is ' + YEAR_URL);
        var options = {
            url: YEAR_URL + PARAMETERS,
            headers: {'Authorization': 'Bearer ' + my_access_token},
            json: true
        };

        // Makes a request to the spotify api

        request.get(options, function(error, response, body){

            if (error) {

            } else {
                tracks = response.body.items;
                current_tracks = models.createTrackObjects(tracks);
                track_index = 0;
                console.log(JSON.stringify(current_tracks));
            }

        });
    }
    
}

/*
 *  GPIO
 */
var gpio = require('rpi-gpio');
var notifyPin = 7;

var gpiopins = {
    
    initialize: function(){
        gpio.setup(notifyPin, gpio.DIR_OUT);
    },
    
    write: function(pin, value, callback) {
        console.log('===========================================');
        console.log('write ' + value + ' to pin ' + pin);
        gpio.write(pin, value, callback);
    }
}

/** 
 * Server calls for Spotify authentication
 */

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

/* Login to Spotify for access token */
app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

/* Callback url for when the access token is received */
app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {

            var access_token = body.access_token,
                refresh_token = body.refresh_token;
            
            // Global tokens to set
            my_access_token = access_token;
            my_refresh_token = refresh_token;
            
            var options = {
              url: 'https://api.spotify.com/v1/me',
              headers: { 'Authorization': 'Bearer ' + access_token },
              json: true
            };

            // use the access token to access the Spotify Web API
            request.get(options, function(error, response, body) {
              console.log(body);
            });
            
            // we can also pass the token to the browser to make requests from there
            res.redirect('/#' +
              querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token
              }));
            } else {
            res.redirect('/#' +
              querystring.stringify({
                error: 'invalid_token'
              }));
            }
            
            PortOperations.initialize(function(err){
            
                if (err) {
                    console.log(err);
                } else {
                    
                }
            });
            
            });
        }
});

/* Refresh the token */
app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

app.get('/current_year', function(req,res){
    res.send(currentChannel);
});

app.get('/next_track', function(req,res){
    
    console.log('==================================================');
    console.log('Get the next track');

    track_index++;
    
    console.log('next track is ' + JSON.stringify(current_tracks[track_index]);

    res.send(current_tracks[track_index]);
});

/* Make a get request for the 20's playlist*/
app.get('/getPlaylist', function(req,res){
    
    var YEAR_URL;
    console.log('year = ' + req.query.year);
    var year = req.query.year;
    switch (year) {
        case '1920':
            YEAR_URL = TWENTIES_PLAYLIST_URL;
            break;
        case '1930':
            YEAR_URL = THIRTIES_PLAYLIST_URL;
            break;
        case '1940':
            YEAR_URL = FOURTIES_PLAYLIST_URL;
            break;
        case '1950':
            YEAR_URL = FIFTIES_PLAYLIST_URL;
            break;
        case '1960':
            YEAR_URL = SIXTIES_PLAYLIST_URL;
            break;
        case '1970':
            YEAR_URL = SEVENTIES_PLAYLIST_URL;
            break;
        case '1980':
            YEAR_URL = EIGHTIES_PLAYLIST_URL;
            break;
        case '1990':
            YEAR_URL = NINETIES_PLAYLIST_URL;
            break;
        case '2000':
            YEAR_URL = TWO_THOUSANDS_PLAYLIST_URL;
            break;
    }
    
    console.log('year is ' + YEAR_URL);
    var options = {
        url: YEAR_URL + PARAMETERS,
        headers: {'Authorization': 'Bearer ' + my_access_token},
        json: true
    };
    
    // Makes a request to the spotify api
    
    request.get(options, function(error, response, body){
        
        if (error) {
            
        } else {
            tracks = response.body.items;
            res.send(Message(true, models.createTrackObjects(tracks), []));
        }
        
    });
});

app.listen(8888, function(){
    
    console.log('Listening on 8888');
    
});
