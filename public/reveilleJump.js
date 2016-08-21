function runMiniGameRev () {
    document.getElementById("start").style.visibility = "hidden";
    var game = new Phaser.Game(1920, 1080, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
    var platforms;
    var dog;
    var gates;
    var score = 0;
    var scoreText;
    var spaceKey;
    var timer;
    var flag;
    var reward = rewardCounter();
	var instruction;
	var textFeedback;
    
    function preload(){
        game.load.image('dog', 'assets/bird.png');
        game.load.image('fence', 'assets/pipe.png');
        game.load.image('ground', 'assets/platform.png');
    }
    
    function create(){
        game.stage.backgroundColor = '#000000';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        platforms = game.add.group();
        platforms.enableBody = true;
        
        var ground = platforms.create(0, game.world.height - 32, 'ground');
        ground.scale.setTo(10,2);
        ground.body.immovable = true;
        
        dog = game.add.sprite(50, game.world.height - 200, 'dog');
        game.physics.arcade.enable(dog);
        dog.body.gravity.y = 500;
        dog.body.collideWorldBounds = true;
        
        gates = game.add.group();
        timer = game.time.events.loop(1500, addToGame, this);
        scoreText = game.add.text(16, 16, "0", { fontSize: '32px', fill: '#fff' });

        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(jump);
		
		var style1 = {font: "32px Arial", fill: "#ffffff"};
		instruction = game.add.text(game.world.centerX, 16, "Press Spacebar key to jump over obstacles!", style1);
		instruction.anchor.set(0.5);
        
    }
    
    function update(){
        game.physics.arcade.collide(dog,platforms);
        game.physics.arcade.overlap(dog, gates, hitGate, null, this);
        
    }
    
    function render(){
        
    }
    
    function jump(){
        if(dog.alive == false) return;
        
        if(dog.body.touching.down){
			var audio = new Audio("assets/jump.wav");
			audio.play();
            dog.body.velocity.y = -300;
        }
    }
    
    function addFence(x,y){
        var gate = game.add.sprite(x, y, 'fence');
        gates.add(gate);
        game.physics.arcade.enable(gate);
        gate.body.velocity.x = -200;
        gate.checkWorldBounds = true;
        gate.outofBoundsKill = true;
    }
    
    function addToGame(){
        if(score < 25){
            addFence(1920, game.world.height - 85);
            setTimeout(function(){score += 1;}, 1500);
            scoreText.text = score;
            console.log(rewardCounter());
        }
        if(score == 25){
            var style = {font: "42px Arial", fill: "#ffffff"};
			textFeedback = game.add.text(game.world.centerX, game.world.centerY, "You have reached the max score limit. You will receive $" + rewardCounter(), style);
			textFeedback.anchor.set(0.5);
			textFeedback.alpha = 0;
			game.add.tween(textFeedback).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 0, 0);
			
			setTimeout(function(){App[App.myRole].money += rewardCounter();
				socket.emit("updateBoard", App);
				game.destroy();
				document.getElementById("start").style.visibility = "visible";}
				,3250);
        }
    }
    
    function hitGate() {
        if(dog.alive == false)
            return;

        dog.alive = false;

        game.time.events.remove(timer);

        gates.forEach(function(p){
            p.body.velocity.x = 0;
        }, this);
        console.log(rewardCounter());

		var style = {font: "42px Arial", fill: "#ffffff"};
		textFeedback = game.add.text(game.world.centerX, game.world.centerY, "You will receive $" + rewardCounter(), style);
		textFeedback.anchor.set(0.5);
		textFeedback.alpha = 0;
		game.add.tween(textFeedback).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 0, 0);
		
		setTimeout(function(){App[App.myRole].money += rewardCounter();
			socket.emit("updateBoard", App);
			game.destroy();
			document.getElementById("start").style.visibility = "visible";}
			,3250);
    }
    
    function rewardCounter(){
        if(score < 25){
            return 10 * score;
        }
        else{ 
            return 250;
        } 
    }
}      