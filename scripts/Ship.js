class Ship extends Body{
	constructor(specs){  //designation, fraction, hp, shield, armour, a, wp1-3, sp1-4, skin
		super();
		this.shield = 0;
		this.armour = 1;
		this.aim = 0;
		this.ctrl = "none";
		this.abgang = function(){};
		this.active = true;
		this.screen = Hellaxy.space;
		for (var property in specs){
			this[property] = specs[property];
			for (var i = 1; i < 3; i++){
				if (property == ["wp" + i] && specs["wp" + i].designation === undefined){
					this["wp" + i] = Hellaxy.weapons[specs[property]];
				}
				if (property == ["sp" + i] && specs["sp" + i].reload === undefined){
					this["sp" + i] = Hellaxy.weapons[specs[property]];
				}
			}
		}
		this.mass = this.hp;
		this.maxshield = this.shield;
		if (exists(specs)){
			this.setSkin("ship_" + this.fraction + "_" + this.designation);
			Hellaxy.shipTypes[specs.fraction + "_" + specs.designation] = this;
		}
	}
	
	
	
	
	
	acc(dir){
		if (dir === undefined) dir = "frontal";
		if (dir === "frontal"){
			this.vy += Math.cos(this.angle * Math.PI / 180) * this.a;
			this.vx += Math.cos((this.angle - 90) * Math.PI / 180) * this.a;
		}
		if (dir === "left"){
			this.vy += Math.cos((this.angle - 90) * Math.PI / 180) * this.a * 0.3;
			this.vx += Math.cos((this.angle - 180) * Math.PI / 180) * this.a * 0.3;
		}
		if (dir === "right"){
			this.vy += Math.cos((this.angle + 90) * Math.PI / 180) * this.a * 0.3;
			this.vx += Math.cos((this.angle + 180) * Math.PI / 180) * this.a * 0.3;
		}
		if (this.vx > this.a * 100) this.vx = this.a * 100;
		if (this.vy > this.a * 100) this.vy = this.a * 100;
		if (this.vx < this.a * -100) this.vx = this.a * -100;
		if (this.vy < this.a * -100) this.vy = this.a * -100;
	}
	
	
	
	clone(){
		var clone = new Ship();
		for (var property in this){
			clone[property] = this[property];
			for (var i = 1; i < 3; i++){
				if (property == ["wp" + i]){
					clone["wp" + i] = this["wp" + i].clone();
					clone["wp" + i].ship = clone;
				}
				if (property == ["sp" + i]){
					clone["sp" + i] = this["sp" + i].clone();
					clone["sp" + i].ship = clone;
				}
			}
		}
		return clone;
	}
	
	
	
	collideWith(ship){
		super.collideWith(ship);
		
		/*
		var scale = 0.3;
		var collisionSpeed = Math.sqrt(((this.vx - ship.vx) ^ 2) + ((this.vy - ship.vy) ^ 2));
		var damageQuote = 3 - (Math.abs(-1 / (scale * collisionSpeed + 0.5 ) - 1 ));
		console.log(collisionSpeed, damageQuote);
		
		this.hp -= this.hp * damageQuote * (ship.mass / (ship.mass * this.mass)) + 1;
		ship.hp -= ship.hp * damageQuote * (this.mass / (ship.mass * this.mass)) + 1;
		*/
		
		
		/*
		var collision = {};
		collision.potDX = this.vx - ship.vx;
		collision.potDY = this.vy - ship.vy;
		collision.v = (Math.abs(collision.potDX) + Math.abs(collision.potDY) );
		collision.mass = this.mass + ship.mass;
		collision.dmg = Math.sqrt(collision.v) * collision.mass / 5;
		this.hp -= collision.dmg * (ship.mass / collision.mass) + 1;
		ship.hp -= collision.dmg * (this.mass / collision.mass) + 1; */
		
		
		this.hp = Math.round(this.hp);
		ship.hp = Math.round(ship.hp);
	}
	
	
	
	collidesWith(ship){
		return (this.overlaps(ship) && this.fraction != ship.fraction);
	}
	
	
	
	dec(){
		var factor = (1 - this.a * 0.8)
		if (this.vx !== 0) this.vx = this.vx * factor;
		if (this.vy !== 0) this.vy = this.vy * factor;
	}
	
	
	
	draw(){
		super.draw();
		this.printBar();
	}
	
	
	
	explode(){
		this.skin = Helon.ress.images.proj_explosion;
		play("explosion1");
		if (exists(this.abgang)) this.abgang();
		setTimeout(function(wreck){wreck.drop()}, 2000, this);
		this.ctrl = function(){};
		this.move = super.move;
	}
	
	
	
	turn(dir){
		let factor = 47;
		if (dir === "stop"){
			this.vangle = 0;
		}
		if (dir === "left"){
			this.vangle = -factor * this.a;
		}
		if (dir === "right"){
			this.vangle = factor * this.a;
		}
		
		if (exists(dir) && typeof dir === "object"){
			this.aim = this.angleTowards(dir);
			if (Math.abs(this.aim - this.angle) < this.a * factor){
				this.angle = this.aim;
				this.vangle = 0;
				return;
			}
			if (this.angle <= 180){
				if (this.aim.between(this.angle, this.angle + 180)){
						this.vangle = this.a * factor;
					}
				else {
					this.vangle = this.a * -factor;
				}
			}
			else {
				if (this.aim.between(this.angle, this.angle - 180)){ 
					this.vangle = this.a * -factor;
				} 
				else{
					this.vangle = this.a * factor;
				}
			}
		}
	}
	
	
	
	turnFrom(dir){
		let factor = 47;
		if (!exists(dir)) return;
		if (typeof dir === "object"){
			this.aim = get360(this.angleTowards(dir) + 180);
			if (Math.abs(this.aim - this.angle) < this.a * factor){
				this.angle = this.aim;
				this.vangle = 0;
				return;
			}
			if (this.angle <= 180){
				if (this.aim.between(this.angle, this.angle + 180)){
						this.vangle = this.a * factor;
					}
				else {
					this.vangle = this.a * -factor;
				}
			}
			else {
				if (this.aim.between(this.angle, this.angle - 180)){ 
					this.vangle = this.a * -factor;
				} 
				else{
					this.vangle = this.a * factor;
				}
			}
		}
	}
	
	
	
	fire(slot){
		if (!exists(slot)) slot = 1;
		if (!exists(this["wp" + slot])|| this.skin === Helon.ress.explosion) return;
		this["wp" + slot].fire();
	}
	
	
	
	follow(toFollow, atDistance){
		if (!exists(toFollow)) toFollow = this.nextShip();
		if (!exists(atDistance)) atDistance = 4 * this.width;
		this.turn(toFollow);
		if (this.distanceTo(toFollow) > atDistance) {
			if (this.pointsAt(toFollow)) this.acc();
		}
		else {
			this.dec();
		}
	}
	
	
	
	move(){
		super.move();
		if (this.hp <= 0) this.explode();
	}
	
	
	
	nextShip(search, range){
		if (!exists(search)) search = "anything";
		if (!exists(range)) range = 700;
		var pot = false;
		for (var k = 0; k < Hellaxy.ships.length; k++){
			if (this.distanceTo(Hellaxy.ships[k]) <= range && Hellaxy.ships[k] !== this &&  Hellaxy.ships[k].fraction !== "asteroid"){
				if (pot === false || this.distanceTo(Hellaxy.ships[k]) < this.distanceTo(pot)){
					if (search === "anything"){
						pot = Hellaxy.sector.ships[k];
						continue;
					}
					if (search === "anythingElse"){
						if (Hellaxy.ships[k].fraction !== this.fraction) pot = Hellaxy.ships[k];
					}
					else {
						if (search === this.fraction && search ===  Hellaxy.ships[k].fraction &&  Hellaxy.ships[k].ctrl !== this.ctrl) pot = Hellaxy.sector.ships[k];
						if (search !== this.fraction && search ===  Hellaxy.ships[k].fraction) pot = Hellaxy.sector.ships[k];
					}
				}
			}
		}
		return pot;
	}
	
	/*
	
	nextShips(search, range){
		var matches = [];
		if (!exists(search)) search = "anything";
		if (!exists(range)) range = 1000;
			for (var k = 0; k < this.sector.ships.length; k++){
				if (this.distanceTo(this.sector.ships[k]) <= range && k !== this.ID && this.sector.ships[k].fraction !== "asteroid"){
					if (search === "anything") matches.push(this.sector.ships[k]);
					if (search === "anythingElse" && this.sector.ships[k].fraction !== this.fraction) matches.push(this.sector.ships[k]);
					if (search === this.sector.ships[k].fraction) matches.push(this.sector.ships[k]);
				}
			}
		if (matches.length === 0) return false;
		return matches;
	} */
	
	
	
	printBar(){
		if (this.hp <=0) return;
		hellaxy.canvas.strokeStyle = "red";  //infotafel f�r Schiffe
		hellaxy.canvas.fillStyle = "green";
		var x = (this.x - this.screen.offsetX) * this.screen.scale - this.width/2 * this.screen.scale;
		var y = (this.y - this.screen.offsetY) * this.screen.scale - this.height/1.7 * this.screen.scale;
		hellaxy.canvas.strokeRect(x, y, this.width * this.screen.scale, 6);
		hellaxy.canvas.fillRect(x, y, this.width * (this.hp / this.mass) * this.screen.scale, 6);
		hellaxy.canvas.fillStyle = "cyan";
		hellaxy.canvas.fillRect(x, y, this.width * (this.shield / this.maxshield) * this.screen.scale, 6);
		hellaxy.canvas.strokeStyle = "yellow";
		hellaxy.canvas.fillStyle = "yellow";
	}
	
	
	
	printPlayerGUI(){
		hellaxy.canvas.fillStyle = "grey";
		hellaxy.canvas.fillRect(0,960,1920,120);
		hellaxy.canvas.fillStyle = "white";
		hellaxy.canvas.fillRect(9,969,102,102);
		hellaxy.canvas.strokeStyle = "black";
		hellaxy.canvas.lineWidth = 10;
		hellaxy.canvas.strokeRect(9,969,1902,102);
		hellaxy.canvas.strokeRect(9,969,102,102);
		hellaxy.canvas.drawImage(this.skin, 14, 974, 92, 92);
		hellaxy.canvas.fillStyle = "black";
		if (this.maxshield !== 0) hellaxy.canvas.fillText("Shield:", 120, 1005);
		hellaxy.canvas.fillText("Structure:", 120, 1045);
		hellaxy.canvas.fillStyle = "red";
		if (this.maxshield !== 0) hellaxy.canvas.fillRect(300, 980, 200, 30);
		hellaxy.canvas.fillRect(300, 1020, 200, 30);
		hellaxy.canvas.fillStyle = "cyan";
		if (this.shield !== 0) hellaxy.canvas.fillRect(300, 980, 200 * (this.shield / this.maxshield), 30);
		hellaxy.canvas.fillStyle = "green";
		hellaxy.canvas.fillRect(300, 1020, 200 * (this.hp / this.mass), 30);
		hellaxy.canvas.lineWidth = 4;
		if (this.shield !== 0) hellaxy.canvas.strokeRect(300, 980, 200, 30);
		hellaxy.canvas.strokeRect(300, 1020, 200, 30);
		hellaxy.canvas.lineWidth = 2;
		hellaxy.canvas.fillStyle = "black";
		if (this.shield !== 0) hellaxy.canvas.fillText(this.shield, 310, 1005);
		hellaxy.canvas.fillText(this.hp, 310, 1045);
		hellaxy.canvas.fillText("=> In outer Space", 1600 , 1000);
		hellaxy.canvas.fillText("  X:" + Math.round(this.x) + " Y:" + Math.round(this.y), 1600 , 1040);
		if (this.wp1 !== undefined) {
			hellaxy.canvas.fillText(this.wp1.designation + ":", 550, 1000);
			hellaxy.canvas.fillText(this.wp1.ammo, 580 + hellaxy.canvas.measureText(this.wp1.designation).width, 1000);
			if (!queue[this.wp1.designation + this.staticID]){
				hellaxy.canvas.strokeStyle = "green";
				hellaxy.canvas.strokeText("Loaded", 650 + hellaxy.canvas.measureText(this.wp1.designation).width, 1000);
				hellaxy.canvas.strokeStyle = "black";
			}
		}
		if (this.wp2 !== undefined) {
			hellaxy.canvas.fillText(this.wp2.designation + ":", 550, 1030);
			hellaxy.canvas.fillText(this.wp2.ammo, 580 + hellaxy.canvas.measureText(this.wp2.designation).width, 1030);
			if (!queue[this.wp1.designation + this.staticID]){
				hellaxy.canvas.strokeStyle = "green";
				hellaxy.canvas.strokeText("Loaded", 650 + hellaxy.canvas.measureText(this.wp1.designation).width, 1030);
				hellaxy.canvas.strokeStyle = "black";
			}
		}
		if (this.wp3 !== undefined) {
			hellaxy.canvas.fillText(this.wp3.designation + ":", 550, 1340);
			hellaxy.canvas.fillText(this.wp3.ammo, 580 + hellaxy.canvas.measureText(this.wp3.designation).width, 1060);
			if (!queue[this.wp1.designation + this.staticID]){
				hellaxy.canvas.strokeStyle = "green";
				hellaxy.canvas.strokeText("Loaded", 650 + hellaxy.canvas.measureText(this.wp1.designation).width, 1060);
				hellaxy.canvas.strokeStyle = "black";
			}
		}
		hellaxy.canvas.strokeStyle = "yellow";
	} 
	
	
	
	//@Description Spawns a clone of the ship saved in Hellaxy.shipTypes in Hellaxy.ships. It will be displayed at the space screen. Ships with the player1 control will always be put at Hellaxy.ships[0]!
	spawn(atX, atY, ctrl, abgang){
		var neuerSpawn = this.clone();
		neuerSpawn.x = setProp(atX + Math.floor((Math.random() * 10 * this.skin.width) - 5 * this.skin.width), 0);
		neuerSpawn.y = setProp(atY + Math.floor((Math.random() * 10 * this.skin.width) - 5 * this.skin.width), 0);
		neuerSpawn.angle = Math.floor(Math.random() * 359);
		if (ctrl !== undefined && typeof ctrl === "function") neuerSpawn.ctrl = ctrl;
		if (abgang !== undefined && typeof abgang === "function") neuerSpawn.abgang = abgang;
		if (neuerSpawn.ctrl === player1 && Hellaxy.ships.length > 0){
			Hellaxy.ships.push(Hellaxy.ships[0]);
			Hellaxy.ships[0] = neuerSpawn;
			Console.log("Hint: You didnt spawn the player first. The players ship will however always be referencable as Hellaxy.ships[0]");
			return;
		}
		Hellaxy.ships.push(neuerSpawn);
	}
	
	
	
	spawnSquad(atX, atY, quantity, ctrl, abgang){
		var hor = 0;
		var ver = 0;
		var spawned = 0;
		while (spawned < quantity){
			this.spawn(atX + hor * this.width * 2, atY + ver * this.height * 2, ctrl, abgang);
			spawned++;
			hor++;
			if (hor >= Math.sqrt(quantity)){
				hor = 0;
				ver++;
			}
		}
	}
	
	
	
	useSpecial(slot){
		if (!exists(slot)) slot = 1;
		if (!exists(this["sp" + slot])|| this.skin === Helon.ress.explosion) return;
		this["sp" + slot].exe();
	}
	
	
	
	drop(){
		Hellaxy.ships.splice(Hellaxy.ships.indexOf(this), 1);
	}
}


	
function setupShips(){  //designation, fraction, hp, shield, armour, a, wp1-3, sp1-4
	new Ship({designation : "testarrow", fraction : "none", hp : 100, shield : 100, armour : 1, a : 0.5, wp1 : "machinegun_5nm"});
	new Ship({designation : "asteroid1", fraction : "asteroid", hp : 500, shield : 0, armour : 1, a : 0.025, sp1 : "asteroidBreak", abgang : function(){this.sp1.exe();}});
	new Ship({designation : "asteroid2", fraction : "asteroid", hp : 350, shield : 0, armour : 1, a : 0.037, sp1 : "asteroidBreak", abgang : function(){this.sp1.exe();}});
	new Ship({designation : "asteroid3", fraction : "asteroid", hp : 200, shield : 0, armour : 1, a : 0.05, sp1 : "asteroidBreak", abgang : function(){this.sp1.exe();}});
	new Ship({designation : "shuttle", fraction : "humanian", hp : 100, shield : 0, armour : 1, a : 0.08, wp1 : "machinegun_5nm"});
	new Ship({designation : "protobaseship_helonia", fraction : "humanian", hp : 12000, shield : 0, armour : 5, a : 0.03, wp1 : "kolexialgun_14nm"});
	new Ship({designation : "satalite", fraction : "humanian", hp : 250, shield : 0, armour : 1, a : 0.04});
	new Ship({designation : "fatman", fraction : "none", hp : 1000, shield : 500, armour : 2, a : 0.02, wp1 : "machinegun_5nm"});
	new Ship({designation : "hq", fraction : "republic", hp : 1000000, shield : 2000000, armour : 3});
	new Ship({designation : "colonizer", fraction : "qubanian", hp : 2000, shield : 0, armour : 1, a : 0.02});
	new Ship({designation : "colonizer_mkii", fraction : "qubanian", hp : 1000, shield : 0, armour : 1, a : 0.05, wp1 : "triangle_beam"});
	new Ship({designation : "colony", fraction : "qubanian", hp : 2444, shield : 444, armour : 1, a : 0, wp1 : "machinegun_5nm", sp1 : "flak_around"});
	new Ship({designation : "annector", fraction : "ophianian", hp : 16666, shield : 0, armour : 2, a : 0.005, wp1 : "ophianian_beam", sp1 : "spawn_ophianianChunk"});
	new Ship({designation : "chunk", fraction : "ophianian", hp : 1000, armour : 1, a : 0.09, ctrl : npc.rammer});
	new Ship({designation : "chunk", fraction : "tonium", hp : 1000, armour : 1, a : 0.09, ctrl : npc.fairy, mergeTo : "star"});
	new Ship({designation : "star", fraction : "tonium", hp : 17777, armour : 1, a : 0.05, ctrl : npc.fairy, mergeTo : "star", wp1 : "star_beam"});
	new Ship({designation : "colonizer", fraction : "chestanian", hp : 3600, armour : 3, a : 0.02, wp1 : "spike_artillery"});
	new Ship({designation : "spiketank", fraction : "chestanian", hp : 1200, armour : 3, a : 0.03, wp1 : "spike_artillery"});
	new Ship({designation : "glider", fraction : "chestanian", hp : 500, armour : 2, a : 0.06, wp1 : "emp_director_1"});
	new Ship({designation : "quintglider", fraction : "chestanian", hp : 2500, armour : 2, a : 0.05, wp1 : "emp_director_2"});
	new Ship({designation : "glider", fraction : "birchanian", hp : 10, armour : 1, a : 0.11, wp1 : "emp_director_small", ctrl : npc.rammer});
	new Ship({designation : "fortress_ai", fraction : "birchanian", hp : 200000, armour : 1, a : 0});
	
	console.log("Shiptypes:", Hellaxy.shipTypes);
}