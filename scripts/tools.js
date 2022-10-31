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
			return null;
			console.log("Alert: Could not set property. Null was set instead!");
		}
	}
}

//Alter Name - ergibt wenig Sinn
function setProp(par, deflt){
	return trySet(par, deflt);
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



function button(posx, posy, width, height, tag, colour, action){
	ratio = Helon.ctx.height/Helon.ctx.clientHeight
	Helon.ctx.lineWidth = 4;
	var textY = parseInt(Helon.ctx.font.split('p')[0]) + posy + 0.4*((height - 2*Helon.ctx.lineWidth) - parseInt(Helon.ctx.font.split('p')[0]));
	
	Helon.ctx.fillStyle = "black";
	Helon.ctx.fillRect(posx , posy, width, height);
	
	Helon.ctx.fillStyle = "white";
	Helon.ctx.fillRect(posx + 2, posy + 2, width - 4, height - 4);
	
	Helon.ctx.fillStyle = "black";
	Helon.ctx.fillRect(posx + 4, posy + 4, width - 8, height - 8);
	
	Helon.ctx.fillStyle = colour;
	Helon.ctx.fillRect(posx + 2 * Helon.ctx.lineWidth, posy + 2 * Helon.ctx.lineWidth, width - Helon.ctx.lineWidth * 4, height - Helon.ctx.lineWidth * 4);
	Helon.ctx.strokeStyle = "black";
	
	if (cursor.x.between(posx, posx + width) && cursor.y.between(posy, posy + height)){
		if (click) action();
		Helon.ctx.strokeRect(posx + Helon.ctx.lineWidth * 3, posy + Helon.ctx.lineWidth * 3, width - Helon.ctx.lineWidth * 6, height - Helon.ctx.lineWidth * 6);
	}
	Helon.ctx.fillStyle = "black";
	Helon.ctx.fillText(tag, posx + ((width - Helon.ctx.measureText(tag).width)*0.5), textY);
	Helon.ctx.fillStyle = "yellow";
}



function bar(x, y, width, height, ratio){
	Helon.ctx.fillStyle = "yellow";
	Helon.ctx.strokeStyle = "yellow";
	Helon.ctx.strokeRect(x,y,width,height);
	Helon.ctx.fillRect(x+10,y+10,width*ratio,height-20);
	Helon.ctx.strokeRect(x+10,y+10,width*ratio,height-20);
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



function loop(track){
	if (Helon.muted || track === undefined || track === "none") return;
	if (typeof track !== "object") track = Helon.ress.audio[track];
	if (track.currentTime === 0 || track.ended){
		track.play();
	}
}



function resetAudio(){
	for (var audio in Helon.ress.audio){
		Helon.ress.audio[audio].pause();
		Helon.ress.audio[audio].currentTime = 0;
	}
}



function muteButton(){
	button(1840, 0, 80, 80, " ", "yellow", function(){if (intervalReact(true)){
		if (Helon.muted){
			Helon.muted = false;
		} else{
			Helon.muted = true;
			resetAudio();
		}
	}})
	Helon.ctx.drawImage(Helon.ress.images.speaker, 1846, 6, 68, 68);
	if (Helon.muted) Helon.ctx.drawImage(Helon.ress.images.cross, 1846, 6, 68, 68);
}
*/
