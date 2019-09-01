class Ship extends Body{
	constructor(specs){  //designation, fraction, hp, shield, armour, a, wp1-3, sp1-4, skin
		super();
		this.shield = 0;
		this.armour = 1;
		this.aim = 0;
		this.ID = 0;
		this.staticID = 0;
		this.sector = {};
		this.ctrl = "none";
		this.active = true;
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
			Hellaxy.ships[specs.fraction + "_" + specs.designation] = this;
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
	
	
	
	dec(){
		var factor = (1 - this.a * 0.8)
		if (this.vx !== 0) this.vx = this.vx * factor;
		if (this.vy !== 0) this.vy = this.vy * factor;
	}
	
	
	
	turn(dir){
		if (dir === "stop"){
			this.vangle = 0;
		}
		if (dir === "left"){
			this.vangle = -60 * this.a;
		}
		if (dir === "right"){
			this.vangle = 60 * this.a;
		}
		
		if (dir !== undefined && typeof dir === "object"){
			this.aim = this.angleTowards(dir);
			if (Math.abs(this.aim - this.angle) < this.a * 60){
				this.angle = this.aim;
				this.vangle = 0;
				return;
			}
			if (this.angle <= 180){
				if (this.aim.between(this.angle, this.angle + 180)){
						this.vangle = this.a * 60;
					}
				else {
					this.vangle = this.a * -60;
				}
			}
			else {
				if (this.aim.between(this.angle, this.angle - 180)){ 
					this.vangle = this.a * -60;
				} 
				else{
					this.vangle = this.a * 60;
				}
			}
		}
	}
	
	
	
	follow(toFollow, atDistance){
		this.turn(toFollow);
		if (this.distanceTo(toFollow) > atDistance) {
			if (this.pointsAt(toFollow)) this.acc();
		}
		else {
			this.dec();
		}
	}
	
	
	
	spawn(inSector, atX, atY, atAngle, ctrl, abgang){
		if (!exists(Hellaxy.sectors[inSector])){
			inSector = "testmap";
			console.log("Spawnsector unknown. Moved new spawn to testmap");
		}
		var neuerSpawn = this.clone();
		neuerSpawn.x = setProp(atX, 0);
		neuerSpawn.y = setProp(atY, 0);
		neuerSpawn.angle = setProp(atAngle, 0);
		neuerSpawn.ctrl = setProp(ctrl, "none");
		neuerSpawn.abgang = setProp(abgang, "none");
		neuerSpawn.sector = Hellaxy.sectors[inSector];
		neuerSpawn.sector.add(neuerSpawn);
		neuerSpawn.sector.ships.push(neuerSpawn);
	}
	
	/*
	
	
	
	act(){
		var SECTOR = this.sector;
		if (this.hp < 1) this.explode();
		if (this.ctrl !== "none") this.ctrl();
		this.y -= this.vy;
		this.x += this.vx;
		if (this.vx > this.a * 80) this.vx = this.a * 80;
		if (this.vy > this.a * 80) this.vy = this.a * 80;
		if (this.vx < this.a * -80) this.vx = this.a * -80;
		if (this.vy < this.a * -80) this.vy = this.a * -80;
		this.angle = get360(this.angle);
		if (this.x < this.width/2) this.x = this.width/2, this.vx = 0; //Zur�cksetzen der Pos und V bei Randkollision
		if (this.y < this.height/2) this.y = this.height/2, this.vy = 0;
		if (this.x > SECTOR.width - this.width/2) this.x = SECTOR.width - this.width/2 , this.vx = 0;
		if (this.y > SECTOR.height - this.height/2 - 120) this.y = SECTOR.height - this.height/2 - 120, this.vy = 0;
		for (var h = 0; h < SECTOR.ships.length; h++){                                                   //Kollisions�berpr�fung
			if (this.collidesWith(SECTOR.ships[h]) && h !== this.ID) collide(this, SECTOR.ships[h]);
		}
		for (var h = 0; h < SECTOR.portals.length; h++){
			if (this.collidesWith(SECTOR.portals[h])){
				this.transferTo(SECTOR.portals[h].dest, SECTOR.portals[h].atX, SECTOR.portals[h].atY, SECTOR.portals[h].atAngle);
			}
		}
	}
	
	
	
	
	
	collidesWith(Suspect) {
		if (this.skin === undefined || Suspect === undefined || this.fraction === Suspect.fraction) return false;
		if (Suspect.fraction === "portal"){
			if (this.x.between(Suspect.x - this.skin.width/2, Suspect.x + this.skin.width/2 + Suspect.width)){
				if (this.y.between(Suspect.y - this.height/2, Suspect.y + this.height/2 + Suspect.height)) return true;
			}
			return false;
		}
		if (this.x.between(Suspect.x - this.width/2 - Suspect.width/2, Suspect.x + this.width/2 + Suspect.width/2)){
			if (this.y.between(Suspect.y - this.height/2 - Suspect.height/2, Suspect.y + this.height/2 + Suspect.height/2)) return true;
		}
		return false;
	}
	
	
	
	
	explode(){
		this.skin = Helon.ress.images.explosion;
		this.ctrl = function(){};
		play("explosion1");
		if (this.abgang !== undefined) this.abgang();
		setTimeout(function(ship){ship.sector.ships.splice(ship.ID, 1); ship.sector.refreshIDs();}, 2000, this);
		this.explode = function(){};
		this.abgang = function(){};
	}
	
	
	fire(slot){
		if (this["wp" + slot] === undefined || this.skin === Helon.ress.explosion) return;
		this["wp" + slot].fire();
	}
	
	
	
	nextShip(search, range){
		if (range === undefined) range = 1000;
		var pot = false;
		for (var k = 0; k < this.sector.ships.length; k++){
			if (this.distanceTo(this.sector.ships[k]) <= range && k !== this.ID && this.sector.ships[k].fraction !== "asteroid"){
				if (pot === false || this.distanceTo(this.sector.ships[k]) < this.distanceTo(pot)){
					if (search === undefined) pot = Hellaxy.sector.ships[k];
					if (search === "anythingElse"){
						if (this.sector.ships[k].fraction !== this.fraction) pot = Hellaxy.sector.ships[k];
					}
					else {
						if (search === this.fraction && search === this.sector.ships[k].fraction && this.sector.ships[k].mass > this.mass) pot = Hellaxy.sector.ships[k];
						if (search !== this.fraction && search === this.sector.ships[k].fraction) pot = Hellaxy.sector.ships[k];
					}
				}
			}
		}
		return pot;
	}
	
	
	nextShips(search, range){
		var matches = [];
		if (range === undefined) range = 1000;
			for (var k = 0; k < this.sector.ships.length; k++){
				if (this.distanceTo(this.sector.ships[k]) <= range && k !== this.ID && this.sector.ships[k].fraction !== "asteroid"){
					if (search === undefined) matches.push(Hellaxy.sector.ships[k]);
					if (search === "anythingElse" && this.sector.ships[k].fraction !== this.fraction) matches.push(Hellaxy.sector.ships[k]);
					if (search === this.sector.ships[k].fraction) matches.push(Hellaxy.sector.ships[k]);
				}
			}
		if (matches.length === 0) return false;
		return matches;
	}
	
	
	pointAt(toPointAt){ // Festlegen eines Zielwinkels
		this.aim = this.angleTowards(toPointAt);
	}

	
	
	pointFrom(toPointFrom){ // Festlegen eines Zielwinkels
		if (typeof toPointfrom !== "object") return;
		this.aim = get360(this.angleTowards(toPointFrom) + 180);
	}
	
	
	refreshID(){
		this.sector.refreshIDs();
	}
	
	
	spawn(inSector, atX, atY, atAngle, ctrl, abgang){ //inSector, atX, atY, atAngle, ctrl, relationShip, abgang
		if (inSector !== undefined) {
			inSector = Hellaxy.sectors[inSector.designation];
		} else {
			inSector = Hellaxy.sector;
		}
		if (ctrl === undefined) ctrl = "none";
		if (atAngle === undefined) atAngle = 0;
		inSector.spawnShip(this.fraction + "_" + this.designation, atX, atY, atAngle, ctrl, abgang);
	}
	
	
	transferTo(sector, atX, atY, atAngle){
		var neuerTransfer = this.clone();
		sector = Hellaxy.sectors[sector];
		neuerTransfer.sector = sector;
		neuerTransfer.x = atX;
		neuerTransfer.y = atY;
		neuerTransfer.angle = atAngle;
		sector.ships.push(neuerTransfer);
		if (this.ctrl === player1){
			if (typeof Hellaxy.sector.theme === "object") resetAudio();
			Hellaxy.sector = sector;
			projectile.splice(0, projectile.length);
		}
		this.sector.ships.splice(this.ID, 1);
		this.sector.refreshIDs();
		var klon = sector.ships[sector.ships.length - 1];
		for (var r = 0; r < sector.ships.length -1; r++){
			if (klon.collidesWith(sector.ships[r])){
				while (klon.collidesWith(sector.ships[r])){
					klon.x -= 50;
				}
			}
		}
		for (var p = 0; p < sector.portals.length; p++){
			if (klon.collidesWith(sector.portals[p])){
				while (klon.collidesWith(sector.ships[r])){
					klon.x += 50;
				}
				for (var r = 0; r < sector.ships.length -1; r++){
					if (klon.collidesWith(sector.ships[r])){
						while (klon.collidesWith(sector.ships[r])){
							klon.x += 50;
						}
					}
				}
			}
		}
	}
	
	
	turn(dir){
		if (dir === "left"){
			this.angle -= 60 * this.a;
		}
		if (dir === "right"){
			this.angle += 60 * this.a;
		}
		
		if (dir === undefined || dir === "target"){ 
			if (Math.abs(this.aim - this.angle) <= this.a * 60){
				this.angle = this.aim;
				return;
			}
			if (this.angle <= 180){
				if (this.aim.between(this.angle, this.angle + 180)){
						this.angle += this.a * 60;
					}
				else {
					this.angle -= this.a * 60;
				}
			}
			else {
				if (this.aim.between(this.angle, this.angle - 180)){ 
					this.angle -= this.a * 60;
				} 
				else{
					this.angle += this.a * 60;
				}
			}
		}
	}
	
	
	turnArround(){ // Initialisieren einer 180� Drehung
		this.aim = get360(this.angle - 180);
	}
	
	
	useSpecial(slot){
		if (this["sp" + slot] === undefined) return;
		this["sp" + slot].exe();
	}
	
	
	vanish(){
		this.sector.ships.splice(this.ID, 1);
		this.sector.refreshIDs();
	}
	
	*/
}



function collide(a, b){
	var collision = {};
	collision.potX = a.vx + b.vx;
	collision.potY = a.vy + b.vy;
	collision.potDmg = Math.sqrt(Math.abs(collision.potX)*Math.abs(collision.potX) + Math.abs(collision.potX)*Math.abs(collision.potX));
	collision.potM = a.mass + b.mass;
	a.vx = -collision.potX * (b.mass / collision.potM);
	a.vy = -collision.potY * (b.mass / collision.potM);
	b.vx = collision.potX * (a.mass / collision.potM);
	b.vy = collision.potY * (a.mass / collision.potM);
	a.hp -= collision.potDmg * (b.mass / collision.potM) * 8;
	b.hp -= collision.potDmg * (a.mass / collision.potM) * 8;
	a.hp = Math.round(a.hp);
	b.hp = Math.round(b.hp);
		a.y -= 2*a.vy;
		a.x += 2*a.vx;
		b.y -= 2*b.vy;
		b.x += 2*b.vx;
}

	
function setupShips(){  //designation, fraction, hp, shield, armour, a, wp1-3, sp1-4
	new Ship({designation : "testarrow", fraction : "none", hp : 100, shield : 100, armour : 1, a : 0.5, wp1 : "machinegun_5nm"});
	new Ship({designation : "asteroid1", fraction : "asteroid", hp : 500, shield : 0, armour : 1, a : 0.025, sp1 : "asteroidBreak", abgang : function(){this.sp1.exe();}});
	new Ship({designation : "asteroid2", fraction : "asteroid", hp : 350, shield : 0, armour : 1, a : 0.037, sp1 : "asteroidBreak", abgang : function(){this.sp1.exe();}});
	new Ship({designation : "asteroid3", fraction : "asteroid", hp : 200, shield : 0, armour : 1, a : 0.05, sp1 : "asteroidBreak", abgang : function(){this.sp1.exe();}});
	new Ship({designation : "shuttle", fraction : "humanian", hp : 100, shield : 0, armour : 1, a : 0.1, wp1 : "machinegun_5nm"});
	new Ship({designation : "protobaseship_helonia", fraction : "humanian", hp : 12000, shield : 0, armour : 5, a : 0.03, wp1 : "kolexialgun_14nm"});
	new Ship({designation : "satalite", fraction : "humanian", hp : 15, shield : 0, armour : 1, a : 0});
	new Ship({designation : "fatman", fraction : "none", hp : 1000, shield : 500, armour : 2, a : 0.02, wp1 : "machinegun_5nm"});
	new Ship({designation : "hq", fraction : "republic", hp : 1000000, shield : 2000000, armour : 3});
	new Ship({designation : "colonizer", fraction : "qubanian", hp : 2000, shield : 0, armour : 1, a : 0.02});
	new Ship({designation : "colonizer_mkii", fraction : "qubanian", hp : 1000, shield : 0, armour : 1, a : 0.05, wp1 : "triangle_beam"});
	new Ship({designation : "colony", fraction : "qubanian", hp : 2444, shield : 444, armour : 1, a : 0, wp1 : "machinegun_5nm", sp1 : "flak_around"});
	new Ship({designation : "annector", fraction : "ophianic", hp : 16666, shield : 0, armour : 2, a : 0.005, wp1 : "ophianian_beam", sp1 : "spawn_ophianianChunk"});
	new Ship({designation : "chunk", fraction : "ophianic", hp : 300, armour : 1, a : 0.09, ctrl : npc.rammer});
	new Ship({designation : "chunk", fraction : "tonium", hp : 300, armour : 1, a : 0.09, ctrl : npc.fairy, mergeTo : "star"});
	new Ship({designation : "star", fraction : "tonium", hp : 17777, armour : 1, a : 0.05, ctrl : npc.fairy, mergeTo : "star", wp1 : "star_beam"});
	new Ship({designation : "colonizer", fraction : "chestanian", hp : 3600, armour : 3, a : 0.02, wp1 : "spike_artillery"});
	new Ship({designation : "spiketank", fraction : "chestanian", hp : 1200, armour : 3, a : 0.03, wp1 : "spike_artillery"});
	new Ship({designation : "glider", fraction : "chestanian", hp : 500, armour : 2, a : 0.06, wp1 : "emp_director_1"});
	new Ship({designation : "quintalglider", fraction : "chestanian", hp : 2500, armour : 2, a : 0.05, wp1 : "emp_director_2"});
	new Ship({designation : "glider", fraction : "birchanian", hp : 10, armour : 1, a : 0.11, wp1 : "emp_director_small"});
	new Ship({designation : "fortress_ai", fraction : "birchanian", hp : 200000, armour : 1, a : 0});
	
	console.log("Ships:", Hellaxy.ships);
}