var ship = {};
function createShip(declaration, fraction, texture, hp, shield, armour, acc, wp1, wp2, wp3){
	var neuesSchiff = {};
	neuesSchiff.x = 0;
	neuesSchiff.y = 0;
	neuesSchiff.vx = 0;
	neuesSchiff.vy = 0;
	neuesSchiff.angle = 0;
	neuesSchiff.ctrl = "none";
	neuesSchiff.designation = declaration;
	neuesSchiff.fraction = fraction;
	neuesSchiff.active = true;
	neuesSchiff.hp = hp;
	neuesSchiff.shield = shield;
	neuesSchiff.armour = armour;
	neuesSchiff.a = acc;
	neuesSchiff.skin = image["ship_" + texture];
	if (wp1 !== undefined) neuesSchiff.lightWp = weapon[wp1];
	if (wp2 !== undefined) neuesSchiff.mediumWp = weapon[wp2];
	if (wp3 !== undefined) neuesSchiff.heavyWp = weapon[wp3];
	neuesSchiff.acc = function(){
		sector[sector.at].ships[i].vy += Math.cos(sector[sector.at].ships[i].angle * Math.PI / 180) * sector[sector.at].ships[i].a;
		sector[sector.at].ships[i].vx += Math.cos((sector[sector.at].ships[i].angle - 90) * Math.PI / 180) * sector[sector.at].ships[i].a;
	}
	neuesSchiff.dec = function(){
		sector[sector.at].ships[i].vy -= Math.cos(sector[sector.at].ships[i].angle * Math.PI / 180) * sector[sector.at].ships[i].a;
		sector[sector.at].ships[i].vx -= Math.cos((sector[sector.at].ships[i].angle - 90) * Math.PI / 180) * sector[sector.at].ships[i].a;
	}
	neuesSchiff.collidesWith = function (obj) {
		var collision = false;
		if (this.x === obj.x || this.x.between(obj.x, obj.x + obj.skin.naturalWidth) || (this.x + this.skin.naturalWidth).between(obj.x, obj.x + obj.skin.naturalWidth)){
			if (this.y === obj.y) collision = true;
			if (this.y.between(obj.y, obj.y + obj.skin.naturalHeight)) collision = true;
			if ((this.y + this.skin.naturalHeight).between(obj.y, obj.y + obj.skin.naturalHeight)) collision = true;
		}
		return collision;
	}
	neuesSchiff.killSwitch = function(){
		this.active = false;
	}
	neuesSchiff.explode = function(){
		setTimeout(this.killSwitch, 1000);
		this.active = "explosion";
		audio.explosion1.play();
	}
	neuesSchiff.pointAt = function(target){
		if (target.x <= this.x && target.y <= this.y) {
			if (this.angle < 45 && this.angle > 225) this.angle += this.a * 100;
			if (this.angle < 225 && this.angle > 45) this.angle -= this.a * 100;
		}
		if (target.x <= this.x && target.y > this.y) {
			if (this.angle < 135 && this.angle > 315) this.angle += this.a * 100;
			if (this.angle < 315 && this.angle > 135) this.angle -= this.a * 100;
		}
		if (target.x > this.x && target.y <= this.y) {
			if (this.angle < 315 && this.angle > 135) this.angle += this.a * 100;
			if (this.angle < 135 && this.angle > 315) this.angle -= this.a * 100;
		}
		if (target.x > this.x && target.y > this.y) {
			if (this.angle < 225 && this.angle > 45) this.angle += this.a * 100;
			if (this.angle < 45 && this.angle > 225) this.angle -= this.a * 100;
		}
	}
	neuesSchiff.nextShip = function(search, range){
		var pot;
		for (h = 1; h <= range; h++){
			for (k = 0; k < h; k++){
				for (j = 0; j < sector[sector.at].ships.length; j++){
					if (sector[sector.at].ships[j].x === this.x - h && sector[sector.at].ships[j].y === this.y - k) sector[sector.at].ships[j] = pot;
					if (sector[sector.at].ships[j].x === this.x - h && sector[sector.at].ships[j].y === this.y + k) sector[sector.at].ships[j] = pot;
					if (sector[sector.at].ships[j].x === this.x + h && sector[sector.at].ships[j].y === this.y - k) sector[sector.at].ships[j] = pot;
					if (sector[sector.at].ships[j].x === this.x + h && sector[sector.at].ships[j].y === this.y + k) sector[sector.at].ships[j] = pot;
					if (pot !== undefined){
						if (search === "anything") return pot;
						if (sector[sector.at].ships[j].fraction === search) return pot;
					}
				}
			}
		}
	}
	ship[declaration] = neuesSchiff;
}

function spawnShip(thatOne, atX, atY, atAngle,  withCtrl){
	var neuerSpawn = ship[thatOne];
	neuerSpawn.x = atX;
	neuerSpawn.y = atY;
	neuerSpawn.angle = atAngle;
	neuerSpawn.ctrl = withCtrl;
	sector[sector.at].ships.push(neuerSpawn);
	setupShips();
}

function displayShips(){
	for (i = 0; i < sector[sector.at].ships.length; i++){
		if (sector[sector.at].ships[i].active === "explosion") Game.ctx.drawImage(image.explosion, sector[sector.at].ships[i].x - frame.x, sector[sector.at].ships[i].y - frame.y, sector[sector.at].ships[i].skin.naturalWidth, sector[sector.at].ships[i].skin.naturalWidth);
		if (sector[sector.at].ships[i].active === true){
			Game.ctx.translate(sector[sector.at].ships[i].x + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.x, sector[sector.at].ships[i].y + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.y); // Drehung
			Game.ctx.rotate(sector[sector.at].ships[i].angle * Math.PI / 180);
			Game.ctx.translate(-(sector[sector.at].ships[i].x + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.x), -(sector[sector.at].ships[i].y + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.y));
			Game.ctx.drawImage(sector[sector.at].ships[i].skin, sector[sector.at].ships[i].x - frame.x, sector[sector.at].ships[i].y - frame.y); // Display
			Game.ctx.translate(sector[sector.at].ships[i].x + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.x, sector[sector.at].ships[i].y + sector[sector.at].ships[i].skin.naturalWidth/2 -frame.y); // Rückdrehung
			Game.ctx.rotate(-sector[sector.at].ships[i].angle * Math.PI / 180);
			Game.ctx.translate(-(sector[sector.at].ships[i].x + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.x), -(sector[sector.at].ships[i].y + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.y));
		}
	}
}
	
function setupShips(){
	createShip("Testarrow", "none", "testarrow", 100, 100, 0.5, 0.1, "5nm machinegun");
	createShip("Humanian Shuttle", "humanian", "humanian_shuttle", 100, 0, 1, 0.1, "5nm machinegun");
	createShip("Humanian Protobaseship Helonia","humanian", "protobaseship_helonia", 8000, 0, 5, 0.03, "1.4 mm kolexial gun");
	createShip("Republic Base", "republic", "rep_hq", 2000000, 1000000, 3, 0, "5nm machinegun");
}