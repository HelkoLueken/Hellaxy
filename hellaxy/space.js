function setupSpace(){ // Achtung: Space ist nur der Screen für die darstellung und zum Aufruf der Physik. Die Spielobjekte Planeten, projektile usw, liegen aber sortiert als Eigenschaften am Hellaxy Objekt.
	Hellaxy.space = new Screen("space", "bg_central", "theme_central");
	
	Hellaxy.space.act = function(){
		for (ship in Hellaxy.ships){
			if (typeof this.ships[i].ctrl === "function") ship.ctrl();
		}
	}
	
	
	
	Hellaxy.space.adjustOffset = function(){
		if (this.offsetX > this.width - 1920 / this.scale) this.offsetX = this.width - 1920 / this.scale;
		if (this.offsetY > this.height - 980 / this.scale) this.offsetY = this.height - 980 / this.scale;
		if (this.offsetX < 0) this.offsetX = 0;
		if (this.offsetY < 0) this.offsetY = 0;
	}
	
	
	
	Hellaxy.space.display = function(){
		for (var posY = 0; posY < 1100; posY += 100 * this.scale){
			for (var posX = 0; posX < 2000; posX += 100 * this.scale){
				Helon.ctx.drawImage(this.bg, posX - ((this.offsetX % 100) * this.scale), posY - ((this.offsetY % 100) * this.scale), 100 * this.scale, 100 * this.scale);
			}
		}
		for (var i = 0; i < this.bodies.length; i++){
			this.bodies[i].draw();
		}
		loop(this.theme);
	}
	
	
	
	Hellaxy.space.physics = function(){
		for (proj in Hellaxy.projectiles){
			proj.move();
		}
		for (ship in Hellaxy.ships){
			ship.move();
		}

			//if (this.bodies[i].x < -200 ||this.bodies[i].y < -200 ||this.bodies[i].x > this.width + 200 || this.bodies[i].y > this.height + 200) this.drop(this.bodies[i]);
		/*
		for (var i = 0; i < this.ships.length; i++){
			for (var s = i+1; s < this.ships.length; s++){
				if (this.ships[i].collidesWith(this.ships[s])) this.ships[i].collideWith(this.ships[s]);
			}
			for (var p = 0; p < this.projectiles.length; p++){
				if (this.projectiles[p].tics <= 0){
					this.projectiles[p].drop();
					p--;
					continue;
				}
				if (this.ships[i] !== this.projectiles[p].emitter && this.ships[i].overlaps(this.projectiles[p])){
					var potothers = this.ships[i].nextShips(undefined ,this.projectiles[p].size);
					this.projectiles[p].hit(this.ships[i]);
					for (var n = 0; n < potothers; n++){
						this.projectiles[p].hit(potothers[n]);
					}
				}
			}
			if (this.ships[i].hp <= 0){
				this.ships[i].explode();
				this.ships.splice(i,1);
				i--;
			}
		}*/
	}
	
	
	
	Hellaxy.space.clear = function(){
		Hellaxy.ships = [];
		Hellaxy.projectiles = [];
	}
	
	
	
	Hellaxy.space.refreshIDs = function(){
		for (var id = 0; id < Hellaxy.ships.length; id++){
			Hellaxy.ships[id].ID = id;
		}
	}
	
	
	
	Hellaxy.space.zoomIn = function(){
		if (intervalReact(this.scale < 1.75, 250, "zoom")) this.scale += 0.25;
	}



	Hellaxy.space.zoomOut = function(){
		if (intervalReact(this.scale > 0.75, 250, "zoom")) this.scale -= 0.25;
	}
}


	
	
	
	
	
	
	
	
	
	/*
	addPlanet(designation, x, y){
		var neuerPlanet = new Planet(designation, x, y);
		neuerPlanet.sector = this;
		for (var pla = 0; pla < this.planets.length; pla++){
			if (this.planets[pla].designation === neuerPlanet.designation) return;
		}
		this.planets.push(neuerPlanet);
		Hellaxy.planets[designation] = neuerPlanet;
		Hellaxy.locations[designation] = neuerPlanet;
	}
	
	
	addLocation(designation, x, y, width, height){
		var neueLocation = new Location(designation, this, x, y, width, height);
		this.locations.push(neueLocation);
		Hellaxy.locations[designation] = neueLocation;
	}
	
	
	spawnAsteroids(posX, posY, width, height){
		for (var i = 0; i < width / 90; i++){
			for (var h = 0; h < height / 90; h++){
				this.spawnShip("asteroid_asteroid" + Math.floor((Math.random() * 3) + 1), posX + i * 90 + Math.floor((Math.random() * 50) - 25), posY + h * 90 + Math.floor((Math.random() * 50) - 25), Math.floor((Math.random() * 359)), npc["asteroid" + Math.floor((Math.random() * 3) + 1)]);
			}
		}
	}
	
	
	spawnShip(designation, atX, atY, atAngle, ctrl, abgang){ //designation, atX, atY, atAngle, ctrl, abgang
		if (ctrl === undefined) ctrl = "none";
		if (atAngle === undefined) atAngle = 0;
		var neuerSpawn = Hellaxy.ships[designation].clone();
		neuerSpawn.x = atX;
		neuerSpawn.y = atY;
		neuerSpawn.angle = atAngle;
		neuerSpawn.aim = atAngle;
		if (ctrl !== undefined) neuerSpawn.ctrl = ctrl;
		if (abgang !== undefined) neuerSpawn.abgang = abgang;
		neuerSpawn.sector = this;
		neuerSpawn.staticID = this.ships.length + Helon.tics;
		this.ships.push(neuerSpawn);
		this.refreshIDs();
	}
	
	
	
	hasShip(fraction){
		for (var k = 0; k < this.ships.length; k++){
			if (this.ships[k].fraction === fraction) return true;
		}
		return false;
	}
	


function addPlanet(designation, x, y, inSector){
	if (inSector === undefined) {
		inSector = Hellaxy.sector;
	} else {
		inSector = Hellaxy.sectors[inSector];
	}
	inSector.addPlanet(designation, x, y);
}


function addLocation(designation, x, y, width, height, inSector){
	if (inSector === undefined) inSector = Hellaxy.sector;
	inSector.addLocation(designation, x, y, width, height);
}


function spawnAsteroids(posX, posY, width, height, inSector){
	if (inSector === undefined) inSector = Hellaxy.sector;
	inSector.spawnAsteroids(posX, posY, width, height);
}

*/