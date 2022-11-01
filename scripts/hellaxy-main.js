var hellaxy = {}
hellaxy.msgs = [];
hellaxy.shipTypes = {};
hellaxy.ships = [];
hellaxy.planets = {};
hellaxy.weapons = {};
hellaxy.projectiles = [];
hellaxy.locations = {};
hellaxy.playerShip = {};
hellaxy.lastStats = {};
hellaxy.muted = false;
hellaxy.screens = [];
hellaxy.screen = null;
hellaxy.audio = {};
hellaxy.images = {
	quantity : 0,
	loaded : 0
};





hellaxy.runOn = function(canvas){
	if (!hellaxy.loadRess()){
		alert("Error while loading game ressources!")
		return;
	}
	hellaxy.createScreens();
	hellaxy.setScreen("loading");
	setInterval(hellaxy.screen.physics(), 35);
	hellaxy.drawLoop();
}



hellaxy.setScreen = function(screenName){
	if (!exists(hellaxy.screens[screenName])){
		console.log("Error: could not find screen to switch to!");
		return;
	}
	if (exists(hellaxy.screen)){
		hellaxy.screen.theme.pause();
		hellaxy.screen.theme.currentTime = 0;
	}
	else hellaxy.screen = new Screen();
	hellaxy.screen = hellaxy.screens[screenName];
	hellaxy.screen.theme.play();
}



hellaxy.loadRess = function(){
	if (!exists(imageFiles) || !exists(audioFiles)) return false;
	
	for (let i = 0; i < audioFiles.length; i++){
			audioName = audioFiles[i].split(".")[0];
			var aud = new Audio("audio/" + audioFiles[i])
			if (!exists(aud)) return false;
			hellaxy.audio[audioName] = aud;
		}

	for (let i = 0; i < imageFiles.length; i++){
		imageName = imageFiles[i].split(".")[0];
		hellaxy.images.quantity += 1;
		img = new Image();
		img.src = "image/" + imageFiles[i];
		img.addEventListener("load",function(e){
			hellaxy.images.loaded +=1;
		});
		hellaxy.images[imageName] = img;
	}
	
	return true;
}



hellaxy.drawLoop = function(){
	hellaxy.screen.draw();
	cursor.draw();
	requestAnimationFrame(hellaxy.drawLoop);
}



hellaxy.createScreens = function(){
	
	new Screen("loading", "black", null, function(){
		this.drawBar(100, 500, 1720, 80, "yellow", hellaxy.images.loaded/hellaxy.images.quantity);
		if (hellaxy.images.quantity !== 0 && hellaxy.images.loaded === hellaxy.images.quantity) {
			console.log("Loaded Images", hellaxy.images);
			loadCursor();
			hellaxy.setScreen("title");
		}
	});
	
	new Screen("title", "black", "theme1", function(){
		ctx.font = "244px Consolas";
		ctx.fillStyle = "yellow";
		ctx.fillText("Hellaxy", 480, 320);
		ctx.font = "32px Consolas";
		ctx.fillText("> Press Space <", 800, 640);
		ctx.fillText("developed by HelkoLueken", 40, 1040);
		if (key.space) hellaxy.setScreen("menue")
		}
	)
	
	
}