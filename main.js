﻿var Game = {event : {}};

// Setup

var player1 = {};
var state = 0;
var next = [];
var background = new Image();
var use = "false";
var frame = {
	x : 0,
	y : 0
};

// Canvas-Initialisierung
window.onload = function() {
    var canvas = document.getElementById("Canvas");
    Game.ctx = canvas.getContext("2d");
	Game.ctx.font = "24px Calibri";
	Game.ctx.strokeStyle = "yellow";

	setupInput();
	loadImages();
	loadAudio();
	setupEvents();
	setupWeapons();
	setupShips();
	setupNpcs();
	setupScenes();
	console.log(frame);
	background = image.blackscreen;
	spawnShip("testarrow", 0, 0, 0, "player1");
	console.log(ship.onField[0]);

	//start drawloop
    draw();
};

// Tatsaechliche Abbildung
function draw() {
	Game.ctx.drawImage(background, frame.x * -1, frame.y *-1);
	physik();
	displayShips();
	displayProjectiles();
	Game.ctx.drawImage(image.cursor, cursor.x - 16, cursor.y );
	requestAnimationFrame(draw);
}
// Scripted by HelkoLeucken with a lot of help by SoerenDaenekas
