var Helon = {};
Helon.ress = {};
Helon.tics = 0;
Helon.muted = false;
Helon.ress.audio = {};
Helon.ress.images = {
	quantity : 0,
	loaded : 0
};
Helon.screens = [];
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



Helon.loadRess = function(){
	var refs = audio_ref.split("	");
	for (var i = 0; i < refs.length; i++){
			if (refs[i] === "") continue;
			Helon.ress.audio[refs[i]] = new Audio("audio/" + refs[i] + ".mp3");
		}
	var refs = image_ref.split("	");
	for (var i = 0; i < refs.length; i++){
		if (refs[i] === "") continue;
		Helon.ress.images.quantity += 1;
		Helon.ress.images[refs[i]] = new Image();
		Helon.ress.images[refs[i]].src = "images/" + refs[i] + ".png";
		Helon.ress.images[refs[i]].addEventListener("load",function(e){
			Helon.ress.images.loaded +=1;
		});
	}
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



Helon.back = function(){
	setScreen(Helon.previousScreen);
}



function stopHelon(){
	Helon.loop = function(){};
}