// Create a new Express application
var express = require('express');
var app = express();
var http = require('http').Server(app);

// Instantiate Socket.IO and have it listen on server
var io = require('socket.io')(http);

// Load all static files
app.use(express.static('public'));

// Load game javascript file
// This is the backend of the game
var game = require('./game')

// When a user connects to the webpage the initGame function is run
// This brings up the opening start page
io.on('connection', function(socket) {
	console.log('client connected');
	game.initGame(io, socket);
});

// The current port that this is running on is 10018
http.listen(10018, function(){
	console.log("listening on 10018")
})

