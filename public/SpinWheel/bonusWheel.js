function runBonusWheel () {
	document.getElementById("start").style.visibility = "hidden";
	var game = new Phaser.Game( 1920, 1080, Phaser.AUTO, "",{ preload: preload, create: create, update: update, render: render });
	var wheel; 
	var pin;
	var canSpin;
	var sections = 8;
	var sectionNames = [ "Bankrupt!", "Gain $100!", "Lose $10!", "Gain $20!","Lose $50!","Gain $50!","Lose $20!","Gain $75!", "Bankrupt!"];
	var reward;
	var rewardName;

	function preload(){     
		game.load.image('wheel', 'SpinWheel/MoneyWheel.png');
  		game.load.image('pin', 'SpinWheel/pin.png');  
        game.load.image('instructions','SpinWheel/BonusWheelInstructions.png');
        game.load.image('title','SpinWheel/WheelofAg.png');
     }
    
    function create(){
         game.stage.backgroundColor = "#000000";
         wheel = game.add.sprite(game.world.centerX + 375, game.world.centerY, 'wheel');
         wheel.anchor.set(0.5);
		 
         pin = game.add.sprite(game.world.centerX+375,game.world.centerY, 'pin');
         pin.anchor.set(0.5);
          
         var instructions = game.add.image(450, 420, 'instructions');
         instructions.anchor.set(0.5);
          
         rewardName = game.add.text(game.world.centerX+375, 950, "", {fontsize: '60px',fill: '#ffffff'} );
         rewardName.anchor.set(0.5);
         rewardName.align = "center";
        
         var title = game.add.image(500,75,'title');
         title.anchor.set(0.5);
        
         canSpin = true;
         game.input.onDown.add(spin);	// waits for click input then wheel spins		 
	}
    
	function update (){}
	function render () {}
	
	function spin(){
        if(canSpin){  
			console.log("canspin");
			// canspin = false;
            rewardName.text = ""; // reset text field

			var rounds = game.rnd.between(2,8 ); // wheel spins from 2 to 8 times
			var degrees = game.rnd.between(0, 360);
              
			reward = sections - 1 - Math.floor(degrees / (360 / sections)); // direction is determined by this math function
			canSpin = false;
			
			var audio = new Audio("audio/wheel.wav");
            audio.play();
               
			// creates animation of slowing down when wheel reaches end of spin iteration
			var spinTween = game.add.tween(wheel).to({angle: 360 * rounds + degrees }, 3000, Phaser.Easing.Quadratic.Out, true);
			spinTween.onComplete.add(winPrize);	   
          }
     }
   
    function winPrize (){
		// canSpin = true; // wheel can be spun again
		rewardName.text = sectionNames[reward]; // display what reward was selected

		switch(reward){
			case 0:
				App[App.myRole].money = 0;
				if (App[App.myRole].money < 0) {
					App[App.myRole].money = 0;
				}
				var audio = new Audio("audio/loseMoney.wav");
				audio.play();
				break;
			case 1:
				App[App.myRole].money += 100;
				var audio = new Audio("audio/gameMoney.wav");
				audio.play();
				break;
			case 2:
				App[App.myRole].money -= 10;
				if (App[App.myRole].money < 0) {
					App[App.myRole].money = 0;
				}
				var audio = new Audio("audio/loseMoney.wav");
				audio.play();
				break;
			case 3:
				App[App.myRole].money += 20;
				var audio = new Audio("audio/gainMoney.wav");
				audio.play();
				break;
			case 4:
				App[App.myRole].money -= 50;
				if (App[App.myRole].money < 0) {
					App[App.myRole].money = 0;
				}
				var audio = new Audio("audio/loseMoney.wav");
				audio.play();
				break;
			case 5:
				App[App.myRole].money += 50;
				var audio = new Audio("audio/gainMoney.wav");
				audio.play();
				break;
			case 6:
				App[App.myRole].money -= 20;
				if (App[App.myRole].money < 0) {
					App[App.myRole].money = 0;
				}
				var audio = new Audio("audio/loseMoney.wav");
				audio.play();
				break;    
			case 7:
				App[App.myRole].money += 75;
				var audio = new Audio("audio/gainMoney.wav");
				audio.play();
				break;
		} 
	   
		setTimeout(endGame,3000);            
    }
	
	function endGame() { // exits wheel and goes back to board
		socket.emit("updateBoard", App);
		game.destroy();
		document.getElementById("start").style.visibility = "visible";
	}
}