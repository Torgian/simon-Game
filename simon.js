window.onload = function(){
	preventAllowClicks();//on load, prevent player from clicking the bars
}
//need to think about renaming function lightupbar since all it does is play audio.
var bars = {
    'Blue' : {
    	'identity'	: 0,
        'music' : "track1",
        'sound' : "simonSound2.mp3"
    },
    'Red' : {
    	'identity'	: 1,
        'music' : "track2",
        'sound' : "simonSound1.mp3"
    },
    'Yellow' : {
    	'identity'	: 2,
    	'music' : "track3",
    	'sound' : "simonSound4.mp3"
    },
    'Green' : {
    	'identity'	: 3,
    	'music' : "track4",
    	'sound' : "simonSound3.mp3"
    }
};

var barType = {
	0: 'Blue',
	1: 'Red',
	2: 'Yellow',
	3: 'Green',
}

var sequenceList = [],
	computerPlaying = false,
	playerIndex = 0,
	tryAgain = 0,
	onOffSwitch = document.getElementById("powerSwitch"),
	easyHardSwitch = document.getElementById("easyHardSwitch"),
	display = document.getElementById("displayText");
	difficulty = 1000,
	sequenceTimer = 850;

function turnOnOff(element){
	animate(element);
	if (element.classList.contains("on")){
		sequenceList = [];
		preventAllowClicks();//when turned on, first time will allow player to click the bars, but only momentarily.
		display.innerHTML = 0;
		addToSequence();
	} else {
		resetGame();
		display.innerHTML = "";
	}
	clickSound();
}

function selectDifficulty(element){
	animate(element);
	if (element.classList.contains("hard")){
		difficulty = 600;
		sequenceTimer = 450;
	} else {
		difficulty = 1000;
		sequenceTimer = 850;
	}
}

function playBarAudio(bar){
	var barAudio = new Audio(bars[bar].sound);
	barAudio.play();
}

function addToSequence(){
	sequenceList.push(getRandomNumber(0,3));
	setTimeout(function(){
		computerPlay();
	},1000)
	preventAllowClicks();//prevents player from clicking
}

function computerPlay(){
	var index = 0;
	computerPlaying = true;
	var nextOnList = setInterval(function(){
		if (index === sequenceList.length-1){
			clearInterval(nextOnList);
			computerPlaying = false;
			preventAllowClicks();//after computer's turn ends, allows Player to play
		} 
		playBarAudio(barType[sequenceList[index]]);
		document.getElementById(barType[sequenceList[index]]).classList.toggle("activeClass");

		if (index >= 9){
			displayText.innerHTML = index+1;
		} else {
			displayText.innerHTML = "0" + (index+1);
		}

		setTimeout(function(){
			if (onOffSwitch.classList.contains("on") != true){
			clearInterval(nextOnList);
		}
			document.getElementById(barType[sequenceList[index]]).classList.remove("activeClass");
			index = (index + 1) % sequenceList.length;
		},sequenceTimer)
	},difficulty);
}

function playerTurn(barButton){
	var barID = barButton.getAttribute("id");
	playBarAudio(barID);
	if (bars[barID].identity == sequenceList[playerIndex]){
		checkLengthForWin();
	} else {
		display.innerHTML = "X";
		if (tryAgain === 0){
			tryAgain = tryAgain + 1;
			playerIndex = 0;
			preventAllowClicks();
			computerPlay();
		} else {
			lose();
		}
	}
}

function checkLengthForWin(){
	if(playerIndex+1 === 20){
		win();
	} else if((playerIndex+1) === sequenceList.length){
		playerIndex = 0;
		setTimeout(function(){
			addToSequence();
		}, 400);
	} else {
		playerIndex++;
	}
}

function win(){
	var winAudio = new Audio("Win.mp3");
	winAudio.play();
	display.innerHTML = "W";
	setTimeout(function(){
		resetGame();
	}, 4000);
}

function lose(){
	var loseAudio = new Audio("Lose.mp3");
	loseAudio.play();
	display.innerHTML = ":(";
	setTimeout(function(){
		resetGame();
	}, 4000);
}

function resetGame(){
	for (j=0; j<4; j++){
				document.getElementById(barType[j]).classList.remove("activeClass");
				document.getElementById(barType[j]).classList.add("not-clickable");
			}
	computerPlaying = false;
	tryAgain = 0;
	playerIndex = 0;
	display.innerHTML = 0;
}

function preventAllowClicks(){
	var paths = document.getElementById("GameTable").getElementsByTagName("path");
	for(i=0;i<paths.length;i++){
		paths[i].classList.toggle("not-clickable");
	};
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
