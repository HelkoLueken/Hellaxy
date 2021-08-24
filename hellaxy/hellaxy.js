var Hellaxy = new App();
	Hellaxy.name = "Hellaxy";
	Hellaxy.msgs = [];
	Hellaxy.ships = {};
	Hellaxy.planets = {};
	Hellaxy.weapons = {};
	Hellaxy.locations = {};
	Hellaxy.playerShip = {};


Hellaxy.main = function(){
	Hellaxy.sector = Helon.screen;
}


Hellaxy.startUp = function(){
	setupHellaxyScreens();
	setupWeapons();
	setupSpecials();
	setupControls();
	setupShips();
	setupSectors();
	setupLevels();
	setScreen("title");
	console.log("HINT: If something is UNDEFINED and you cant find why, check for THIS. !!!");
}