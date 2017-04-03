window.onload = function(){
	
}

var bars = {
    'Blue' : {
    	'identity'	: 0,
        'music' : "track1",
        'sound' : "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
    },
    'Red' : {
    	'identity'	: 1,
        'music' : "track2",
        'sound' : "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
    },
    'Yellow' : {
    	'identity'	: 2,
    	'music' : "track3",
    	'sound' : "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
    },
    'Green' : {
    	'identity'	: 3,
    	'music' : "track4",
    	'sound' : "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
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
	onOffSwitch = document.getElementById("powerSwitch"),
	easyHardSwitch = document.getElementById("easyHardSwitch"),
	display = document.getElementById("displayText");
	difficulty = 1000,
	sequenceTimer = 900;

function turnOnOff(element){
	animate(element);
	if (element.classList.contains("onOff")){
		sequenceList = [];
		display.innerHTML = 0;
		addToSequence();
	} else {
		reset();
		display.innerHTML = "";		
	}
	clickSound();
}

function selectDifficulty(element){
	animate(element);
	if (element.classList.contains("hard")){
		difficulty = 500;
		sequenceTimer = 400;
	} else {
		difficulty = 1000;
		sequenceTimer = 900;
	}
	setTimeout(addToSequence, 5000);
}

function addToSequence(){
	sequenceList.push(getRandomNumber(0,3));
	console.log(sequenceList);
	computerPlay();
}

function playerTurn(barButton){
	var barID = barButton.getAttribute("id");
	lightUpBar(barID);
	console.log(bars[barID].identity);
	if (bars[barID].identity == sequenceList[playerIndex]){
		checkLengthForWin();
	} else {
		console.log("Wrong!");
		//add function to add a "no click" class to all the bars
		//then call computerPlay()
	}
	//check function to check if player input the right button according to sequence List
}

function checkLengthForWin(){
	if(playerIndex+1 === 20){
		console.log("You Win!");
	} else if((playerIndex+1) === sequenceList.length){
		playerIndex = 0;
		setTimeout(addToSequence, 1000);
	} else {
		playerIndex++;
		console.log(playerIndex);
	}
}
function lightUpBar(bar){
	var barAudio = new Audio(bars[bar].sound);
	barAudio.play();
}

function computerPlay(){
	var index = 0;

	var nextOnList = setInterval(function(){
		if (index === sequenceList.length-1){
			clearInterval(nextOnList);
		} 
		lightUpBar(barType[sequenceList[index]]);
		document.getElementById(barType[sequenceList[index]]).classList.toggle("activeClass");

		if (index >= 9){
			displayText.innerHTML = index+1;
		} else {
			displayText.innerHTML = "0" + (index+1);
		}

		setTimeout(function(){
			if (onOffSwitch.classList.contains("onOff") != true){
			clearInterval(nextOnList);
		}
			document.getElementById(barType[sequenceList[index]]).classList.remove("activeClass");
			index = (index + 1) % sequenceList.length;
		},sequenceTimer)
		
	},difficulty);
}

function reset(){
	for (j=0; j<4; j++){
				document.getElementById(barType[j]).classList.remove("activeClass");
				computerPlaying = false;
			}
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
