
var game;
var wheel; 
var pin;
var canSpin;
var sections = 8;
var sectionNames = ["Turn Right!", "Go Straight!","Turn Right!","Go Straight!","Turn Right!","Go Straight!","Turn Right!"];
var direction;
var directionName;

window.onload = function() {	
	game = new Phaser.Game( 1200, 1000, Phaser.AUTO, "");
     game.state.add("PlayGame",playGame); // builds state to spin wheel
     game.state.start("PlayGame");
}
	
var playGame = function(game){};

playGame.prototype = {
     preload: function(){
          
        game.load.image("wheel", "DetWheel.png");
		game.load.image("pin", "pin.png");  
        game.load.image("instructions","DetWheelInstructions.png");
        game.load.image("title","WheelofAg.png")
     },
  
  	create: function(){
          
  		game.stage.backgroundColor = "#000000";
  		wheel = game.add.sprite(game.world.centerX + 300,350, "wheel");
        wheel.anchor.set(0.5);
        
        pin = game.add.sprite(game.world.centerX+300,350, "pin");
        pin.anchor.set(0.5);
        
        var instructions = game.add.image(350, 350, "instructions");
        instructions.anchor.set(0.5);
        
        directionName = game.add.text(game.world.centerX+320, 520, "" );
        directionName.anchor.set(0.5);
        directionName.align = "center";
           
          
        canSpin = true;
        game.input.onDown.add(this.spin, this);	// waits for click input then wheel spins	
	},
    
     spin(){
         
          if(canSpin){  
               
               directionName.text = ""; // reset text field
               
               var rounds = game.rnd.between(2,8 ); // wheel spins from 2 to 8 times
               var degrees = game.rnd.between(0, 360);
              
               direction = sections - 1 - Math.floor(degrees / (360 / sections)); // direction is determined by this math function
               canSpin = false;
               // creates animation of slowing down when wheel reaches end of spin iteration
               var spinTween = game.add.tween(wheel).to({angle: 360 * rounds + degrees }, 3000, Phaser.Easing.Quadratic.Out, true);
               spinTween.onComplete.add(this.winPrize, this);
          }
     },
   
     winPrize(){
          canSpin = true; // wheel can be spun again
          directionName.text = sectionNames[direction]; // display what direction was selected
         
       
          
     }
}