function animate(element){//just gotta make this "smooth" now. Possible with CSS I think
	if (element.getAttribute("id") == "powerSwitch"){
		element.classList.toggle("on");
		element.classList.toggle("off");

	} else {
		element.classList.toggle("easy");
		element.classList.toggle("hard");
	}
	clickSound();
}

function clickSound(){
	var clickAudio = new Audio("clickSound.mp3");//somethinghere
	clickAudio.play();
}
