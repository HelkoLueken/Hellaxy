class Space extends Screen{
	
	
	
	
	
	
	constructor(){
		super("blue");
	}
	
	
	
	
	focus(on){
		this.offsetX = on.x - 960 / this.scale;
		this.offsetY = on.y - 540 / this.scale;
	}
}





	/*
	add(bod){
		if (!exists(bod)){
			console.log("Alert: Tried to add missing body to:" + this.ID);
			return;
		}
		bod.screen = this;
		this.bodies.push(bod);
		if (bod.constructor.name !== "Body") this[bod.constructor.name.toLowerCase() + "s"].push(bod);
	}
	
	
	
	
	clear(){
		for (var i = 0; i < this.bodies.length; i++){
			drop(this.#bodies[i]);
		}
	}
	*/
/*
	drop(bod){
		if (!exists(bod)){
			console.log("Alert: Tried to drop missing body from:" + this.ID);
			return;
		}
		for (var i = 0; i < this.bodies.length; i++){
			if (bod === this.bodies[i]){
				this.bodies.splice(i, 1);
				if (bod.constructor.name !== "Body"){
					if (this[bod.constructor.name.toLowerCase() + "s"] == undefined) continue;
					for (var h = 0; h < this[bod.constructor.name.toLowerCase() + "s"].length; h++){
						if (this[bod.constructor.name.toLowerCase() + "s"][h] === bod) this[bod.constructor.name.toLowerCase() + "s"].splice(h, 1);
					}
				}
				break;
			}
		}
	}
	*/
	
	
	
	/*
	physics(){
		for (var i = 0; i < this.#bodies.length; i++){
			this.#bodies[i].move();
			if (this.#bodies[i].x < -200 ||this.#bodies[i].y < -200 ||this.#bodies[i].x > this.width + 200 || this.bodies[i].y > this.height + 200) this.drop(this.bodies[i]);
		}
	}
	*/
/*	
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
		for (var posY = -100; posY < 1200; posY += 100 * this.scale){
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

		
		for (var i = 0; i < this.ships.length; i++){
			for (var s = i+1; s < this.ships.length; s++){
				if (this.ships[i].collidesWith(this.ships[s])) this.ships[i].collideWith(this.ships[s]);
			}
		}
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
	
	
	
	Hellaxy.space.zoomIn = function(){
		if (intervalReact(this.scale < 1.75, 250, "zoom")) this.scale += 0.25;
	}



	Hellaxy.space.zoomOut = function(){
		if (intervalReact(this.scale > 0.75, 250, "zoom")) this.scale -= 0.25;
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

*/

