class Spawnpoint{
	
	constructor(shipID, x, y , milliseconds, percent, quantity){
		if (Hellaxy.shipTypes[shipID] !== undefined) this.ship = Hellaxy.shipTypes[shipID];
		else{
			this.ship = Hellaxy.shipTypes.none_testarrow;
			console.log("Warning tried to create spawnpoint for unknown shiptype: " + shipID + ". Created one for testarrows instead.");
		}
		this.x = trySet(x, 0);
		this.y = trySet(y, 0);
		this.quantity = trySet(quantity, 1);
		this.milliseconds = trySet(milliseconds, 8000);
		this.percent = trySet(percent, 70);
		this.intervalReference = null;
	}
	
	
	
	startSpawning(){
		if (this.intervalReference === null) this.intervalReference = setInterval(this.trySpawn, this.milliseconds, this);
	}
	
	
	
	trySpawn(fromPoint){ //@Description Diese Funktion ist ein bisschen dämlich aber nötig. Nach setInterval ist hier drin this nämlich windows... :/
		if (chance(fromPoint.percent)){
			fromPoint.ship.spawnSquad(fromPoint.x ,fromPoint.y, fromPoint.quantity);
		}
	}
	
	
	
	stopSpawning(){
		clearInterval(this.intervalReference);
		this.intervalReference = null;
	}
}