/**************************************************************
                        Description: 

This script runs the Boss battle using the Phasor.js library. 
When a player battles the boss their current inventory is 
loaded and used to attack the boss or regenerate their health. 
If the defeat the boss they recieve an award, 
but if they lose they recieve a penalty.
**************************************************************/

var bossText3 = [
	"swung and missed!",
	"stared you down! It didn't do much though.",
	"threw a sucker punch while you weren't looking! You feel it instantly.",
	"let out a barrage of punches! It's pretty effective."
];

function bossTextDialogue3(damage) {//boss damage is between 0 to 10
	if(damage == 0) return bossText3[0];
	else if(damage > 0 && damage <= 14) return bossText3[1];
	else if(damage > 14 && damage <= 24) return bossText3[2];
	else if(damage > 24) return bossText3[3];
}

function detectItem(damage) {
	if(damage == 5) return "pencil";
	else if(damage == 10) return "pen";
	else if(damage == 20) return "calculator";
	else if(damage == 35) return "books";
	else if(damage == 60) return "laptop";
	
}

function runBoss3() {
    // Before the boss battle runs they game board should be hidden
    document.getElementById("start").style.visibility = "hidden";

    // All global variables are here
    var game = new Phaser.Game(1000, 900, Phaser.AUTO, '', 
        { preload: preload, create: create, update: update, render: render });

    var playerHealth = App[App.myRole].health;
    var bossHealth = 100; //this would change every boss stage to a bigger number
	var bossName = "A Crimson Stampede";
    // Text objects that will stay static throughout the game
    var pHealthText;
    var bHealthText;
    var vsText;
    var titleText;
	var boss;

    // Text objects that will change in value throughout the game. 
    var remainTextPencil;
    var remainTextPen;
    var remainTextCalculator;
    var remainTextBook;
    var remainTextLaptop;
    var remainTextCoffee;
    var remainTextCandyBar;
    var remainTextFastFood;
    var remainTextTaco;

    // Initialize the battle's inventory from the player's current inventory
    var pencilRemaining = App[App.myRole].inventory[0].quantity;
    var penRemaining = App[App.myRole].inventory[1].quantity;
    var calculatorRemaining = App[App.myRole].inventory[2].quantity;
    var bookRemaining = App[App.myRole].inventory[3].quantity;
    var laptopRemaining = App[App.myRole].inventory[4].quantity;
    var coffeeRemaining = App[App.myRole].inventory[5].quantity;
    var candyBarRemaining = App[App.myRole].inventory[6].quantity;
    var fastFoodRemaining = App[App.myRole].inventory[7].quantity;
    var tacoRemaining = App[App.myRole].inventory[8].quantity;
	
	var textFeedback;
	//Global variable definition of buttons
	var textFeedback;
	var pencilButton;
	var penButton;
	var calculatorButton;
	var bookButton;
	var laptopButton;
	var coffeeButton;
	var candyBarButton;
	var fastFoodButton;
	var tacoButton;
	
	var playerName = App[App.myRole].myName;
    // Load all things we may need (mainly images really)
    // Will have to add some sprites later on
    function preload(){
        game.load.image('pencilImage', 'boss/pencil/image.png');
        game.load.image('penImage', 'boss/pen/image.png');
        game.load.image('calculatorImage', 'boss/calculator/image.png');
        game.load.image('bookImage', 'boss/books/image.png');
        game.load.image('laptopImage', 'boss/laptop/image.png');
        game.load.image('coffeeImage', 'boss/coffee/image.png');
        game.load.image('candyBarImage', 'boss/candy_bar/image.png');
        game.load.image('fastFoodImage', 'boss/greasy_fast_food/image.png');
        game.load.image('tacoImage', 'boss/fuego_breakfast_taco/image.png');
		game.load.image('playerSprite1', 'reveille_sprite2.png');
		game.load.image('playerSprite2', 'ring98.gif');
		game.load.image('boss', 'boss/alabamaBoss.png');
    }

    // Actually put all of the objects on the window along with changing attributes 
    // See phasor.js document for clarification
    function create(){
        game.stage.backgroundColor = "#000000";
        var graphics = game.add.graphics(100, 100);
        
        // Title text
        var style = {font: "56px Arial", fill: "#ffffff", fontStyle: "oblique"};
        titleText = game.add.text(game.world.centerX, 35, "Boss Stage", style);
        titleText.anchor.set(0.5);
        
        // Health progress text and the "vs"
        var style1 = {font: "32px Arial", fill: "#ffffff"};
        vsText = game.add.text(game.world.centerX, game.world.centerY - 225, "VS.", style1);
        vsText.anchor.set(0.5);
        
        pHealthText = game.add.text(vsText.x/2, vsText.y + 100, "Health:  " + playerHealth + "/100", style1);
        pHealthText.anchor.set(0.5);
        
        bHealthText = game.add.text(vsText.x + (vsText.x/2), pHealthText.y, "Health:  " + bossHealth + "/100", style1);
        bHealthText.anchor.set(0.5);
        
		var style1 = { font: '20px Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 325 };
		//Dialogue text boxes
		pDialogueText = game.add.text(605, 500, playerName + " approaches a foe!", style1);
		pDialogueText.alpha = 1;
		
		bDialogueText = game.add.text(605, 700, bossName + " draws near!", style1);
		bDialogueText.alpha = 1;
		
        // Draw rectangles to differentiate items  
        graphics.beginFill(0xFFFFFF, 0.7);
        var attackInv = graphics.drawRect(-75, 400, 250, 325); //idk why this is negative x value but it wouldnt display properly, may have to alter this a little
        var healthInv = graphics.drawRect(200, 400, 250, 325);
        var generalInfoPlayer = graphics.drawRect(500, 400, 325, 125);
        var generalInfoBoss = graphics.drawRect(500, 600, 325, 125);
        graphics.endFill();
        window.graphics = graphics;
		
        //attaching sprites into the rectangles from above
		if(App.myRole == "Host"){
			playerSprite = game.add.image(pHealthText.x, pHealthText.y - 100, 'playerSprite1');
			playerSprite.scale.setTo(2,2);
			playerSprite.anchor.set(0.5);
		}
		else if(App.myRole == "Player"){
			playerSprite = game.add.image(pHealthText.x, pHealthText.y - 100, 'playerSprite2');
			playerSprite.scale.setTo(0.5,0.5);
			playerSprite.anchor.set(0.5);
		}
		
		boss = game.add.image(bHealthText.x, bHealthText.y - 100, 'boss');
		boss.scale.setTo(0.5, 0.5);
		boss.anchor.set(0.5);
		
		var youText = game.add.text(playerSprite.x, playerSprite.y - 50, playerName, {font: "24px Arial", fill: "#ffffff"});
		youText.anchor.set(0.5);
        
        // All the buttons to be able to use the attack or gain health
        pencilButton = game.add.button(65, 560, 'pencilImage', pencilClick);
        pencilButton.scale.setTo(0.1, 0.1);
        pencilButton.anchor.set(0.5);
        
        penButton = game.add.button(65, 610, 'penImage', penClick);
        penButton.scale.setTo(0.1, 0.1);
        penButton.anchor.set(0.5);
        
        calculatorButton = game.add.button(65, 660, 'calculatorImage', calculatorClick);
        calculatorButton.scale.setTo(0.1, 0.1);
        calculatorButton.anchor.set(0.5);
        
        bookButton = game.add.button(65, 710, 'bookImage', bookClick);
        bookButton.scale.setTo(0.1, 0.1);
        bookButton.anchor.set(0.5);
        
        laptopButton = game.add.button(65, 760, 'laptopImage', laptopClick);
        laptopButton.scale.setTo(0.1, 0.1);
        laptopButton.anchor.set(0.5);
        
        coffeeButton = game.add.button(340, 560, 'coffeeImage', coffeeClick);
        coffeeButton.scale.setTo(0.1, 0.1);
        coffeeButton.anchor.set(0.5);
        
        candyBarButton = game.add.button(340, 610, 'candyBarImage', candyBarClick);
        candyBarButton.scale.setTo(0.1, 0.1);
        candyBarButton.anchor.set(0.5);
        
        fastFoodButton = game.add.button(340, 660, 'fastFoodImage', fastFoodClick);
        fastFoodButton.scale.setTo(0.1, 0.1);
        fastFoodButton.anchor.set(0.5);
        
        tacoButton = game.add.button(340, 710, 'tacoImage', tacoClick);
        tacoButton.scale.setTo(0.1, 0.1);
        tacoButton.anchor.set(0.5);
        
        // Some words to help understand columns 
        var damageTextA = game.add.text(145, 520, "damage", {font: "15px Arial", fill: "#000000"});
        damageTextA.anchor.set(0.5);
        
        var remainTextA = game.add.text(240, 520, "remain", {font: "15px Arial", fill: "#000000"});
        remainTextA.anchor.set(0.5);
        
        var healthTextH = game.add.text(415, 520, "health", {font: "15px Arial", fill: "#000000"});
        healthTextH.anchor.set(0.5);
        
        var remainTextH = game.add.text(510, 520, "remain", {font: "15px Arial", fill: "#000000"});
        remainTextH.anchor.set(0.5);
        
        // Damage/health info for each item
        var damageTextPencil = game.add.text(145, 560, "5", {font: "15px Arial", fill: "#000000"});
        damageTextPencil.anchor.set(0.5);
        
        var damageTextPen = game.add.text(145, 610, "10", {font: "15px Arial", fill: "#000000"});
        damageTextPen.anchor.set(0.5);
        
        var damageTextCalculator = game.add.text(145, 660, "20", {font: "15px Arial", fill: "#000000"});
        damageTextCalculator.anchor.set(0.5);
        
        var damageTextBook = game.add.text(145, 710, "35", {font: "15px Arial", fill: "#000000"});
        damageTextBook.anchor.set(0.5);
        
        var damageTextLaptop = game.add.text(145, 760, "60", {font: "15px Arial", fill: "#000000"});
        damageTextLaptop.anchor.set(0.5);
        
        var healthTextCoffee = game.add.text(415, 560, "10", {font: "15px Arial", fill: "#000000"});
        healthTextCoffee.anchor.set(0.5);
        
        var healthTextCandyBar = game.add.text(415, 610, "20", {font: "15px Arial", fill: "#000000"});
        healthTextCandyBar.anchor.set(0.5);
        
        var healthTextFastFood = game.add.text(415, 660, "35", {font: "15px Arial", fill: "#000000"});
        healthTextFastFood.anchor.set(0.5);
        
        var healthTextTaco = game.add.text(415, 710, "60", {font: "15px Arial", fill: "#000000"});
        healthTextTaco.anchor.set(0.5);
        
        // Remaining info. will decrease each time a corresponding button is clicked
        remainTextPencil = game.add.text(240, 560, pencilRemaining, {font: "15px Arial", fill: "#000000"});
        remainTextPencil.anchor.set(0.5);
        
        remainTextPen = game.add.text(240, 610, penRemaining, {font: "15px Arial", fill: "#000000"});
        remainTextPen.anchor.set(0.5);
        
        remainTextCalculator = game.add.text(240, 660, calculatorRemaining, {font: "15px Arial", fill: "#000000"});
        remainTextCalculator.anchor.set(0.5);
        
        remainTextBook = game.add.text(240, 710, bookRemaining, {font: "15px Arial", fill: "#000000"});
        remainTextBook.anchor.set(0.5);
        
        remainTextLaptop = game.add.text(240, 760, laptopRemaining, {font: "15px Arial", fill: "#000000"});
        remainTextLaptop.anchor.set(0.5);
        
        remainTextCoffee = game.add.text(510, 560, coffeeRemaining, {font: "15px Arial", fill: "#000000"});
        remainTextCoffee.anchor.set(0.5);
        
        remainTextCandyBar = game.add.text(510, 610, candyBarRemaining, {font: "15px Arial", fill: "#000000"});
        remainTextCandyBar.anchor.set(0.5);
        
        remainTextFastFood = game.add.text(510, 660, fastFoodRemaining, {font: "15px Arial", fill: "#000000"});
        remainTextFastFood.anchor.set(0.5);
        
        remainTextTaco = game.add.text(510, 710, tacoRemaining, {font: "15px Arial", fill: "#000000"});
        remainTextTaco.anchor.set(0.5);

        checkStatus();
        
    }

    function update(){}
    function render(){}

    function pencilClick(){
        console.log("Player tried to use a pencil");
        if(pencilRemaining > 0){
            pencilRemaining--;
            remainTextPencil.text = pencilRemaining;
            attackBoss(5);
            bossAttacks();
        }
    }

    function penClick(){
        console.log("Player tried to use a pen");
        if(penRemaining > 0){
            penRemaining--;
            remainTextPen.text = penRemaining;
            attackBoss(10);
            bossAttacks();
        }
    }

    function calculatorClick(){
        console.log("Player tried to use a calculator");
        if(calculatorRemaining > 0){
            calculatorRemaining--;
            remainTextCalculator.text = calculatorRemaining;
            attackBoss(20);
            bossAttacks();
        }
    }

    function bookClick(){
        console.log("Player tried to use a book");
        if(bookRemaining > 0){
            bookRemaining--;
            remainTextBook.text = bookRemaining;
            attackBoss(35);
            bossAttacks();
        }
    }

    function laptopClick(){
        console.log("Player tried to use a laptop");
        if(laptopRemaining > 0){
            laptopRemaining--;
            remainTextLaptop.text = laptopRemaining;
            attackBoss(60);
            bossAttacks();
        }
    }

    function coffeeClick(){
        console.log("Player tried to use a coffee");
        if(coffeeRemaining > 0){
            coffeeRemaining--;
            remainTextCoffee.text = coffeeRemaining;
            blessUp(10);
        }
    }

    function candyBarClick(){
        console.log("Player tried to use a candy bar");
        if(candyBarRemaining > 0){
            candyBarRemaining--;
            remainTextCandyBar.text = candyBarRemaining;
            blessUp(20);
        }
    }

    function fastFoodClick(){
        console.log("Player tried to use fast food");
        if(fastFoodRemaining > 0){
            fastFoodRemaining--;
            remainTextFastFood.text = fastFoodRemaining;
            blessUp(35);
        }
    }

    function tacoClick(){
        console.log("Player tried to use a taco");
        if(tacoRemaining > 0){
            tacoRemaining--;
            remainTextTaco.text = tacoRemaining;
            blessUp(60);
        }
    }
    
    //increase players health and update the changes to the player health status text
    function blessUp(x){
        console.log("Player health increased by " + x);
        if(playerHealth > 0){
            playerHealth += x;
            if(playerHealth > 100){
                playerHealth = 100;
            }
            pHealthText.text = "Health:  " + playerHealth + "/100";
        }    
    }
    
    //attack the boss using the specified damage (x) and update the boss's health in the boss's health status text
    function attackBoss(x){
        console.log("Player did " + x + " damage");
        if(bossHealth > 0){
			pDialogueText.text = "Threw " + detectItem(x) + " at boss!"
            bossHealth -= x;
            bHealthText.text =  "Health:  " + bossHealth + "/100" 
            if(bossHealth <= 0){ // Player defeated the boss
				var style = {font: "42px Arial", fill: "#ffffff"};
				textFeedback = game.add.text(game.world.centerX, game.height - 45, "You beat the boss! You will receive $200", style);
				textFeedback.anchor.set(0.5);
				textFeedback.alpha = 0;
				game.add.tween(textFeedback).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 0, 0);
				pencilButton.inputEnabled = false;
				penButton.inputEnabled = false;
				calculatorButton.inputEnabled = false;
				bookButton.inputEnabled = false;
				laptopButton.inputEnabled = false;
				coffeeButton.inputEnabled = false;
				candyBarButton.inputEnabled = false;
				fastFoodButton.inputEnabled = false;
				tacoButton.inputEnabled = false;
				
				setTimeout(function(){document.getElementById("start").style.visibility = "visible";
					updateEndingInventory();
					App[App.myRole].boss3 = true;                
					UpdatePlayer(200);
					socket.emit("updateBoard", App);
					game.destroy();}
					,3250);
            }
        }
    }
    
    //update the inventory of the player
    function updateEndingInventory() {
        App[App.myRole].inventory[0].quantity = pencilRemaining;
        App[App.myRole].inventory[1].quantity = penRemaining;
        App[App.myRole].inventory[2].quantity = calculatorRemaining;
        App[App.myRole].inventory[3].quantity = bookRemaining;
        App[App.myRole].inventory[4].quantity = laptopRemaining;
        App[App.myRole].inventory[5].quantity = coffeeRemaining;
        App[App.myRole].inventory[6].quantity = candyBarRemaining;
        App[App.myRole].inventory[7].quantity = fastFoodRemaining;
        App[App.myRole].inventory[8].quantity = tacoRemaining;
    }
    
    //check to make sure the player beat the boss or the boss beat the player
    function checkStatus(){
        if(playerHealth <= 0 ? !((pencilRemaining + penRemaining + calculatorRemaining + bookRemaining + laptopRemaining) === 0) : (pencilRemaining + penRemaining + calculatorRemaining + bookRemaining + laptopRemaining) === 0){ 
			//Boss defeated the player
			var style = {font: "42px Arial", fill: "#ffffff"};
			textFeedback = game.add.text(game.world.centerX, game.height - 45, "You lost! Enforcing Penalty!", style);
			textFeedback.anchor.set(0.5);
			textFeedback.alpha = 0;
			game.add.tween(textFeedback).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 0, 0);
			pencilButton.inputEnabled = false;
			penButton.inputEnabled = false;
			calculatorButton.inputEnabled = false;
			bookButton.inputEnabled = false;
			laptopButton.inputEnabled = false;
			coffeeButton.inputEnabled = false;
			candyBarButton.inputEnabled = false;
			fastFoodButton.inputEnabled = false;
			tacoButton.inputEnabled = false;
			setTimeout(function(){document.getElementById("start").style.visibility = "visible";
				updateEndingInventory();
				App[App.myRole].location -= 8;                
				playerHealth = 50;
				UpdatePlayer(0);
				socket.emit("updateBoard", App);
				game.destroy();}
				,3250);
        }
        else if((pencilRemaining + penRemaining + calculatorRemaining + bookRemaining + laptopRemaining) === 0) {
			// Player runs out of items before defeating boss
			var style = {font: "42px Arial", fill: "#ffffff"};
				textFeedback = game.add.text(game.world.centerX, game.height - 45, "You have no more items! Enforcing Penalty!", style);
				textFeedback.anchor.set(0.5);
				textFeedback.alpha = 0;
				game.add.tween(textFeedback).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 0, 0);
				pencilButton.inputEnabled = false;
				penButton.inputEnabled = false;
				calculatorButton.inputEnabled = false;
				bookButton.inputEnabled = false;
				laptopButton.inputEnabled = false;
				coffeeButton.inputEnabled = false;
				candyBarButton.inputEnabled = false;
				fastFoodButton.inputEnabled = false;
				tacoButton.inputEnabled = false;
				
				setTimeout(function(){document.getElementById("start").style.visibility = "visible";
					updateEndingInventory();
					App[App.myRole].location -= 8;
					playerHealth = 50;
					UpdatePlayer(0);
					socket.emit("updateBoard", App);
					game.destroy();}
					,3250);
		}
    }
    
    //randomly generates how much damage the boss does based on the range determined. could be 0 to max value. player's health is updated to reflect changes
    function bossAttacks(){
        console.log("Boss did damage to player");
        var randDamager = Math.floor(Math.random() * (40 - 0 + 1)) + 0; //format is math.random() * (max - min + 1) + min....just in case we want to switch numbers for different bosses.
        var tempDialogue = bossTextDialogue3(randDamager);
		bDialogueText.text = bossName + " " + tempDialogue + " Boss did " + randDamager + " damage to you!"
		if(playerHealth > 0 && bossHealth > 0){
            playerHealth -= randDamager;
            pHealthText.text = "Health:  " + playerHealth + "/100";
            checkStatus();
        }
    }

    function UpdatePlayer(reward) {
        App[App.myRole].money += reward;
        App[App.myRole].health = playerHealth;
    }
}
