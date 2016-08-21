function runMiniGame2 () {
    document.getElementById("start").style.visibility = "hidden";
    var game = new Phaser.Game(1920, 1080, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
    var question;
    var titleText;
    var score = 0;
    var button;
    var scoreText;
    var questionCounter = 0;
	var textFeedback;
	
    //var correct;
    var answer;
    var incorrect1;
    var incorrect2;
    var incorrect3;


    function preload() {
        //questions
        game.load.image('question1', 'minigameMC/assets/m2q1q.png');
        game.load.image('question3', 'minigameMC/assets/m2q3q.png');
        game.load.image('question2', 'minigameMC/assets/m2q2q.png');
        
        //question 1 choices
        game.load.image('q1c', 'minigameMC/assets/m2q1c.png');
        game.load.image('q1i1', 'minigameMC/assets/m2q1i1.png');
        game.load.image('q1i2', 'minigameMC/assets/m2q1i2.png');
        game.load.image('q1i3', 'minigameMC/assets/m2q1i3.png');
        
        //question 2 choices
        game.load.image('q2c', 'minigameMC/assets/m2q2c.png');
        game.load.image('q2i1', 'minigameMC/assets/m2q2i1.png');
        game.load.image('q2i2', 'minigameMC/assets/m2q2i2.png');
        game.load.image('q2i3', 'minigameMC/assets/m2q2i3.png');
        
        //question 3 choices
        game.load.image('q3c', 'minigameMC/assets/m2q3c.png');
        game.load.image('q3i1', 'minigameMC/assets/m2q3i1.png');
        game.load.image('q3i2', 'minigameMC/assets/m2q3i2.png');
        game.load.image('q3i3', 'minigameMC/assets/m2q3i3.png');
        
        //visual aids
        game.load.image('correct', 'minigameMC/assets/correct.png');
        game.load.image('incorrect', 'minigameMC/assets/incorrect.png');
    }

    function create() {
        game.stage.backgroundColor = '#000000';
        
        question = game.add.image(game.world.centerX, game.world.centerY - 150, 'question1');
        question.scale.setTo(0.4, 0.4);
        question.anchor.set(0.5);
        
        answer = game.add.button(game.world.centerX, question.y + 100, 'q1c', correctAnswer);
        answer.scale.setTo(0.4, 0.4);
        answer.anchor.set(0.5);
        
        incorrect1 = game.add.button(game.world.centerX, answer.y + 75, 'q1i1', incorrectAnswer);
        incorrect1.scale.setTo(0.4, 0.4);
        incorrect1.anchor.set(0.5);
        
        incorrect2 = game.add.button(game.world.centerX, answer.y + 150, 'q1i2', incorrectAnswer);
        incorrect2.scale.setTo(0.4, 0.4);
        incorrect2.anchor.set(0.5);
        
        incorrect3 = game.add.button(game.world.centerX, answer.y + 225, 'q1i3', incorrectAnswer);
        incorrect3.scale.setTo(0.4, 0.4);
        incorrect3.anchor.set(0.5);
        
        var style = {font: "56px Arial", fill: "#ffffff", fontStyle: "oblique"};
        titleText = game.add.text(game.world.centerX, 35, "Aggieland Trivia", style);
        titleText.anchor.set(0.5);
        
        scoreText = game.add.text(game.world.centerX, game.world.centerY + 250, "Score: " + score + "/3", {font: "30px Arial", fill: "#ffffff"});
        scoreText.anchor.set(0.5);
    }

    function update() {}
    function render() {}

    function correctAnswer() {
        var audio = new Audio("audio/correct.mp3");
        audio.play();

        if(questionCounter < 3){
            var checkMark;
            score += 1;
            scoreText.text = "Score: " + score + "/3";

            checkMark = game.add.image(game.world.width - 75, game.world.height - 75, 'correct');
            checkMark.scale.setTo(0.3, 0.3);
            checkMark.anchor.set(0.5);
            checkMark.alpha = 1;
            game.add.tween(checkMark).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, 0);
            questionCounter++;
            nextQuestion();
        }
        
        if(questionCounter == 3){
            var style = {font: "42px Arial", fill: "#ffffff"};
			textFeedback = game.add.text(game.world.centerX, game.height - 250, "You will receive $" + rewardCounter(), style);
			textFeedback.anchor.set(0.5);
			textFeedback.alpha = 0;
			game.add.tween(textFeedback).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 0, 0);
			
            incorrect1.inputEnabled = false;
            incorrect2.inputEnabled = false;
            incorrect3.inputEnabled = false;
            answer.inputEnabled = false;

			setTimeout(function(){App[App.myRole].money += rewardCounter();
				socket.emit("updateBoard", App);
				game.destroy();
				document.getElementById("start").style.visibility = "visible";}
				,3250);
        }
    }

    function incorrectAnswer(){
        var audio = new Audio("audio/incorrect.mp3");
        audio.play();
        if(questionCounter < 3){    
            var cross;
            cross = game.add.image(game.world.width - 75, game.world.height - 75, 'incorrect');
            cross.scale.setTo(0.3, 0.3);
            cross.anchor.set(0.5);
            cross.alpha = 1;
            game.add.tween(cross).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, 0);
            questionCounter++;
            nextQuestion();
        }
        
        if(questionCounter == 3){
            var style = {font: "42px Arial", fill: "#ffffff"};
			textFeedback = game.add.text(game.world.centerX, game.height - 250, "You will receive $" + rewardCounter(), style);
			textFeedback.anchor.set(0.5);
			textFeedback.alpha = 0;
			game.add.tween(textFeedback).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 0, 0);
			
            incorrect1.inputEnabled = false;
            incorrect2.inputEnabled = false;
            incorrect3.inputEnabled = false;
            answer.inputEnabled = false;
            
			setTimeout(function(){App[App.myRole].money += rewardCounter();
				socket.emit("updateBoard", App);
				game.destroy();
				document.getElementById("start").style.visibility = "visible";}
				,3250);
        }
    }

    function rewardCounter(){
        return 50 * score;
    }

    function nextQuestion(){
        if(questionCounter == 1){
            question.kill();
            question = game.add.image(game.world.centerX, game.world.centerY - 150, 'question2');
            question.scale.setTo(0.4, 0.4);
            question.anchor.set(0.5);
            
            incorrect1.kill();
            incorrect1 = game.add.button(game.world.centerX, question.y + 100, 'q2i3', incorrectAnswer);
            incorrect1.scale.setTo(0.4, 0.4);
            incorrect1.anchor.set(0.5);
            
            answer.kill();
            answer = game.add.button(game.world.centerX, incorrect1.y + 75, 'q2c', correctAnswer);
            answer.scale.setTo(0.4, 0.4);
            answer.anchor.set(0.5);
            
            incorrect2.kill();
            incorrect2 = game.add.button(game.world.centerX, incorrect1.y + 150, 'q2i1', incorrectAnswer);
            incorrect2.scale.setTo(0.4, 0.4);
            incorrect2.anchor.set(0.5);
            
            incorrect3.kill();
            incorrect3 = game.add.button(game.world.centerX, incorrect1.y + 225, 'q2i2', incorrectAnswer);
            incorrect3.scale.setTo(0.4, 0.4);
            incorrect3.anchor.set(0.5);
        }
        
        if(questionCounter == 2){
            question.kill();
            question = game.add.image(game.world.centerX, game.world.centerY - 150, 'question3');
            question.scale.setTo(0.4, 0.4);
            question.anchor.set(0.5);
            
            incorrect2.kill();
            incorrect2 = game.add.button(game.world.centerX, question.y + 100, 'q3i1', incorrectAnswer);
            incorrect2.scale.setTo(0.4, 0.4);
            incorrect2.anchor.set(0.5);
            
            answer.kill();
            answer = game.add.button(game.world.centerX, incorrect2.y + 75, 'q3c', correctAnswer);
            answer.scale.setTo(0.4, 0.4);
            answer.anchor.set(0.5);
            
            incorrect1.kill();
            incorrect1 = game.add.button(game.world.centerX, incorrect2.y + 150, 'q3i2', incorrectAnswer);
            incorrect1.scale.setTo(0.4, 0.4);
            incorrect1.anchor.set(0.5);
            
            
            incorrect3.kill();
            incorrect3 = game.add.button(game.world.centerX, incorrect2.y + 225, 'q3i3', incorrectAnswer);
            incorrect3.scale.setTo(0.4, 0.4);
            incorrect3.anchor.set(0.5);
        }
    }
}