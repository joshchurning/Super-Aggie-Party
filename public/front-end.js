// Create socket
var socket = io();

// Socket functions
socket.on('connected', onConnected);
socket.on('newGameCreated', onNewGameCreated);
socket.on('playerJoinedRoom', playerJoinedRoom);
socket.on('beginNewGame', beginNewGame);
socket.on('startGame', startGame);
socket.on('updateBoard', updateBoard);
socket.on('gameOver', gameOver);
socket.on('newChat', newChat);

function onConnected(data) {
    if (data != undefined) {
        App.mySocketID = socket.sessionid;
        console.log(data.message);
    }
}

function onNewGameCreated(data) {
    if (data != undefined) {
        App.Host.gameInit(data);
        console.log("You are hosting Game ID: " + App.gameID);
        joinGame(App.gameID);
    }
}

function playerJoinedRoom(data) {
    if (data != undefined) {
        console.log(App.myRole);
        App[App.myRole].UpdateWait(data);
    }
}

function beginNewGame(data) {
    if (data != undefined) {
        App[App.myRole].gameCountdown(data);
    }
}

function startGame(data) {
    App.Host.myName = data.Host.myName;
    App.Player.myName = data.Player.myName;
    displayPlayerNames(App);
    console.log('I cant believe this worked');
    document.getElementById("gameArea").style.visibility = "hidden";
    document.getElementById("start").style.visibility = "visible";
    updateBoard(App);
}

function gameOver(winner) {
    document.getElementById("start").style.visibility = "hidden";
    document.getElementById("end").style.visibility = "visible";
    if (App.myRole === winner) {
    document.getElementById("winner2").style.visibility = "visible";
    }
    else {
        document.getElementById("winner").innerHTML = "You lost! :("
    }
}

function newChat(message) {
    var chat = document.getElementById("messages");
    var chat2 = document.getElementById("messages2");

    var listItem = document.createElement("LI");
    var newMessage = document.createTextNode(message);
    var listItem2 = document.createElement("LI");
    var newMessage2 = document.createTextNode(message);

    listItem.appendChild(newMessage);
    listItem2.appendChild(newMessage2);

    chat.appendChild(listItem);


    chat2.appendChild(listItem2);

    var elem = document.getElementById('chat');
    elem.scrollTop = elem.scrollHeight;

    var elem2 = document.getElementById('chat2');
    elem2.scrollTop = elem.scrollHeight;

    var audio = new Audio("audio/notification.wav");
    audio.play();
}

// When a player lands on a space this function will determine 
// which action is required and then perform that action
function action(location) {
    var space = document.getElementById(location).innerHTML; // This is the text inside of each space
    var identifer = space.slice(0, 1); // The first character of each space is used to determine the action
    var value = space.slice(1, space.length); // If the actions is a + or - then the rest of string is the value

    switch (identifer) {
        case 'S': // Start
            console.log("Spin Wheel");
            runBonusWheel();
            break;
        case 'M': // Minigame
            console.log("running mini game");
            switch(location){
                case 3:
                    runMiniGame();
                    break;
                case 7:
                    runMiniGameRev();
                    break;
                case 12:
                    runMiniGame2();
                    break
                case 15:
                    runMiniGameRev();
                    break;
                case 23:
                    runMiniGame3();
                    break;
                case 27:
                    runMiniGameRev();
                    break;
                case 32:
                    runMiniGame3();
                    break;
                case 38:
                    runMiniGameRev();
                    break;
            }
            break;
        case 'T': // Ticket Pull
            console.log("running ticket pull");
            runTicketPull();
            break;
        case 'B': // Boss battle
            console.log("running boss battle");
            switch (location) {
                case 11:
                    runBoss();
                    break;
                case 20:
                    runBoss2();
                    break
                case 30:
                    runBoss3();
                    break;
                case 40:
                    runBoss4();
                    break;
            }
            break;
    }
}

// When a player lands on a ticket pull space this function is run
function runTicketPull() {
    // Hide board and show cards
    console.log("showing player the card");
    document.getElementById("cards").style.visibility = "visible";  
    document.getElementById("start").style.visibility = "hidden";  

    var element = document.getElementById("cards");

    if (document.getElementById("ticket")) { // If one card has been displayed already just change the src
        var ticket = document.getElementById("ticket");
        var number = RandomNumberBetween(1,8);
        var src = "cards/card" + number +  ".png";
        ticket.setAttribute("src", src);
    }
    else { // If this is first card to be displayed then create a new image object
        var newTicket = document.createElement("IMG");

        // Display a random card
        var number = RandomNumberBetween(1,8);
        var src = "cards/card" + number +  ".png";
        newTicket.setAttribute("src", src);
        newTicket.setAttribute("id","ticket");
        newTicket.setAttribute("class","ticket");
        element.appendChild(newTicket);
    }

    // Perform ticket action
    switch (number) {
        case 1:
            App[App.myRole].money -= 25;
            break;
        case 2:
            App[App.myRole].money += 15;
            break;
        case 3:
            App[App.myRole].location += 2;
            break;
        case 4:
            App[App.myRole].money -= 50;
            break;
        case 5:
            App[App.myRole].money += 100;
            break;
            App[App.myRole].money += 100;
        case 6:
            App[App.myRole].money -= 100;
            break;
        case 7:
            App[App.myRole].money += 200;
            break;
        case 8:
            App[App.myRole].location -= 5;
            if (App[App.myRole].location < 1) {
                App[App.myRole].location = 1;
            }          
            break;
		
    }
	if(App[App.myRole].money < 0)//prevent players from going to negative money
			App[App.myRole].money = 0;
}

function closeTicket() {
    // Hide cards and show board
    console.log("player closed ticket screen");
    document.getElementById("cards").style.visibility = "hidden";  
    document.getElementById("start").style.visibility = "visible";
      
    // Send new updated game data to the server
    socket.emit("updateBoard", App);
}

// This function updates the board on the client 
// side based on the game data it recieves from the server
function updateBoard(Data) {
    console.log('Updating the board...');

    updatePlayerIcons(Data);
	
    // The dice, help, and store button will glow with it is your turn
    // When it is not your turn a shield will display, preventing you from pushing any buttons
    if (Data.turn === App.myRole) {
        document.getElementById("shield").style.visibility = "hidden";
        document.getElementById("dice-glow").style.borderStyle = "solid";
        document.getElementById("help-glow").style.borderStyle = "solid";
        document.getElementById("store-glow").style.borderStyle = "solid";
    } else {
        document.getElementById("shield").style.visibility = "visible";
        document.getElementById("dice-glow").style.borderStyle = "hidden";
        document.getElementById("help-glow").style.borderStyle = "hidden";
        document.getElementById("store-glow").style.borderStyle = "hidden";
    }

    // Update player stats and inventory
    updateHeathAndMoneyDisplay(Data);
    updateInventoryDisplay();

    Reset();
}

function displayPlayerNames(Data) {
    var playerOneName = Data.Host.myName;
    var playerTwoName = Data.Player.myName;

    var playerOne = document.createTextNode(playerOneName);
    var br = document.createElement("br");
    var playerTwo = document.createTextNode(playerTwoName);

    var cell = document.getElementById("playerNames");
    if (cell != null) {
        cell.appendChild(playerOne);
        cell.appendChild(br); 
        cell.appendChild(playerTwo);
    }
}

function updatePlayerIcons(Data) {
    var newlocationHost = Data.Host.location;
    var oldLocationHost = Data.Host.oldLocation;
    var newlocationPlayer = Data.Player.location;
    var oldLocationPlayer = Data.Player.oldLocation;

    var oldRev = document.getElementById("rev");
    var oldRing = document.getElementById("ring");

    if (oldRev != null){
        oldRev.parentNode.removeChild(oldRev);
    }

    if (oldRing != null){
        oldRing.parentNode.removeChild(oldRing);
    }

    var rev = document.createElement("IMG");
    rev.setAttribute("src", "reveille_sprite2.png");
    rev.className = "icon";
    rev.id = "rev";

    var ring = document.createElement("IMG");
    ring.setAttribute("src", "ring98.gif");
    ring.className = "icon";
    ring.id = "ring";

    var newHostCell = document.getElementById(newlocationHost.toString());
    var newPlayerCell = document.getElementById(newlocationPlayer.toString());

    newHostCell.appendChild(rev);
    newPlayerCell.appendChild(ring);


}

function updateHeathAndMoneyDisplay(Data) {
    //var health = document.getElementById("healthValue");
    //var money = document.getElementById("moneyValue");

    var hostHealth = Data.Host.health;
    var hostMoney = Data.Host.money;
	var playerHealth = Data.Player.health;
    var playerMoney = Data.Player.money;
    //health.innerHTML = playerHealth + "/100";
    //money.innerHTML = playerMoney;
	var hostHealthString = hostHealth + "/100"; 
	var hostMoneyString = "$ " + hostMoney;
	var playerHealthString = playerHealth + "/100"; 
	var playerMoneyString = "$ " + playerMoney;
	document.getElementById("HostHealth").innerHTML = hostHealthString;
	document.getElementById("HostMoney").innerHTML = hostMoneyString;
	document.getElementById("PlayerHealth").innerHTML = playerHealthString;
	document.getElementById("PlayerMoney").innerHTML = playerMoneyString;
}

function updateInventoryDisplay() {
    document.getElementById("pencilVal").innerHTML = 'x' + App[App.myRole].inventory[0].quantity;
    document.getElementById("penVal").innerHTML = 'x' + App[App.myRole].inventory[1].quantity;
    document.getElementById("calcVal").innerHTML = 'x' + App[App.myRole].inventory[2].quantity;
    document.getElementById("booksVal").innerHTML = 'x' + App[App.myRole].inventory[3].quantity;
    document.getElementById("laptopVal").innerHTML = 'x' + App[App.myRole].inventory[4].quantity;
    document.getElementById("coffeeVal").innerHTML = 'x' + App[App.myRole].inventory[5].quantity;
    document.getElementById("candyVal").innerHTML = 'x' + App[App.myRole].inventory[6].quantity;
    document.getElementById("fastFoodVal").innerHTML = 'x' + App[App.myRole].inventory[7].quantity;
    document.getElementById("tacoVal").innerHTML = 'x' + App[App.myRole].inventory[8].quantity;
}

function getItems() {
	App[App.myRole].inventory[0].quantity += 10;
	App[App.myRole].inventory[1].quantity += 10;
	App[App.myRole].inventory[2].quantity += 10;
	App[App.myRole].inventory[3].quantity += 10;
	App[App.myRole].inventory[4].quantity += 10;
	App[App.myRole].inventory[5].quantity += 10;
	App[App.myRole].inventory[6].quantity += 10;
	App[App.myRole].inventory[7].quantity += 10;
	App[App.myRole].inventory[8].quantity += 10;
	App[App.myRole].money = 300;
	updateInventoryDisplay();
	updateHeathAndMoneyDisplay(App);
}

// This variable keeps track of all the game data
// Host = Player 1 (creates game) & Player = Player 2 (joins game)
var App = {
    gameID: 0, // Room number
    myRole: 'Player', // Changes to 'Host' if creating a game
    mySocketID: '',
    turn: 'Host',

    Host: { 
        players: [],
        myName: 'Player 1',
        isNewGame: false,
        numPlayersInRoom: 0,
        location: 1,
        oldLocation: 1,
        health: 100,
        money: 0,
        boss1: false, // Bosses that are defeated
        boss2: false,
        boss3: false,
        boss4: false,
        inventory: [{item: "pencil",quantity: 0}, 
                    {item: "pen",quantity: 0}, 
                    {item: "calculator",quantity: 0}, 
                    {item: "books",quantity: 0}, 
                    {item: "laptop",quantity: 0}, 
                    {item: "coffee",quantity: 0}, 
                    {item: "candy",quantity: 0}, 
                    {item: "food",quantity: 0}, 
                    {item: "tacos",quantity: 0}],

        gameInit: function(data) { // Create game function
            if (data != undefined) {
                App.gameID = data.gameID;
                App.mySocketID = data.mySocketID;
                App.myRole = 'Host';
                App.Host.numPlayersInRoom = 0;
            }
        },

        UpdateWait: function(data) { // Functions runs when the Host joins the room
            App.Host.numPlayersInRoom += 1;
            if (App.Host.numPlayersInRoom == 1) { // Display the game information so player 2 can join
                var heading = document.createElement("h1");
                var node = document.createTextNode("Ask player to join room " + App.gameID);
                heading.appendChild(node);

                var element = document.getElementById("loading");
                element.appendChild(heading);
            }
            if (App.Host.numPlayersInRoom == 2) { // When room has two players, the game begins
                // Show Host that player two has joined
                var heading = document.createElement("h1");
                var node = document.createTextNode("Player 2 has connected");
                heading.appendChild(node);

                var element = document.getElementById("loading");
                element.appendChild(heading);
                document.getElementById("loading").style.visibility = "visible";

                // Send message to the server that the room is full
                console.log('Room is full. Almost ready!');
                socket.emit('serverRoomFull', App.gameID);
            }
        },

        gameCountdown: function(data) { // There is a three second delay from room being full to game starting
            App.Countdown(3, function() {
                socket.emit('serverCountdownFinished', App.gameID);
            });
        },

        movePlayer: function(amount) { // Updates player's old and new location
        // If they have not defeated a boss the player is not allowed to pass it
            document.getElementById("diceShield").style.zIndex = "5"; 

            var newLocation = App.Host.location + amount;
            if (newLocation > 11 && App.Host.boss1 === false) {
                newLocation = 11;
            }
            if (newLocation > 20 && App.Host.boss2 === false) {
                newLocation = 20;
            }
            if (newLocation > 30 && App.Host.boss3 === false) {
                newLocation = 30;
            }
            if (newLocation > 40 && App.Host.boss4 === false) {
                newLocation = 40;
            }
            App.Host.oldLocation = App.Host.location;
            App.Host.location = newLocation;
            // action(App.Host.location);
            setTimeout(function() {
                document.getElementById("diceShield").style.zIndex = "-1"; 
                action(App.Host.location)

            }, 2000);  
        }

    },

    Player: {   // Player 2's data
        hostSocketID: '',
        myName: 'Player 2',
        location: 1,
        oldLocation: 1,
        health: 100,
        money: 0,
        boss1: false, // Bosses that are defeated 
        boss2: false,
        boss3: false,
        boss4: false,
        inventory: [{item: "pencil",quantity: 0}, 
                    {item: "pen",quantity: 0}, 
                    {item: "calculator",quantity: 0}, 
                    {item: "books",quantity: 0}, 
                    {item: "laptop",quantity: 0}, 
                    {item: "coffee",quantity: 0}, 
                    {item: "candy",quantity: 0}, 
                    {item: "food",quantity: 0}, 
                    {item: "tacos",quantity: 0}],


        UpdateWait: function(data) { // Function runs when player joins room
            App.gameID = data.room;

            var heading = document.createElement("h1");
            var node = document.createTextNode("You are connected");
            heading.appendChild(node);
            var element = document.getElementById("loading");
            element.appendChild(heading);

            document.getElementById("loading").style.visibility = "visible";
            console.log("update wait");
        },

        gameCountdown: function(data) {
            App.Player.hostSocketID = data.mySocketID;
            App.Countdown(3, function() { });
        },

        movePlayer: function(amount) { // Updates player's old and new location
        // If they have not defeated a boss the player is not allowed to pass it 
            
            document.getElementById("diceShield").style.zIndex = "5"; 

            var newLocation = App.Player.location + amount;
            if (newLocation > 11 && App.Player.boss1 === false) {
                newLocation = 11;
            }
            if (newLocation > 20 && App.Player.boss2 === false) {
                newLocation = 20;
            }
            if (newLocation > 30 && App.Player.boss3 === false) {
                newLocation = 30;
            }
            if (newLocation > 40 && App.Player.boss4 === false) {
                newLocation = 40;
            }
            App.Player.oldLocation = App.Player.location;
            App.Player.location = newLocation;
            // action(App.Player.location);
            setTimeout(function() {
                document.getElementById("diceShield").style.zIndex = "-1"; 
                action(App.Player.location)

            }, 2000);  
        }

    },

    // This is the game countdown function that 
    // creates a 3 second delay between room being full and game starting
    Countdown: function(startTime, callback) {
        var timer = setInterval(CountItDown, 1000);
		var audio = new Audio("audio/h_countdown.wav");
            audio.play();
        function CountItDown() {
            startTime -= 1;
            //var audio = new Audio("audio/h_countdown.wav");
            //audio.play();
            console.log(startTime);
            if (startTime <= 0) {
                console.log('Countdown Finished');

                clearInterval(timer);
                callback();
                return;
            }
        }
    }
}

function newGame() { // Sends a message to the server when Host clicks create game
    console.log("Create new game");
    socket.emit('serverCreateNewGame', name);
}

function joinGame1() { // Join game function for player two
    var x = document.getElementById("form");
    var name = x.elements[0].value;
    if (name == '') {
        name = "Player 2";
    }
    if (name.length > 8) {
        name =  name.substring(0,8);
    }
    var room = x.elements[1].value;
    var data = { name, room };
    console.log("Trying to join room " + data.room);
    socket.emit('clientJoinGame2', data); // Send message to server to join game
}

function joinGame(room) { // Join game function for Host
    // The room is not needed in this function because the Host creates the game
    var x = document.getElementById("form");
    var name = x.elements[0].value;
    if (name == ''){
        name = "Player 1";    
    }
    if (name.length > 8) {
        name =  name.substring(0,8);
    }
    var data = {
        name,
        room
    };
    console.log("Trying to join room " + data.room);
    socket.emit('clientJoinGame', data); // Send message to server to join game
}

function displayHelp() {
    console.log("player clicked on help button");
    document.getElementById("start").style.visibility = "hidden";
    document.getElementById("gameArea").style.visibility = "hidden";
    document.getElementById("help").style.visibility = "visible";
}

function closeHelp() {
    console.log("closing help screen");
    document.getElementById("start").style.visibility = "visible";
    document.getElementById("help").style.visibility = "hidden";
}

function bossInfo(bossid) {
	var bossID = bossid;
	
	if(bossID == 11) {//boss 1
		console.log(bossID);
		//document.getElementById("bossName").style.color="black";
		document.getElementById("bossName1").innerHTML = "Kentucky";
		document.getElementById("bossHealth1").innerHTML = "25";
		document.getElementById("bossDamage1").innerHTML = "0-10";
	}
	else if(bossID == 20) {//boss 2
		console.log(bossID);
		document.getElementById("bossName2").innerHTML = "LSU";
		document.getElementById("bossHealth2").innerHTML = "50";
		document.getElementById("bossDamage2").innerHTML = "0-20";
	}
	else if(bossID == 30) {//boss 3
		console.log(bossID);
		document.getElementById("bossName3").innerHTML = "Alabama";
		document.getElementById("bossHealth3").innerHTML = "100";
		document.getElementById("bossDamage3").innerHTML = "0-40";
	}
	else if(bossID == 40) {//boss 4
		console.log(bossID);
		document.getElementById("bossName4").innerHTML = "t.u.";
		document.getElementById("bossHealth4").innerHTML = "200";
		document.getElementById("bossDamage4").innerHTML = "0-60";
	}
	else {//something bad happened
		console.log("boss id not valid: "+bossID)
	}
}
function chat() {
    var form = document.getElementById("chatForm");
    var message = form.elements[0].value;
    var gameID = App.gameID;
    var name = App[App.myRole].myName;
    var data = {
        gameID,
        name,
        message
    }
    console.log("sending message: " + message);
	form.reset();
    socket.emit('sendChat', data);
}

function chat2() {
    var form = document.getElementById("chatForm2");
    var message = form.elements[0].value;
    var gameID = App.gameID;
    var name = App[App.myRole].myName;
    var data = {
        gameID,
        name,
        message
    }
    console.log("sending message: " + message);
    form.reset();
    socket.emit('sendChat', data);
}

function stopRKey(evt) { 
  var evt = (evt) ? evt : ((event) ? event : null); 
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
  if ((evt.keyCode == 13) && (node.type=="text"))  {return false;} 
} 

document.onkeypress = stopRKey;
