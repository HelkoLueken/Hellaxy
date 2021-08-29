function setupSpace(){ // Achtung: Space ist nur der Screen für die Darstellung und zum Aufruf der Physik. Die Spielobjekte Planeten, projektile usw, liegen aber sortiert als Eigenschaften am Hellaxy Objekt.
	Hellaxy.space = new Screen("space", "bg_central", "theme_central");
	
	Hellaxy.space.act = function(){
		this.dropDistantBodys();
		this.controlSpawning();
		if (intervalReact(key.esc)){
			stopAllSpawning();
			setScreen("paused");
		}
		for (var i = 0; i < Hellaxy.ships.length; i++){
			if (typeof Hellaxy.ships[i].ctrl === "function") Hellaxy.ships[i].ctrl();
		}
	}
	
	
	
	Hellaxy.space.display = function(){
		for (var posY = -100; posY < 1100; posY += 100 * this.scale){
			for (var posX = -100; posX < 2000; posX += 100 * this.scale){
				Helon.ctx.drawImage(this.bg, posX - ((this.offsetX % 100) * this.scale), posY - ((this.offsetY % 100) * this.scale), 100 * this.scale, 100 * this.scale);
			}
		}
		
		for (designation in Hellaxy.planets) Hellaxy.planets[designation].draw();
		
		for (var i = 0; i < Hellaxy.ships.length; i++) Hellaxy.ships[i].draw();

		for (var i = 0; i < Hellaxy.projectiles.length; i++) Hellaxy.projectiles[i].draw();
		
		loop(this.theme);
	}
	
	
	
	Hellaxy.space.physics = function(){
		for (let i = 0; i < Hellaxy.projectiles.length; i++){
			Hellaxy.projectiles[i].move();
		}
		for (let i = 0; i < Hellaxy.ships.length; i++){
			Hellaxy.ships[i].move();
		}

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
	
	
	
	Hellaxy.space.dropDistantBodys = function(){
		for (let i = 0; i < Hellaxy.ships.length; i++){
			if (Hellaxy.ships[i].distanceTo({x : this.offsetX, y : this.offsetY}) > 3000) Hellaxy.ships[i].drop();
		}
		
		for (let i = 0; i < Hellaxy.projectiles.length; i++){
			if (Hellaxy.projectiles[i].distanceTo({x : this.offsetX, y : this.offsetY}) > 3000) Hellaxy.projectiles[i].drop();
		}
	}
	
	
	
	Hellaxy.space.clear = function(){
		Hellaxy.ships = [];
		Hellaxy.projectiles = [];
	}
	
	
	
	Hellaxy.space.controlSpawning = function(){
		for (planet in Hellaxy.planets){
			if (Hellaxy.planets[planet].distanceTo({x : this.offsetX, y : this.offsetY}) > 3000) Hellaxy.planets[planet].stopSpawning();
			else Hellaxy.planets[planet].startSpawning();
		}
	}
	
	
	//@Description soll ausgemustert werden
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




function spawnAsteroids(x, y, width, height){
	for (var i = 0; i < width / 90; i++){
		for (var h = 0; h < height / 90; h++){
			Hellaxy.ships["asteroid_asteroid" + Math.floor((Math.random() * 3) + 1)].spawn(x + i * 90 + Math.floor((Math.random() * 50) - 25), y + h * 90 + Math.floor((Math.random() * 50) - 25));
		}
	}
}



function stopAllSpawning(){
	for (planet in Hellaxy.planets) Hellaxy.planets[planet].stopSpawning();
}