window.onload = function(){
	sequence();

}

var bars = {
    'Blue' : {
        'music' : "track1",
        'sound' : "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
    },
    'Red' : {
        //1: document.getElementById("Red"),
        'music' : "track2",
        'sound' : "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
    },
    'Yellow' : {
    	//2: document.getElementById("Yellow"),
    	'music' : "track3",
    	'sound' : "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
    },
    'Green' : {
    	//3: document.getElementById("Green"),
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

var sequenceList = [2],
	computerPlaying = false,
	onOffSwitch = document.getElementById("powerSwitch"),
	easyHardSwitch = document.getElementById("easyHardSwitch");

function turnOnOff(bar){
	animate(bar);
}

function selectDifficulty(bar){
	animate(bar);
}

function animate(element){
	if (element.getAttribute("id") == "powerSwitch"){
		element.classList.toggle("onOff");	
	} else {
		element.classList.toggle("easyHard");
	}
	//clickSound function call
}

function clickSound(){

}

function sequence(){
	sequenceList.push(getRandomNumber(0,3));
	console.log(sequenceList);
}

function playerTurn(barButton){
	var barID = barButton.getAttribute("id");
	lightUpBar(barID);
	//check function to check if player input the right button according to sequence List
}

function lightUpBar(bar){
	var barAudio = new Audio(bars[bar].sound);
	barAudio.play();
}

function computerPlay(){//add attributes that include how much time is set depending on difficulty level
	var index = 0;
	var nextOnList = setInterval(function(){
		if (index === sequenceList.length-1) clearInterval(nextOnList);
		lightUpBar(barType[sequenceList[index]]);
		document.getElementById(barType[sequenceList[index]]).classList.toggle("activeClass");		
		setTimeout(function(){
			document.getElementById(barType[sequenceList[index]]).classList.remove("activeClass");
			index = (index + 1) % sequenceList.length;
		},900)
	},1000);	
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}