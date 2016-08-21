var io;
var gameSocket;
var rooms = [];

var Room = function(name) { // Room object
	this.name = name;
	this.players = 0;
}

function AddRoom (name) { // Adds a room to array keeping track of all rooms
	var room = new Room(name);
	var index =  rooms.length;
	rooms[index] = room;
}

function IndexOfRoom (room) { // returns the index in the array "Rooms" of a particular room
	var index = -1;
	for (var i=0; i<rooms.length; i++) {
		if (room == rooms[i].name) {
			index = i;
		}
	}
	return index;
}

function DoesRoomExist (room) { // Checks to make sure a room # has been created and returns a boolean
	var index = IndexOfRoom(room);
	
	if (index == -1) {
		return false;
	}
	else {
		return true;
	}
}

function IsRoomFull (room) { // Checks to see if a room has two people and returns a boolean
	var index = IndexOfRoom(room);
	if (rooms[index].players >= 2) {
		return true;
	}
	else {
		return false;
	}
}

exports.initGame = function(sio, socket) { // Function runs when a user connects to port number
	// Get socket information
	io = sio;
	gameSocket = socket;

	// Send a message to the user that they are connected
	gameSocket.emit('connected', {message : "You are connected!"});

	// Server functions
	gameSocket.on('serverCreateNewGame', serverCreateNewGame);
	gameSocket.on('serverRoomFull', serverPrepareGame);
	gameSocket.on('serverCountdownFinished', serverStartGame);
	gameSocket.on('updateBoard', updateBoard);
	gameSocket.on('sendChat', sendChat);

	// Client functions
	gameSocket.on('clientJoinGame', clientJoinGame);
	gameSocket.on('clientJoinGame2', clientJoinGame2);
}

/*********************
Server Functions
*********************/

function serverCreateNewGame() {
	var gameID = (Math.random() * 1000) | 0; // Create a random game room
	AddRoom(gameID);

	// This array stores a copy of an entire game's data 
	// on the server stored where index = room #
	// This copy is updated after actions and sent back to client to display
	backupApp[gameID] = {
        gameID: 0,
        myRole: 'Player',
        mySocketID: '',
        turn : 'Host',

        Host : { // Host (Player 1) data
            players : [],
            myName : 'Player 1',
            isNewGame : false,
            numPlayersInRoom: 0,
            location : 1,
            oldLocation : 1,
            health : 100,
            money : 0,
            boss1 : false, // Bosses that are defeated 
            boss2 : false,
            boss3 : false,
            boss4 : false,
            inventory : [{item: "pencil", quantity: 0},
            			{item: "pen", quantity: 0},
            			{item: "calculator", quantity: 0},
            			{item: "books", quantity: 0},
            			{item: "laptop", quantity: 0},
            			{item: "coffee", quantity: 0},
            			{item: "candy", quantity: 0},
            			{item: "food", quantity: 0},
            			{item: "tacos", quantity: 0}]
        },

        Player : { // Player 2 data
            hostSocketID : '',
            myName : 'Player 2',
            location : 1,
            oldLocation : 1,
            health : 100,
            money : 0,
            boss1 : false, // Bosses that are defeated 
            boss2 : false,
            boss3 : false,
            boss4 : false,
            inventory : [{item: "pencil", quantity: 0},
            			{item: "pen", quantity: 0},
            			{item: "calculator", quantity: 0},
            			{item: "books", quantity: 0},
            			{item: "laptop", quantity: 0},
            			{item: "coffee", quantity: 0},
            			{item: "candy", quantity: 0},
            			{item: "food", quantity: 0},
            			{item: "tacos", quantity: 0}]
        }
    };

    // Send a message to client letting them know the game information has been created
	this.emit('newGameCreated', {gameID : gameID , mySocketID : this.id});
	// console.log("Game ID = " + gameID);
};

// Once the room is full the client sends a message to server to run this function
// Then the server ends a message to both clients to begin the countdown
function serverPrepareGame(gameID) { 
	var socket = this;
	var data = {
		mySocketID : socket.id,
		gameID : gameID
	};
	io.sockets.in(data.gameID).emit('beginNewGame',data);
};

// When the three second countdown has finsihed the client 
// sends a message to the server and then the server sends 
// a message to both client to start the gameplay
function serverStartGame(gameID) {
	console.log('Game Started');
	console.log(backupApp[gameID]);
	io.sockets.in(gameID).emit('startGame', backupApp[gameID]);
};

// This function updates the copy of game data on the server and then sends 
// an updated version to the client to display and tell who's turn it is
function updateBoard(data) {
	// console.log('Updating the board...');

	if (backupApp[data.gameID].Host.boss4 === true){
		io.sockets.in(data.gameID).emit('gameOver', 'Host');
	}
	else if (backupApp[data.gameID].Player.boss4 === true ) {
		io.sockets.in(data.gameID).emit('gameOver', 'Player');
	}
	else {
		// Update the both player's data
		if (data.myRole == "Host") {
			backupApp[data.gameID].Host = data.Host;
			console.log(backupApp[data.gameID].Host);
		}
		else {
			backupApp[data.gameID].Player = data.Player;
			console.log(backupApp[data.gameID].Player);
		}

		// Change the turn to the other player
		if (backupApp[data.gameID].turn === 'Host') {
			backupApp[data.gameID].turn = 'Player';
		}
		else {
			backupApp[data.gameID].turn = 'Host';
		}

		// Send new game data back to the clients
		io.sockets.in(data.gameID).emit('updateBoard', backupApp[data.gameID]);
	}
};

function sendChat(data) {
	var message = data.name + ": " + data.message;
	io.sockets.in(data.gameID).emit('newChat', message);

}

/*********************
Client Functions
*********************/

// When the client joins the game a message is sent to server to run this function
function clientJoinGame(data) {
	// console.log('Player: '+ data.name + ' attempting to join room: ' + data.room);

	// get socket information
	var socket = this;

	if (DoesRoomExist(data.room)) {
		if (!IsRoomFull(data.room)) {
			data.mySocketID = socket.id;
			socket.join(data.room);
			backupApp[data.room].Host.myName = data.name;
			console.log('Player: '+ data.name + ' joined room: ' + data.room);

			// If room exists and is not full then send a message to the client that the join was successful
			io.sockets.in(data.room).emit('playerJoinedRoom', data);
		}
		else {
			console.log("Room is full");
		}
	}
	else {
		console.log("Room does not exists");
	}
}

function clientJoinGame2(data) {
	// console.log('Player: '+ data.name + ' attempting to join room: ' + data.room);

	// get socket information
	var socket = this;

	if (DoesRoomExist(data.room)) {
		if (!IsRoomFull(data.room)) {
			data.mySocketID = socket.id;
			socket.join(data.room);
			backupApp[data.room].Player.myName = data.name;
			console.log('Player: '+ data.name + ' joined room: ' + data.room);

			// If room exists and is not full then send a message to the client that the join was successful
			io.sockets.in(data.room).emit('playerJoinedRoom', data);
		}
		else {
			console.log("Room is full");
		}
	}
	else {
		console.log("Room does not exists");
	}
}

// Array to store all the backup game data
var backupApp = [];





