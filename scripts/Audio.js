Audio.currentTheme = new Audio();
Audio.loaded = {};






Audio.prototype.playAsTheme = function(){
	if (Audio.currentTheme === this) return;
	Audio.currentTheme.pause()
	Audio.currentTheme.currenTime = 0;
	Audio.currentTheme = this;
	Audio.currentTheme.loop = true;
	Audio.currentTheme.play();
}



Audio.prototype.playAsSFX = function(){
	if (this.currentTime === 0 || this.ended){
		this.play();
	}
	else {
		if (this.currentTime > 0.1) this.currentTime = 0;
	}
}



Audio.loadAllFiles = function(){
	if (audioFiles == undefined){
		//to be read from .index.js within audio folder.
		console.log("Warning: Tried to load audio files. But file index not available.");
	}
	for (let i = 0; i < audioFiles.length; i++){
		audName = audioFiles[i].split(".")[0];
		Audio.loaded[audName] = new Audio("audio/" + audioFiles[i])
	}
}



Audio.get = function(audName){
	if (!exists(audName) || !exists(Audio.loaded[audName])){
		console.log("Warning: Tried to get missing audio!");
		return new Audio();
	}
	return Audio.loaded[audName];
}



