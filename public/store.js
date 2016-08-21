function runStore() {
    document.getElementById("start").style.visibility = "hidden";
    
    //create game stage
    var game = new Phaser.Game(1920, 1080, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render});
            var pencil;
            var pen;
            var calculator;
            var books;
            var laptop;
            var coffee;
            var candyBar;
            var fastFood;
            var tacos;
            var titleText;
            var exit;
            var determine; //this variable is used to see what is being bought.
            var buy;
            var cashText;
			var textFeedback;
            
            function preload(){
                //pencil
                game.load.image('pencil_title', 'Store/pencil/title.png');
                game.load.image('pencil_image', 'Store/pencil/image.png');
                game.load.image('pencil_description', 'Store/pencil/description.png');
                game.load.image('pencil_damage', 'Store/pencil/damage.png');
                game.load.image('pencil_cost', 'Store/pencil/cost.png');
                
                //pen
                game.load.image('pen_title', 'Store/pen/title.png');
                game.load.image('pen_image', 'Store/pen/image.png');
                game.load.image('pen_description', 'Store/pen/description.png');
                game.load.image('pen_damage', 'Store/pen/damage.png');
                game.load.image('pen_cost', 'Store/pen/cost.png');
                
                //calculator
                game.load.image('calculator_title', 'Store/calculator/title.png');
                game.load.image('calculator_image', 'Store/calculator/image.png');
                game.load.image('calculator_description', 'Store/calculator/description.png');
                game.load.image('calculator_damage', 'Store/calculator/damage.png');
                game.load.image('calculator_cost', 'Store/calculator/cost.png');
                
                //books
                game.load.image('books_title', 'Store/books/title.png');
                game.load.image('books_image', 'Store/books/image.png');
                game.load.image('books_description', 'Store/books/description.png');
                game.load.image('books_damage', 'Store/books/damage.png');
                game.load.image('books_cost', 'Store/books/cost.png');
                
                //laptop
                game.load.image('laptop_title', 'Store/laptop/title.png');
                game.load.image('laptop_image', 'Store/laptop/image.png');
                game.load.image('laptop_description', 'Store/laptop/description.png');
                game.load.image('laptop_damage', 'Store/laptop/damage.png');
                game.load.image('laptop_cost', 'Store/laptop/cost.png');
                
                //coffee
                game.load.image('coffee_title', 'Store/coffee/title.png');
                game.load.image('coffee_image', 'Store/coffee/image.png');
                game.load.image('coffee_description', 'Store/coffee/description.png');
                game.load.image('coffee_health', 'Store/coffee/health.png');
                game.load.image('coffee_cost', 'Store/coffee/cost.png');
                
                //candy bar
                game.load.image('candyBar_title', 'Store/candy_bar/title.png');
                game.load.image('candyBar_image', 'Store/candy_bar/image.png');
                game.load.image('candyBar_description', 'Store/candy_bar/description.png');
                game.load.image('candyBar_health', 'Store/candy_bar/health.png');
                game.load.image('candyBar_cost', 'Store/candy_bar/cost.png');
                
                //fast Food
                game.load.image('fastFood_title', 'Store/greasy_fast_food/title.png');
                game.load.image('fastFood_image', 'Store/greasy_fast_food/image.png');
                game.load.image('fastFood_description', 'Store/greasy_fast_food/description.png');
                game.load.image('fastFood_health', 'Store/greasy_fast_food/health.png');
                game.load.image('fastFood_cost', 'Store/greasy_fast_food/cost.png');
                
                //tacos
                game.load.image('taco_title', 'Store/fuego_breakfast_taco/title.png');
                game.load.image('taco_image', 'Store/fuego_breakfast_taco/image.png');
                game.load.image('taco_description', 'Store/fuego_breakfast_taco/description.png');
                game.load.image('taco_health', 'Store/fuego_breakfast_taco/health.png');
                game.load.image('taco_cost', 'Store/fuego_breakfast_taco/cost.png');
                
                //buy button
                game.load.image('buyButton', 'Store/buyButton.png');
                
                //exit store button
                game.load.image('exitButton', 'Store/exitButton.png');
            }
            
            function create(){
                game.stage.backgroundColor = "#000000";
                
                //title text
                var style = {font: "56px Arial", fill: "#ffffff", fontStyle: "oblique"};
                titleText = game.add.text(game.world.centerX, 35, "MSC Bookstore", style);
                titleText.anchor.set(0.5);
                
                //add our buttons in a vertical alignment towards the left side. Basically our list of items available
                pencil = game.add.button(game.world.centerX - 450, 175, 'pencil_title', pencilClick, this);
                pencil.scale.setTo(0.4, 0.4);
                pencil.anchor.set(0.5);
                
                pen = game.add.button(game.world.centerX - 450, pencil.y + 60, 'pen_title', penClick);
                pen.scale.setTo(0.4, 0.4);
                pen.anchor.set(0.5);
                
                calculator = game.add.button(game.world.centerX - 450, pencil.y + 120, 'calculator_title', calcClick);
                calculator.scale.setTo(0.4, 0.4);
                calculator.anchor.set(0.5);
                
                books = game.add.button(game.world.centerX - 450, pencil.y + 180, 'books_title', bookClick);
                books.scale.setTo(0.4, 0.4);
                books.anchor.set(0.5);
                
                laptop = game.add.button(game.world.centerX - 450, pencil.y + 240, 'laptop_title', laptopClick);
                laptop.scale.setTo(0.4, 0.4);
                laptop.anchor.set(0.5);
                
                coffee = game.add.button(game.world.centerX - 450, pencil.y + 300, 'coffee_title', coffeeClick);
                coffee.scale.setTo(0.4, 0.4);
                coffee.anchor.set(0.5);
                
                candyBar = game.add.button(game.world.centerX - 450, pencil.y + 360, 'candyBar_title', candyBarClick);
                candyBar.scale.setTo(0.4, 0.4);
                candyBar.anchor.set(0.5);
                
                fastFood = game.add.button(game.world.centerX - 450, pencil.y + 420, 'fastFood_title', foodClick);
                fastFood.scale.setTo(0.4, 0.4);
                fastFood.anchor.set(0.5);
                
                tacos = game.add.button(game.world.centerX - 450, pencil.y + 480, 'taco_title', tacoClick);
                tacos.scale.setTo(0.4, 0.4);
                tacos.anchor.set(0.5);
                
                exit = game.add.button(game.world.centerX - 450, game.height - 200, 'exitButton', exitStore);
                exit.scale.setTo(0.4, 0.4);
                exit.anchor.set(0.5);

                buy = game.add.button(game.world.centerX + 450, game.height - 200, 'buyButton', buyItem);
                buy.scale.setTo(0.4, 0.4);
                buy.anchor.set(0.5);
                
                var style1 = {font: "52px Arial", fill: "#ffffff"};
                cashText = game.add.text(game.world.centerX, game.height - 200, "$" + App[App.myRole].money + " remaining", style1);
                cashText.anchor.set(0.5);
            }
            
            function update(){}
            function render(){}
            
            //exit the store 
            function exitStore(){
                console.log("Player has exit the store!");
                game.destroy();
				updateHeathAndMoneyDisplay(App);
                document.getElementById("start").style.visibility = "visible";          
            }
            
            //states you do not have enough money to buy current item
            function insufficientFunds() {
                console.log("Player does not have enough money");
				var style = {font: "42px Arial", fill: "#ffffff"};
				textFeedback = game.add.text(game.world.centerX, game.height - 275, "You don't have enough funds to buy this!", style);
				textFeedback.anchor.set(0.5);
				textFeedback.alpha = 1;
				game.add.tween(textFeedback).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 0, 0, 0);
                //alert("You don't have enough money");
            }
            
            //adds to players global inventory
            function addToInventory(determine) {
                App[App.myRole].inventory[determine-1].quantity++;
            }
            
            //buy the item. if the money is not enough, insufficientFunds() is called. Adds the item to player's inventory
            function buyItem(){
                var money = App[App.myRole].money;
                if(determine == 1){
                    if (money < 10) {
                        insufficientFunds();
                    }
                    else {
                        console.log("Player has bought a pencil");
                        var audio = new Audio("audio/spendMoney.wav");
                        audio.play();
                        addToInventory(determine);
                        App[App.myRole].money -= 10;
                        //alert("You bought a pencil");
                        cashText.kill();
                        var style1 = {font: "40px Arial", fill: "#ffffff"};
                        cashText = game.add.text(game.world.centerX, game.height - 200, "$" + App[App.myRole].money + " remaining", style1);
                        cashText.anchor.set(0.5);
						
						var style = {font: "42px Arial", fill: "#ffffff"};
						textFeedback = game.add.text(game.world.centerX, game.height - 275, "You just bought a pencil!", style);
						textFeedback.anchor.set(0.5);
						textFeedback.alpha = 1;
						game.add.tween(textFeedback).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 0, 0, 0);
						
                    }
                }
                
                else if(determine == 2){
                    if (money < 20) {
                        insufficientFunds();
                    }
                    else {
                        console.log("Player has bought a pen");
                        var audio = new Audio("audio/spendMoney.wav");
                        audio.play();
                        addToInventory(determine);
                        App[App.myRole].money -= 20;
                        //alert("You bought a pen");
                        cashText.kill();
                        var style1 = {font: "40px Arial", fill: "#ffffff"};
                        cashText = game.add.text(game.world.centerX, game.height - 200, "$" + App[App.myRole].money + " remaining", style1);
                        cashText.anchor.set(0.5);
						
						var style = {font: "42px Arial", fill: "#ffffff"};
						textFeedback = game.add.text(game.world.centerX, game.height - 275, "You just bought a pen!", style);
						textFeedback.anchor.set(0.5);
						textFeedback.alpha = 1;
						game.add.tween(textFeedback).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 0, 0, 0);
                    }
                }
                
                else if(determine == 3){
                    if (money < 25) {
                        insufficientFunds();
                    }
                    else {
                        console.log("Player has bought a calculator");
                        addToInventory(determine);
                        var audio = new Audio("audio/spendMoney.wav");
                        audio.play();
                        App[App.myRole].money -= 25;
                        //alert("You bought a calculator");
                        cashText.kill();
                        var style1 = {font: "40px Arial", fill: "#ffffff"};
                        cashText = game.add.text(game.world.centerX, game.height - 200, "$" + App[App.myRole].money + " remaining", style1);
                        cashText.anchor.set(0.5);
						
						var style = {font: "42px Arial", fill: "#ffffff"};
						textFeedback = game.add.text(game.world.centerX, game.height - 275, "You just bought a calculator!", style);
						textFeedback.anchor.set(0.5);
						textFeedback.alpha = 1;
						game.add.tween(textFeedback).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 0, 0, 0);
                    }
                }
                
                else if(determine == 4){
                    if (money < 45) {
                        insufficientFunds();
                    }
                    else {
                        console.log("Player has bought books");
                        var audio = new Audio("audio/spendMoney.wav");
                        audio.play();
                        addToInventory(determine);
                        App[App.myRole].money -= 45;
                        //alert("You bought some books");
                        cashText.kill();
                        var style1 = {font: "40px Arial", fill: "#ffffff"};
                        cashText = game.add.text(game.world.centerX, game.height - 200, "$" + App[App.myRole].money + " remaining", style1);
                        cashText.anchor.set(0.5);
						
						var style = {font: "42px Arial", fill: "#ffffff"};
						textFeedback = game.add.text(game.world.centerX, game.height - 275, "You just bought some books!", style);
						textFeedback.anchor.set(0.5);
						textFeedback.alpha = 1;
						game.add.tween(textFeedback).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 0, 0, 0);
                    }
                }
                
                else if(determine == 5){
                    if (money < 75) {
                        insufficientFunds();
                    }
                    else {
                        console.log("Player has bought a laptop");
                        var audio = new Audio("audio/spendMoney.wav");
                        audio.play();
                        addToInventory(determine);
                        App[App.myRole].money -= 75;
                        //alert("You bought a laptop");
                        cashText.kill();
                        var style1 = {font: "40px Arial", fill: "#ffffff"};
                        cashText = game.add.text(game.world.centerX, game.height - 200, "$" + App[App.myRole].money + " remaining", style1);
                        cashText.anchor.set(0.5);
						
						var style = {font: "42px Arial", fill: "#ffffff"};
						textFeedback = game.add.text(game.world.centerX, game.height - 275, "You just bought a laptop!", style);
						textFeedback.anchor.set(0.5);
						textFeedback.alpha = 1;
						game.add.tween(textFeedback).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 0, 0, 0);
                    }
                }
                
                else if(determine == 6){
                    if (money < 15) {
                        insufficientFunds();
                    }
                    else {
                        console.log("Player has bought some coffee");
                        var audio = new Audio("audio/spendMoney.wav");
                        audio.play();
                        addToInventory(determine);
                        App[App.myRole].money -= 15;
                        //alert("You bought a coffee");
                        cashText.kill();
                        var style1 = {font: "40px Arial", fill: "#ffffff"};
                        cashText = game.add.text(game.world.centerX, game.height - 200, "$" + App[App.myRole].money + " remaining", style1);
                        cashText.anchor.set(0.5);
						
						var style = {font: "42px Arial", fill: "#ffffff"};
						textFeedback = game.add.text(game.world.centerX, game.height - 275, "You just bought some coffee!", style);
						textFeedback.anchor.set(0.5);
						textFeedback.alpha = 1;
						game.add.tween(textFeedback).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 0, 0, 0);
                    }
                }
                
                else if(determine == 7){
                    if (money < 25) {
                        insufficientFunds();
                    }
                    else {
                        console.log("Player has bought a candy bar");
                        var audio = new Audio("audio/spendMoney.wav");
                        audio.play();
                        addToInventory(determine);
                        App[App.myRole].money -= 25;
                        //alert("You bought a candy bar");
                        cashText.kill();
                        var style1 = {font: "40px Arial", fill: "#ffffff"};
                        cashText = game.add.text(game.world.centerX, game.height - 200, "$" + App[App.myRole].money + " remaining", style1);
                        cashText.anchor.set(0.5);
						
						var style = {font: "42px Arial", fill: "#ffffff"};
						textFeedback = game.add.text(game.world.centerX, game.height - 275, "You just bought a candy bar!", style);
						textFeedback.anchor.set(0.5);
						textFeedback.alpha = 1;
						game.add.tween(textFeedback).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 0, 0, 0);
                    }
                }
                
                else if(determine == 8){
                    if (money < 45) {
                        insufficientFunds();
                    }
                    else {
                        console.log("Player has bought some fast food");
                        var audio = new Audio("audio/spendMoney.wav");
                        audio.play();
                        addToInventory(determine);
                        App[App.myRole].money -= 45;
                        //alert("You bought some greasy fast food");
                        cashText.kill();
                        var style1 = {font: "40px Arial", fill: "#ffffff"};
                        cashText = game.add.text(game.world.centerX, game.height - 200, "$" + App[App.myRole].money + " remaining", style1);
                        cashText.anchor.set(0.5);
						
						var style = {font: "42px Arial", fill: "#ffffff"};
						textFeedback = game.add.text(game.world.centerX, game.height - 275, "You just bought some fast food!", style);
						textFeedback.anchor.set(0.5);
						textFeedback.alpha = 1;
						game.add.tween(textFeedback).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 0, 0, 0);
                    }
                }
                
                else if(determine == 9){
                    if (money < 75) {
                        insufficientFunds();
                    }
                    else {
                        console.log("Player has bought a Fuego Taco");
                        var audio = new Audio("audio/spendMoney.wav");
                        audio.play();
                        addToInventory(determine);
                        App[App.myRole].money -= 75;
                        //alert("You bought some fuego tacos");
                        cashText.kill();
                        var style1 = {font: "40px Arial", fill: "#ffffff"};
                        cashText = game.add.text(game.world.centerX, game.height - 200, "$" + App[App.myRole].money + " remaining", style1);
                        cashText.anchor.set(0.5);
						
						var style = {font: "42px Arial", fill: "#ffffff"};
						textFeedback = game.add.text(game.world.centerX, game.height - 275, "You just bought a scrumptious Fuego taco!", style);
						textFeedback.anchor.set(0.5);
						textFeedback.alpha = 1;
						game.add.tween(textFeedback).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 0, 0, 0);
                    }
                }
                
                //update the inventory of the player
                updateInventoryDisplay();
                
                //update the health and money of the player on the board
                updateHeathAndMoneyDisplay();
            }
            
            //load other images based on what button is clicked. Basically add more info about item and adds option to buy
            function pencilClick(){ 
                var pencilImage;
                var pencilDesc;
                var pencilDamage;
                var pencilCost;
                
                console.log("Player clicked on pencil button");
                
                determine = 1;
                
                pencilImage = game.add.image(game.world.centerX + 450, 250, 'pencil_image');
                pencilImage.scale.setTo(0.5, 0.5);
                pencilImage.anchor.set(0.5);
               
                pencilDesc = game.add.image(game.world.centerX + 450, pencilImage.y + 150, 'pencil_description');
                pencilDesc.scale.setTo(0.4, 0.4);
                pencilDesc.anchor.set(0.5);
                
                pencilDamage = game.add.image(game.world.centerX + 450, pencilDesc.y + 85, 'pencil_damage');
                pencilDamage.scale.setTo(0.4, 0.4);
                pencilDamage.anchor.set(0.5);
                
                pencilCost = game.add.image(game.world.centerX + 450, pencilDesc.y + 170, 'pencil_cost');
                pencilCost.scale.setTo(0.4, 0.4);
                pencilCost.anchor.set(0.5);  
            }
            
            function penClick(){
                var penImage;
                var penDesc;
                var penDamage;
                var penCost;
                
                console.log("Player clicked on pen button");
                
                determine = 2;
                
                penImage = game.add.image(game.world.centerX + 450, 250, 'pen_image');
                penImage.scale.setTo(0.5, 0.5);
                penImage.anchor.set(0.5);
               
                penDesc = game.add.image(game.world.centerX + 450, penImage.y + 150, 'pen_description');
                penDesc.scale.setTo(0.4, 0.4);
                penDesc.anchor.set(0.5);
                
                penDamage = game.add.image(game.world.centerX + 450, penDesc.y + 85, 'pen_damage');
                penDamage.scale.setTo(0.4, 0.4);
                penDamage.anchor.set(0.5);
                
                penCost = game.add.image(game.world.centerX + 450, penDesc.y + 170, 'pen_cost');
                penCost.scale.setTo(0.4, 0.4);
                penCost.anchor.set(0.5);
            }
            
            function calcClick(){
                var calculatorImage;
                var calculatorDesc;
                var calculatorDamage;
                var calculatorCost;
                
                console.log("Player clicked on calculator button");
                
                determine = 3;
                
                calculatorImage = game.add.image(game.world.centerX + 450, 250, 'calculator_image');
                calculatorImage.scale.setTo(0.5, 0.5);
                calculatorImage.anchor.set(0.5);
               
                calculatorDesc = game.add.image(game.world.centerX + 450, calculatorImage.y + 150, 'calculator_description');
                calculatorDesc.scale.setTo(0.4, 0.4);
                calculatorDesc.anchor.set(0.5);
                
                calculatorDamage = game.add.image(game.world.centerX + 450, calculatorDesc.y + 85, 'calculator_damage');
                calculatorDamage.scale.setTo(0.4, 0.4);
                calculatorDamage.anchor.set(0.5);
                
                calculatorCost = game.add.image(game.world.centerX + 450, calculatorDesc.y + 170, 'calculator_cost');
                calculatorCost.scale.setTo(0.4, 0.4);
                calculatorCost.anchor.set(0.5);
            }
            
            function bookClick(){
                var booksImage;
                var booksDesc;
                var booksDamage;
                var booksCost;
                
                console.log("Player clicked on book button");
                
                determine = 4;
                
                booksImage = game.add.image(game.world.centerX + 450, 250, 'books_image');
                booksImage.scale.setTo(0.5, 0.5);
                booksImage.anchor.set(0.5);
               
                booksDesc = game.add.image(game.world.centerX + 450, booksImage.y + 150, 'books_description');
                booksDesc.scale.setTo(0.4, 0.4);
                booksDesc.anchor.set(0.5);
                
                booksDamage = game.add.image(game.world.centerX + 450, booksDesc.y + 85, 'books_damage');
                booksDamage.scale.setTo(0.4, 0.4);
                booksDamage.anchor.set(0.5);
                
                booksCost = game.add.image(game.world.centerX + 450, booksDesc.y + 170, 'books_cost');
                booksCost.scale.setTo(0.4, 0.4);
                booksCost.anchor.set(0.5);
            }
            
            function laptopClick(){
                var laptopImage;
                var laptopDesc;
                var laptopDamage;
                var laptopCost;
                
                console.log("Player clicked on laptop button");
                
                determine = 5;
                
                laptopImage = game.add.image(game.world.centerX + 450, 250, 'laptop_image');
                laptopImage.scale.setTo(0.5, 0.5);
                laptopImage.anchor.set(0.5);
               
                laptopDesc = game.add.image(game.world.centerX + 450, laptopImage.y + 150, 'laptop_description');
                laptopDesc.scale.setTo(0.4, 0.4);
                laptopDesc.anchor.set(0.5);
                
                laptopDamage = game.add.image(game.world.centerX + 450, laptopDesc.y + 85, 'laptop_damage');
                laptopDamage.scale.setTo(0.4, 0.4);
                laptopDamage.anchor.set(0.5);
                
                laptopCost = game.add.image(game.world.centerX + 450, laptopDesc.y + 170, 'laptop_cost');
                laptopCost.scale.setTo(0.4, 0.4);
                laptopCost.anchor.set(0.5);
            }
            
            function coffeeClick(){
                var coffeeImage;
                var coffeeDesc;
                var coffeeHealth;
                var coffeeCost;
                
                console.log("Player clicked on coffee button");
                
                determine = 6;
                
                coffeeImage = game.add.image(game.world.centerX + 450, 250, 'coffee_image');
                coffeeImage.scale.setTo(0.5, 0.5);
                coffeeImage.anchor.set(0.5);
               
                coffeeDesc = game.add.image(game.world.centerX + 450, coffeeImage.y + 150, 'coffee_description');
                coffeeDesc.scale.setTo(0.4, 0.4);
                coffeeDesc.anchor.set(0.5);
                
                coffeeHealth = game.add.image(game.world.centerX + 450, coffeeDesc.y + 85, 'coffee_health');
                coffeeHealth.scale.setTo(0.4, 0.4);
                coffeeHealth.anchor.set(0.5);
                
                coffeeCost = game.add.image(game.world.centerX + 450, coffeeDesc.y + 170, 'coffee_cost');
                coffeeCost.scale.setTo(0.4, 0.4);
                coffeeCost.anchor.set(0.5);
            }
            
            function candyBarClick(){
                var candyBarImage;
                var candyBarDesc;
                var candyBarHealth;
                var candyBarCost;
                
                console.log("Player clicked on candy bar button");
                
                determine = 7;
                
                candyBarImage = game.add.image(game.world.centerX + 450, 250, 'candyBar_image');
                candyBarImage.scale.setTo(0.5, 0.5);
                candyBarImage.anchor.set(0.5);
               
                candyBarDesc = game.add.image(game.world.centerX + 450, candyBarImage.y + 150, 'candyBar_description');
                candyBarDesc.scale.setTo(0.4, 0.4);
                candyBarDesc.anchor.set(0.5);
                
                candyBarHealth = game.add.image(game.world.centerX + 450, candyBarDesc.y + 85, 'candyBar_health');
                candyBarHealth.scale.setTo(0.4, 0.4);
                candyBarHealth.anchor.set(0.5);
                
                candyBarCost = game.add.image(game.world.centerX + 450, candyBarDesc.y + 170, 'candyBar_cost');
                candyBarCost.scale.setTo(0.4, 0.4);
                candyBarCost.anchor.set(0.5);
            }
            
            function foodClick(){
                var fastFoodImage;
                var fastFoodDesc;
                var fastFoodHealth;
                var fastFoodCost;
                
                console.log("Player clicked on fast food button");
                
                determine = 8;
                
                fastFoodImage = game.add.image(game.world.centerX + 450, 250, 'fastFood_image');
                fastFoodImage.scale.setTo(0.5, 0.5);
                fastFoodImage.anchor.set(0.5);
               
                fastFoodDesc = game.add.image(game.world.centerX + 450, fastFoodImage.y + 150, 'fastFood_description');
                fastFoodDesc.scale.setTo(0.4, 0.4);
                fastFoodDesc.anchor.set(0.5);
                
                fastFoodHealth = game.add.image(game.world.centerX + 450, fastFoodDesc.y + 85, 'fastFood_health');
                fastFoodHealth.scale.setTo(0.4, 0.4);
                fastFoodHealth.anchor.set(0.5);
                
                fastFoodCost = game.add.image(game.world.centerX + 450, fastFoodDesc.y + 170, 'fastFood_cost');
                fastFoodCost.scale.setTo(0.4, 0.4);
                fastFoodCost.anchor.set(0.5);
            }
            
            function tacoClick(){
                var tacoImage;
                var tacoDesc;
                var tacoHealth;
                var tacoCost;
                
                console.log("Player clicked on taco button");
                
                determine = 9;
                
                tacoImage = game.add.image(game.world.centerX + 450, 250, 'taco_image');
                tacoImage.scale.setTo(0.5, 0.5);
                tacoImage.anchor.set(0.5);
               
                tacoDesc = game.add.image(game.world.centerX + 450, tacoImage.y + 150, 'taco_description');
                tacoDesc.scale.setTo(0.4, 0.4);
                tacoDesc.anchor.set(0.5);
                
                tacoHealth = game.add.image(game.world.centerX + 450, tacoDesc.y + 85, 'taco_health');
                tacoHealth.scale.setTo(0.4, 0.4);
                tacoHealth.anchor.set(0.5);
                
                tacoCost = game.add.image(game.world.centerX + 450, tacoDesc.y + 170, 'taco_cost');
                tacoCost.scale.setTo(0.4, 0.4);
                tacoCost.anchor.set(0.5);
            }
}
