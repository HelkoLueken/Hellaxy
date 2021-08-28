class Spawnpoint{
	
	constructor(ship, x, y , milliseconds, percent, quantity){
		if (typeof ship === "Object") this.ship = ship;
		else this.ship = trySet(Hellaxy.shipTypes[ship], Hellaxy.shipTypes.none_testarrow);
		this.x = trySet(x, 0);
		this.y = trySet(y, 0);
		this.quantity = trySet(quantity, 1);
		this.milliseconds = trySet(milliseconds, 10000);
		this.percent = trySet(percent, 50);
		console.log(percent, this.percent);
	}
	
	
	
	startSpawning(){
		this.intervalReference = setInterval(this.trySpawn, this.milliseconds, this);
	}
	
	
	
	trySpawn(fromPoint){ //@Description Diese Funktion ist ein bisschen dämlich aber nötig. Nach setInterval ist hier drin this nämlich windows... :/
		if (chance(fromPoint.percent)){
			fromPoint.ship.spawnSquad(fromPoint.x ,fromPoint.y, fromPoint.quantity);
		}
	}
	
	
	
	stopSpawning(){
		clearInterval(this.intervalReference);
	}
}