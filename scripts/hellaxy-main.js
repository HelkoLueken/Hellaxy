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
	if (exists(hellaxy.screen) && hellaxy.screen.theme != hellaxy.screens[screenName].theme){
		hellaxy.screen.theme.pause();
		hellaxy.screen.theme.currentTime = 0;
	}
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
		if (!exists(this.flicker)) this.flicker = 0;
		if (!exists(this.flickering)) this.flickering = setInterval(function(){hellaxy.screens.title.flicker = 10;}, 1000);
		ctx.font = "244px Consolas";
		ctx.fillStyle = "yellow";
		ctx.fillText("Hellaxy", 480, 320);
		ctx.font = "32px Consolas";
		ctx.fillText("> Press Space <", 800, 640);
		ctx.fillText("Developed by HelkoLueken", 40, 1040);
		if (this.flicker > 0){
			ctx.fillStyle = "black";
			ctx.fillRect(800, 600, 300, 50);
			this.flicker --;
		}
		if (key.space){
			clearInterval(this.flickering);
			this.flicker = undefined;
			hellaxy.setScreen("menu")
			}
		}
	)
	
	new Screen("menu", "black", "theme1", function(){
		ctx.fillStyle = "yellow";
		ctx.font = "64px Consolas";
		ctx.fillText("Hellaxy", 840, 80);
		ctx.fillText("Main Menu", 774, 160);
		this.showButton(660, 400, 600, 150, "Start Game", "yellow", function(){hellaxy.setScreen("shipSelect");})
		this.showButton(660, 650, 600, 150, "Controls", "yellow", function(){hellaxy.setScreen("controls");})
	})
	
	new Screen("controls", "black", "theme1", function(){
		ctx.fillStyle = "yellow";
		ctx.font = "64px Consolas";
		ctx.fillText("Controls", 850, 80);
		ctx.font = "40px Consolas";
		ctx.fillText("Move around = WASD", 140,200);
		ctx.fillText("Light Weapon = Space", 140,280);
		ctx.fillText("Medium Weapon = E", 140,360);
		ctx.fillText("Heavy Weapon = Q", 140,440);
		ctx.fillText("Special Abilities = 1 - 3", 140,520);
		ctx.fillText("Pause Game / Skip Dialog = esc", 140,600);
		ctx.fillText("Point at cursor / Show targets direction = Left mouse button", 140,680);
		ctx.fillText("Zoom in / out = + / -", 140,760);
		this.showButton(660, 900, 600, 100, "Back", "yellow", function(){hellaxy.setScreen("menu");});
	});
	
	new Screen("shipSelect", "black", "theme1", function(){
		let hor = 1;
		let ver = 1;
		ctx.strokeStyle = "yellow";
		ctx.fillStyle = "yellow";
		ctx.font = "64px Consolas";
		ctx.fillText("Select your ship:", 700, 80);
		for (let shiptype in hellaxy.shipTypes){
			ctx.drawImage(hellaxy.shipTypes[shiptype].skin, hor*70, ver*70 + 50, 64, 64);
			if (cursor.x.between(hor*70, hor*70 + 64) && cursor.y.between(ver*70 + 50, ver*70 + 114)){
				ctx.strokeRect(hor*70 - 4, ver*70 + 46, 70, 70);
				if (click){
					hellaxy.shipTypes[shiptype].spawn(400, 400, player1, function(){hellaxy.setScreen("menu");}); //Ja das muss so umständlich angesprochen werden, die Laufvariable ist hier iwie nur ein String	
					hellaxy.setScreen("space");
				}
			}
			hor++;
			if (hor > 24) hor = 1, ver++;
		}
		ctx.font = "40px Consolas";
		this.showButton(660, 900, 600, 100, "Back", "yellow", function(){hellaxy.setScreen("menu");});
	});
}



