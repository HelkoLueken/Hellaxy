﻿function player1(){
	player1Pos = i;
	/*if (sector[sector.at].ships[i].x < frame.x + 200 && frame.x > 0) frame.x = sector[sector.at].ships[i].x - 200; //Folgen des Spielers des Screens
	if (sector[sector.at].ships[i].x > frame.x + 1080 && frame.x < sector[sector.at].width - 1280) frame.x = sector[sector.at].ships[i].x - 1080;
	if (sector[sector.at].ships[i].y < frame.y + 200 && frame.y > 0) frame.y = sector[sector.at].ships[i].y - 200;
	if (sector[sector.at].ships[i].y > frame.y + 400 && frame.y < sector[sector.at].height - 720) frame.y = sector[sector.at].ships[i].y - 400; */
	frame.x = SHIP.x - 640;
	frame.y = SHIP.y - 360;
	frame.adjust();
	if (!click){
		if (key.a) sector[sector.at].ships[i].angle -= 40 * sector[sector.at].ships[i].a; //Drehung
		if (key.d) sector[sector.at].ships[i].angle += 40 * sector[sector.at].ships[i].a;
	} else {
		this.pointAt({x : cursor.x + frame.x, y : cursor.y + frame.y});
		this.turn();
	}
	if (key.w) {
		sector[sector.at].ships[i].acc();
	}
	if (key.s) {
		sector[sector.at].ships[i].dec();
	}
	if (key.space) sector[sector.at].ships[i].fireSmall();
}

var npc = {};
function setupNpcs(){
	npc.simpleRoamer = function(){
		this.acc();
		if (intervalReact(this.x < 150 || this.x > background.naturalWidth - 150 || this.y < 150 || this.y > background.naturalHeight - 320, 5000, "turnarround" + this.ID)) this.turnArround();
		if (this.nextShip("anythingElse", 400) !== false){
			if (this.hp >= ship[this.designation].hp / 2){
				this.pointAt(this.nextShip("anythingElse", 400));
				if (this.pointsAt(this.nextShip("anythingElse", 400))) {
					this.fireSmall()
					if (this.special1 !== undefined) this.special1.exe();
				}
			}
			if (this.hp < ship[this.designation].hp / 2){
				this.pointFrom(this.nextShip("anythingElse", 400));
			}
		}
	}
	npc.defender = function(){
		var of = sector[sector.at].ships[this.relationShipID];
		if (of.active === true){
			if (of.nextShip("anythingElse", 300) === false){
				this.follow(of, 50);
			} else {
				this.follow(of.nextShip("anythingElse", 300), 20);
				if (this.pointsAt(of.nextShip("anythingElse", 300))) this.fireSmall();
			}
		} else {this.ctrl = npc.simpleRoamer;}
	}
	npc.striver = function(){
		this.acc();
		if (this.hp < ship[this.designation].hp / 2) this.turnArround();
	}
	npc.test = function(){
		if (intervalReact(true, 3000, "testturn"))this.turnArround();
		//this.pointAt(sector[sector.at].ships[0]);
		if (this.pointsAt(sector[sector.at].ships[0])) this.fireSmall();
	}
	
	npc.ophianian = function(){
		if (intervalReact(this.x < 150 || this.x > background.naturalWidth - 150 || this.y < 150 || this.y > background.naturalHeight - 320, 5000, "turnarround" + this.ID)) this.turnArround();
		if (this.nextShip("humanian", 400) !== false){
				this.pointAt(this.nextShip("humanian", 400), 300);
				this.special1.exe();
				if (this.pointsAt(this.nextShip("humanian", 400))) this.fireSmall();
		} else {this.follow({x:1100, y:1100}, 1);}
	}
}