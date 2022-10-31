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
hellaxy.tics = 0;
hellaxy.muted = false;
hellaxy.screens = [];
hellaxy.screen = {};
hellaxy.audio = {}
hellaxy.images = {
	quantity : 0,
	loaded : 0
};




hellaxy.runOn = function(canvas){
	hellaxy.canvas = canvas.getContext("2d");
	if (!hellaxy.loadRess()){
		alert("Error while loading game ressources!")
		return;
	}


	hellaxy.loop();
}



hellaxy.loadRess = function(){
	if (!exists(imageFiles) || !exists(audioFiles)) return false;
	
	for (let i = 0; i < audioFiles.length; i++){
			audioName = audioFiles[i].split(".")[0];
			var aud = new Audio("audio/" + audioName)
			if (!exists(aud)) return false;
			hellaxy.audio[audioName] = aud;
		}

	for (let i = 0; i < imageFiles.length; i++){
		imageName = imageFiles[i].split(".")[0];
		hellaxy.images.quantity += 1;
		img = new Image();
		img.src = "image/"+imageName;
		img.addEventListener("load",function(e){
			hellaxy.images.loaded +=1;
		});
		hellaxy.images[imageName] = img;
	}
	
	return true;
}



hellaxy.loop = function(){
	
	
}
/*
var hellaxy = new App(function(){
	setupSpace();
	setuphellaxyScreens();
	setupWeapons();
	setupSpecials();
	setupControls();
	setupShips();
	setupPlanets();
	setScreen("title");
});





Helon.screen = new Screen();
Helon.previousScreen = new Screen();

Helon.app = null;
class App{
	constructor(setup){
		Helon.app = this;
		if (typeof setup == "function") this.start = setup;
	}
	
	start(){}
}





Helon.start = function(){ // Hier ist der Programmeinstieg
	Helon.loadRess();
	setTimeout(loadCursor, 2000);
	new Screen("Lobby", "blackscreen", "none", function(){
		Helon.ctx.fillRect(0, 0, 1920, 1080);
		Helon.ctx.fillStyle = "yellow";
		Helon.ctx.font = "32px Consolas";
		Helon.ctx.fillText("Helon Engine", 200, 600);
		Helon.ctx.fillStyle = "black";
	});
	setScreen("Lobby");
	
	if (Helon.app != null){
		new Screen("LoadingBar", "blackscreen", "none", function(){
			Helon.ctx.fillStyle = "black";
			Helon.ctx.fillRect(0, 0, 1920, 1080);
			bar(80,400,1760,120,Helon.ress.images.loaded/Helon.ress.images.quantity);
			if (Helon.ress.images.quantity !== 0 && Helon.ress.images.loaded === Helon.ress.images.quantity) {
				console.log("Loaded Images", Helon.ress.images);
				Helon.app.start();
			}
		});
		setScreen("LoadingBar");
	}
	else alert("No executable Application found");
	Helon.loop();
}



Helon.loop = function(){
	Helon.screen.display();
	Helon.screen.physics();
	Helon.screen.act();
	if (cursor.display != undefined) cursor.display();
	Helon.tics++;
	requestAnimationFrame(Helon.loop);
}

	
	
function setScreen(ID){
	if (ID instanceof Screen && ID !== Helon.screen){
		Helon.previousScreen = Helon.screen;
		Helon.screen = ID;
	}
	if (exists(Helon.screens[ID]) && ID !== Helon.screen.ID){
		Helon.previousScreen = Helon.screen;
		Helon.screen = Helon.screens[ID];
	}
	
}
*/