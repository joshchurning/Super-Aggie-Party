var RandomNumberBetween = function (min, max) {
	var number =  Math.floor((Math.random() * max) + min);
	
	// Uncomment this block to see these output in the console
	// console.log("min = " + min);
	// console.log("max = " + max);
	// console.log("random number is " + number);

	return number;	
}

var RollDice = function() {
	var number = RandomNumberBetween(1,3);
	
	// Uncomment this line to see the output in the console
	console.log("Player rolled a " + number);

	return number;
}

ShowImage = function (src, height, width, caption) {
	var image = document.createElement("img");
	image.src = src;
	image.height = height;
	image.width = width;
	image.alt =  caption;

	document.body.appendChild(image);
}

Reset = function () {
	var image = document.getElementById("Dice");
	image.src = "Dice/Start.svg";
}

var ShowRollDice = function () {
	var image = document.getElementById("Dice");

	var numberRolled = RollDice();

	switch (numberRolled) {
		case 1:
			image.src="Dice/1.svg"
			break;
		case 2:
			image.src="Dice/2.svg"
			break;
		case 3:
			image.src="Dice/3.svg"
			break;
		case 4:
			image.src="Dice/4.svg"
			break;
		case 5:
			image.src="Dice/5.svg"
			break;
		case 6:
			image.src="Dice/6.svg"
			break;
		
	}

	var audio = new Audio("audio/dice.wav");
	audio.play();

	return numberRolled;
}