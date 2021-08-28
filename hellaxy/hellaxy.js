var Hellaxy = new App(function(){
	setupSpace();
	setupHellaxyScreens();
	setupWeapons();
	setupSpecials();
	setupControls();
	setupShips();
	setupPlanets();
	setScreen("title");
});

Hellaxy.name = "Hellaxy";
Hellaxy.msgs = [];
Hellaxy.shipTypes = {};
Hellaxy.ships = [];
Hellaxy.planets = {};
Hellaxy.weapons = {};
Hellaxy.projectiles = [];
Hellaxy.locations = {};
Hellaxy.playerShip = {};
Hellaxy.lastStats = {};