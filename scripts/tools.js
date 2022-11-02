//Methoden:

Number.prototype.between = function(a, b) { //funktioniert genau an den Grenzen nicht
  var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
  return this > min && this < max;
}



Array.prototype.append = function(addition){
	this[this.length] = addition;
}


//Fuer init von Objektparametern
function trySet(setTo, deflt){
	if (exists(setTo)){
		return setTo;
	}
	else{
		if (exists(deflt)){
			return deflt;
		}
		else{
			console.log("Alert: Could not set property. Null was set instead!");
			return null;
		}
	}
}



function biep(){ // Fürs Debugging
	console.log("Reached this point");
}



function chance(percentage){
	if (!exists(percentage)) console.log("Warning: tried to calculate undefined odds");
	if (Math.floor(Math.random() * 100) <= percentage) return true;
	return false;
}



function exists(obj){
	if (obj !== undefined && obj !== null) return true;
	return false;
}



function get360(input){
	while (input > 360 || input < 0){
		if (input < 0) input += 360;
		if (input > 360) input -= 360;
	}
	return input;
}



var queue = {};
function intervalReact(trigger, delay, ID){
	if (delay === undefined) delay = 500;
	if (ID === undefined) ID = "react";
	if (trigger){
		if (queue[ID] === false || queue[ID] === undefined){
		queue[ID] = true;
		setTimeout(function(){queue[ID] = false;},delay);
		return true;
		}
	}
	return false;
}


/*
function getImg(img){
	if (Helon.ress.images.loaded === 0){
		console.log("Warning: No images loaded yet! Returned new image");
		return new Image();
	}
	if (!exists(img)){
		img = "cross";
		console.log("Warning: Created Image without ID. Returned dummy instead");
	}
	if (!exists(img.src)){
		for (var a in Helon.ress.images){
			if (a === img) img = Helon.ress.images[img];
		}
	}
	if (!exists(img.src)){
		console.log("Warning: Could not find Image in Storage:", img);
		img = Helon.ress.images["cross"];
	}
	return img;
}



function getAudio(aud){
	if (!exists(aud) || aud === "none") return "none";
	if (!exists(aud.src)){
		for (var a in Helon.ress.audio){
			if (a === aud) aud = Helon.ress.audio[aud];
		}
	}
	if (!exists(aud.src)){
		console.log("Warning: Missing audio reference:" + aud + "\nThere will be no audio");
		aud = "none";
	}
	return aud;
}



function play(sound){
	if (Helon.muted || sound === undefined || sound === "none") return;
	if (typeof sound !== "object") sound = Helon.ress.audio[sound];
	if (sound.currentTime === 0 || sound.ended){
		sound.play();
	} else {
		if (sound.currentTime > 0.2) sound.currentTime = 0;
	}
}




function resetAudio(){
	for (var audio in Helon.ress.audio){
		Helon.ress.audio[audio].pause();
		Helon.ress.audio[audio].currentTime = 0;
	}
}
*/
