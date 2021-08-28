class Planet extends Body{
	constructor(designation, x, y){
		if (!exists(designation)){
			console.log("error: tried to place unknown planet");
			return;
		}
		super();
		this.designation = designation;
		this.setSkin("planet_" + designation);
		this.x = setProp(x, 0);
		this.y = setProp(y, 0);
		this.screen = Hellaxy.space;
		this.spawnPoints = [];
		Hellaxy.planets[designation] = this;
		Hellaxy.lastStats.planet = this;
	}
	
	
	
	
	
	addSpawnpoint(ship, milliseconds, percent, quantity){
		this.spawnPoints.push(new Spawnpoint(ship, this.x, this.y, milliseconds, percent, quantity));
	}
	
	
	
	startSpawning(){
		for (let i = 0; i < this.spawnPoints.length; i++) this.spawnPoints[i].startSpawning();
	}
	
	
	
	stopSpawning(){
		for (let i = 0; i < this.spawnPoints.length; i++) this.spawnPoints[i].stopSpawning();
	}
}



function addSpawn(ship, milliseconds, percent, quantity){
	Hellaxy.lastStats.planet.addSpawnpoint(ship, milliseconds, percent, quantity)
}



function setupPlanets(){
	new Planet("humania", 1000, 1000);
	new Planet("pontes", 1420, 2550);
	addSpawn(Hellaxy.shipTypes.none_testarrow);
	console.log("Planets", Hellaxy.planets);
}