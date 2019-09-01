var Hellaxy = new App();
	Hellaxy.sector = {};
	Hellaxy.msgs = [];
	Hellaxy.campaign = {};
	Hellaxy.level = {};
	Hellaxy.ships = {};
	Hellaxy.sectors = {};
	Hellaxy.campaigns = {};
	Hellaxy.planets = {};
	Hellaxy.weapons = {};
	Hellaxy.locations = {};


Hellaxy.main = function(){
	Hellaxy.sector = Helon.screen;
	if (exists(Hellaxy.level.check)) Hellaxy.level.check();
	if (exists(Hellaxy.sector.actShips)) Hellaxy.sector.actShips();
	//Hellaxy.task();
}


Hellaxy.startUp = function(){
	setupHellaxyScreens();
	setupWeapons();
	//setupSpecials();
	setupControls();
	setupShips();
	setupSectors();
	setupLevels();
	//setCampaign("quicktest");
	//Hellaxy.task = screenManager;
	//skipTo("qubanian", 3);
	setScreen("title");
}






//Methoden:
/*
function report(){
	console.log("Campaign:", Hellaxy.campaign);
	console.log("Level:", Hellaxy.level);
	console.log("Screen:", Hellaxy.screen);
	console.log("Sector:", Hellaxy.sector);
	if (exists(player1ship)) console.log("Player:", player1ship);
}




function skipTo(designation, at){
	if (at > Hellaxy.campaigns[designation].levels.length){
		console.log("Level Number out of Bounds");
		return;
	} 
	setCampaign(designation);
	if (Hellaxy.campaign.at > at) Hellaxy.campaign.at = 0;
	for (var lvl = Hellaxy.campaign.at; lvl < at; lvl++){
		startCampaign(designation);
		for (var cond in Hellaxy.level.conditions){
			Hellaxy.level.conditions[cond] = true;
			if (exists(Hellaxy.level.events)) Hellaxy.level.events();
		}
		Hellaxy.level.end();
	}
	startCampaign(designation);
}



function addMsg(content){
	neueMsg = {};
	neueMsg.content = content;
	Hellaxy.msgs.push(neueMsg);
}



function setCampaign(designation){
	Hellaxy.campaign = Hellaxy.campaigns[designation];
	Hellaxy.level = Hellaxy.campaigns[designation].levels[Hellaxy.campaigns[designation].at];
}



function startCampaign(campaign){
	resetAudio()
	setCampaign(campaign);
	Hellaxy.task = campaignManager;
	player1ship.x = 0;
	player1ship.y = 0;
	LEVEL = Hellaxy.campaign.levels[Hellaxy.campaign.at];
	if (!LEVEL.isSetup) {
		LEVEL.setup();
		LEVEL.isSetup = true;
	}
	Hellaxy.campaign.act();
	Hellaxy.sector.act();
}



function spawnSquad(designation, atX, atY, atAngle, quantity, ctrl, abgang, inSector){
	var hor = 0;
	var ver = 0;
	var spawned = 0;
	while (spawned < quantity){
		spawnShip(designation, atX + hor * Hellaxy.ships[designation].width * 2, atY + ver * Hellaxy.ships[designation].height * 2, atAngle, ctrl, abgang, inSector);
		spawned++;
		hor++;
		if (hor >= Math.sqrt(quantity)){
			hor = 0;
			ver++;
		}
	}
}



function spawnFront(dimension, designation, atX, atY, atAngle, quantity, ctrl, abgang, inSector){
	for (var q = 0; q < quantity; q++){
		spawnShip(designation, atX, atY, atAngle, ctrl, abgang, inSector);
		if (dimension === "x") atX += Hellaxy.ships[designation].width * 2;
		if (dimension === "y") atY += Hellaxy.ships[designation].height * 2;
	}
}



function display(obj){
	
	if (obj.hp !== undefined && obj.hp > 0){
		Helon.ctx.strokeStyle = "red";  //infotafel f�r Schiffe
		Helon.ctx.fillStyle = "green";
		x -= obj.width/2 * Hellaxy.scale;
		y -= (obj.height/2 * Hellaxy.scale) + 14;
		Helon.ctx.strokeRect(x, y, obj.width * Hellaxy.scale, 6);
		Helon.ctx.fillRect(x, y, obj.width * (obj.hp / obj.mass) * Hellaxy.scale, 6);
		Helon.ctx.fillStyle = "cyan";
		Helon.ctx.fillRect(x, y, obj.width * (obj.shield / obj.maxshield) * Hellaxy.scale, 6);
		Helon.ctx.strokeStyle = "yellow";
		Helon.ctx.fillStyle = "yellow";
	}
}



function zoomIn(){
	if (intervalReact(Hellaxy.scale > 0.5, 250, "zoom")) Hellaxy.scale -= 0.25;
}


function zoomOut(){
	if (intervalReact(Hellaxy.scale < 1.5, 250, "zoom")) Hellaxy.scale += 0.25;
} */