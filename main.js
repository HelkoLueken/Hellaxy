﻿
var Game = {};

// Setup

var SHIP = {}; //Momentan handelndes Schiff
var LEVEL = {}; //Momentan aktives Level
var player1Pos; //Momentane Schiff-ID des durch den Spieler1 gesteurten Schiffes
var target = "none"; //Missionszielobjekt
var background = new Image(); // Momentanes BG-sample
var infoScreen = false;
var pausedScreen = false;
var frame = {
	x: 0,
	y: 0
};
frame.adjust = function(){
	if (frame.y < 0) frame.y = 0;
	if (frame.y > sector[sector.at].height - 720) frame.y = sector[sector.at].height - 720;
	if (frame.x > sector[sector.at].width - 1280) frame.x = sector[sector.at].width - 1280;
	if (frame.x < 0) frame.x = 0;
}
var stop = false;


// Canvas-Initialisierung
window.onload = function() {
	var canvas = document.getElementById("Canvas");
	Game.ctx = canvas.getContext("2d");
	Game.ctx.font = "24px Consolas";
	Game.ctx.strokeStyle = "yellow";
	Game.ctx.fillStyle = "yellow";

	setupInput();
	loadImages();
	loadAudio();
	setupWeapons();
	setupSpecials();
	console.log(weapon);
	setupNpcs();
	setupShips();
	console.log(ship);
	setupSectors();
	setupLevels();
	console.log(frame);
	background = image.blackscreen;

	//start drawloop
	draw();
};

// Tatsaechliche Abbildung
function draw() {
	displayBg();
	displayPlanets();
	sector.act();
	if (!stop) checkCampaign();
	if (!stop) physik();
	displayProjectiles();
	displayShips();
	GUI();
	displayMsgs();
	displayCursor();
	requestAnimationFrame(draw);
}

function displayBg(){
	for (posY = 0; posY < sector[sector.at].height; posY += 100){
		for (posX = 0; posX < sector[sector.at].width; posX += 100){
			Game.ctx.drawImage(background, posX - frame.x, posY - frame.y);
		}
	}
}

function GUI() {
	if (sector[sector.at].ships[player1Pos] !== undefined){
		Game.ctx.fillStyle = "grey";
		Game.ctx.fillRect(0,600,1280,120);
		Game.ctx.fillStyle = "white";
		Game.ctx.fillRect(9,609,102,102);
		Game.ctx.strokeStyle = "black";
		Game.ctx.lineWidth = 10;
		Game.ctx.strokeRect(9,609,1262,102);
		Game.ctx.strokeRect(9,609,102,102);
		Game.ctx.drawImage(sector[sector.at].ships[player1Pos].skin, 14, 614, 92, 92);
		Game.ctx.fillStyle = "black";
		if (sector[sector.at].ships[player1Pos].shield !== 0) Game.ctx.fillText("Shield:", 120, 645);
		Game.ctx.fillText("Structure:", 120, 685);
		Game.ctx.fillStyle = "red";
		if (sector[sector.at].ships[player1Pos].shield !== 0) Game.ctx.fillRect(260, 625, 200, 24);
		Game.ctx.fillRect(260, 665, 200, 24);
		Game.ctx.fillStyle = "blue";
		if (sector[sector.at].ships[player1Pos].shield !== 0) Game.ctx.fillRect(260, 625, 200 * (sector[sector.at].ships[player1Pos].shield / ship[sector[sector.at].ships[player1Pos].designation].shield), 24);
		Game.ctx.fillStyle = "green";
		Game.ctx.fillRect(260, 665, 200 * (sector[sector.at].ships[player1Pos].hp / ship[sector[sector.at].ships[player1Pos].designation].hp), 24);
		Game.ctx.lineWidth = 4;
		if (sector[sector.at].ships[player1Pos].shield !== 0) Game.ctx.strokeRect(260, 625, 200, 24);
		Game.ctx.strokeRect(260, 665, 200, 24);
		Game.ctx.lineWidth = 2;
		Game.ctx.fillStyle = "black";
		if (sector[sector.at].ships[player1Pos].shield !== 0) Game.ctx.fillText(sector[sector.at].ships[player1Pos].shield, 270, 645);
		Game.ctx.fillText(sector[sector.at].ships[player1Pos].hp, 270, 685);
		Game.ctx.fillText("=>" + sector.at, 1050 , 635);
		if (sector[sector.at].ships[player1Pos].lightWp !== undefined) {
			Game.ctx.fillText(sector[sector.at].ships[player1Pos].lightWp.designation + ":", 470, 635);
			Game.ctx.fillText(sector[sector.at].ships[player1Pos].lightWp.ammo, 490 + Game.ctx.measureText(sector[sector.at].ships[player1Pos].lightWp.designation).width, 635);
		}
		if (sector[sector.at].ships[player1Pos].mediumWp !== undefined) {
			Game.ctx.fillText(sector[sector.at].ships[player1Pos].mediumWp.designation + ":", 470, 665);
			Game.ctx.fillText(sector[sector.at].ships[player1Pos].mediumWp.ammo, 490 + Game.ctx.measureText(sector[sector.at].ships[player1Pos].mediumWp.designation).width, 665);
		}
		if (sector[sector.at].ships[player1Pos].heavyWp !== undefined) {
			Game.ctx.fillText(sector[sector.at].ships[player1Pos].heavyWp.designation + ":", 470, 695);
			Game.ctx.fillText(sector[sector.at].ships[player1Pos].heavyWp.ammo, 490 + Game.ctx.measureText(sector[sector.at].ships[player1Pos].heavyWp.designation).width, 695);
		}
		Game.ctx.strokeStyle = "yellow";
		}
	if (intervalReact(key.i && infoScreen)) infoScreen = false;
	if (intervalReact(key.i && !infoScreen)) infoScreen = true;
	if (infoScreen) {
		Game.ctx.lineWidth = 20;
		Game.ctx.fillStyle = "Yellow";
		Game.ctx.strokeStyle = "orange";
		Game.ctx.fillRect(0, 0, 1280, 720);
		Game.ctx.strokeRect(5, 5, 1260, 710);
		Game.ctx.fillStyle = "black";
		Game.ctx.drawImage(sector[sector.at].ships[0].skin, 1000, 100, 240, 240);
		Game.ctx.fillText("Ship Specifications:", 100, 100);
		Game.ctx.fillText("Designation:" + sector[sector.at].ships[0].designation, 100, 150);
		Game.ctx.fillText("Fraction:" + sector[sector.at].ships[0].fraction, 100, 200);
		Game.ctx.fillText("Structure:" + sector[sector.at].ships[0].hp, 100, 250);
		Game.ctx.fillText("Armour:" + sector[sector.at].ships[0].armour, 100, 300);
		Game.ctx.fillText("Structure:" + sector[sector.at].ships[0].hp, 100, 350);
		Game.ctx.fillText("Weapons:", 100, 400);
		if (sector[sector.at].ships[0].lightWp !== undefined) {
			Game.ctx.fillText("Light:", 300, 400);
			Game.ctx.fillText(sector[sector.at].ships[0].lightWp.designation, 300, 425);
			Game.ctx.fillText("Ammunition: " + sector[sector.at].ships[0].lightWp.ammo, 300, 450);
			Game.ctx.fillText("Alpha-Damage: " + sector[sector.at].ships[0].lightWp.alpha, 300, 475);
			Game.ctx.fillText("Penetration: " + sector[sector.at].ships[0].lightWp.pen, 300, 500);
		}
		if (sector[sector.at].ships[0].mediumWp !== undefined) {
			Game.ctx.fillText("Medium:", 500, 400);
			Game.ctx.fillText(sector[sector.at].ships[0].mediumWp.designation, 500, 425);
			Game.ctx.fillText("Ammunition: " + sector[sector.at].ships[0].mediumWp.ammo, 500, 450);
			Game.ctx.fillText("Alpha-Damage: " + sector[sector.at].ships[0].mediumWp.alpha, 500, 475);
			Game.ctx.fillText("Penetration: " + sector[sector.at].ships[0].mediumWp.pen, 500, 500);
		}
		if (sector[sector.at].ships[0].heavyWp !== undefined) {
			Game.ctx.fillText("Heavy:", 700, 400);
			Game.ctx.fillText(sector[sector.at].ships[0].heavyWp.designation, 700, 425);
			Game.ctx.fillText("Ammunition: " + sector[sector.at].ships[0].heavyWp.ammo, 700, 450);
			Game.ctx.fillText("Alpha-Damage: " + sector[sector.at].ships[0].heavyWp.alpha, 700, 475);
			Game.ctx.fillText("Penetration: " + sector[sector.at].ships[0].heavyWp.pen, 700, 500);
		}
	}
	if (intervalReact(key.esc && pausedScreen)) pausedScreen = false, stop = false;
	if (intervalReact(key.esc && !pausedScreen && !stop)) pausedScreen = true, stop = true;
	if (pausedScreen) {
		Game.ctx.lineWidth = 4;
		Game.ctx.font = "128px Consolas";
		Game.ctx.strokeText("- Game Paused -", 100, 180);
		Game.ctx.font = "24px Consolas";
		button(400, 350, 480, 50, "Resume to game", "yellow", function(){pausedScreen = false; stop = false;});
		button(400, 500, 480, 50, "Return to menue", "yellow", function(){pausedScreen = false; stop = false; endLevel(true);});
		Game.ctx.lineWidth = 1;
	}
}

msg = []
function addMsg(content){
	neueMsg = {};
	neueMsg.content = content;
	msg[msg.length] = neueMsg;
}
function displayMsgs(){
	if (msg.length !== 0){
		stop = true;
		Game.ctx.fillStyle = "grey";
		Game.ctx.fillRect(0,0,1280,80);
		Game.ctx.fillStyle = "white";
		Game.ctx.fillRect(130,10,1140,60);
		Game.ctx.strokeStyle = "black";
		Game.ctx.lineWidth = 10;
		Game.ctx.strokeRect(10,10,1255,60);
		Game.ctx.strokeRect(10,10,120,60);
		Game.ctx.lineWidth = 2;
		Game.ctx.fillStyle = "black";
		Game.ctx.fillText("Intercom", 15, 50);
		Game.ctx.fillText("Continue(E)", 1115, 50);
		
		Game.ctx.fillText(msg[0].content, 145, 50);
		
		Game.ctx.strokeStyle = "yellow";
		Game.ctx.fillStyle = "yellow";
		Game.ctx.lineWidth = 1;
		if (intervalReact(key.e, 500, "msgDelay")){
			msg.splice(0,1);
			if (msg.length === 0) stop = false;
		}
		if (intervalReact(key.esc)){
			msg.splice(0,msg.length);
			stop = false;
		}
	}
}

function displayCursor(){
	if (target !== "none" && click){ 
		if (cursor.x <= target.x - frame.x) cursor.angle = get360((Math.atan((target.y -cursor.y - frame.y) / (target.x - cursor.x - frame.x)) / Math.PI * 180) + 90);
		if (cursor.x > target.x - frame.x) cursor.angle = get360((Math.atan((target.y -cursor.y - frame.y) / (target.x - cursor.x - frame.x)) / Math.PI * 180) + 270);
		Game.ctx.translate(cursor.x, cursor.y); // Drehung
		Game.ctx.rotate(cursor.angle * Math.PI / 180);
		Game.ctx.translate(-(cursor.x), -(cursor.y));
		Game.ctx.drawImage(image.testarrow, cursor.x, cursor.y); // Display
		Game.ctx.translate(cursor.x, cursor.y); // Rückdrehung
		Game.ctx.rotate(-cursor.angle * Math.PI / 180);
		Game.ctx.translate(-(cursor.x), -(cursor.y));
	} else {Game.ctx.drawImage(image.cursor, cursor.x - 16, cursor.y);}
}
