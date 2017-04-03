function animate(element){//just gotta make this "smooth" now. Possible with CSS I think
	if (element.getAttribute("id") == "powerSwitch"){
		console.log("click");
		element.classList.toggle("onOff");	
	} else {
		element.classList.toggle("hard");
	}
	clickSound();
}

function clickSound(){
	var clickAudio = new Audio("clickSound.mp3");//somethinghere
	clickAudio.play();
}

function noClickClass(){
	
}
