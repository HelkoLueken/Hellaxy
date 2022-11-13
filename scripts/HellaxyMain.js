class Hellaxy{
	static planets = [];
	static #weapons = {};
	static #projectiles = [];
	static #shipTypes = {};
	static activeShips = [];
	static #currentScreen = new Screen();
	
	
	
	static #screens = {
		space : new Space(),
	
		loading : new Screen("black", function(){
			this.drawBar(100, 500, 1720, 80, "yellow", Image.getLoadingProgress());
			if (Image.allFilesLoaded()){
				Hellaxy.setScreen("title");
				cursor.setSkin("cursor");
			}
		}),
	
		title : new Screen("black", function(){
			if (!exists(this.flicker) || this.flicker < -50) this.flicker = 10;
			this.flicker --;
			ctx.font = "244px Consolas";
			ctx.fillStyle = "yellow";
			ctx.fillText("Hellaxy", 480, 320);
			ctx.font = "32px Consolas";
			ctx.fillText("> Press Space <", 800, 640);
			ctx.fillText("Developed by HelkoLueken", 40, 1040);
			if (this.flicker > 0){
				ctx.fillStyle = "black";
				ctx.fillRect(800, 600, 300, 50);
			}
			if (Key.space){
				Audio.get("theme_title").playAsTheme();
				Hellaxy.setScreen("menu");
			}
		}),
		
		menu : new Screen("black", function(){
			ctx.fillStyle = "yellow";
			ctx.font = "64px Consolas";
			ctx.fillText("Hellaxy", 840, 80);
			ctx.fillText("Main Menu", 774, 160);
			this.showButton(660, 400, 600, 150, "Start Game", "yellow", function(){Hellaxy.setScreen("shipSelect");})
			this.showButton(660, 650, 600, 150, "Controls", "yellow", function(){Hellaxy.setScreen("controls");})
		}),
		
		controls : new Screen("black", function(){
			ctx.fillStyle = "yellow";
			ctx.font = "64px Consolas";
			ctx.fillText("Controls", 850, 80);
			ctx.font = "40px Consolas";
			ctx.fillText("Move around = WASD", 140,200);
			ctx.fillText("Light Weapon = Space", 140,280);
			ctx.fillText("Medium Weapon = E", 140,360);
			ctx.fillText("Heavy Weapon = Q", 140,440);
			ctx.fillText("Special Abilities = 1 - 3", 140,520);
			ctx.fillText("Pause Game / Skip Dialog = esc", 140,600);
			ctx.fillText("Point at cursor / Show targets direction = Left mouse button", 140,680);
			ctx.fillText("Zoom in / out = + / -", 140,760);
			this.showButton(660, 900, 600, 100, "Back", "yellow", function(){Hellaxy.setScreen("menu");});
		}),
		
		shipSelect : new Screen("black", function(){
			let hor = 1;
			let ver = 1;
			ctx.strokeStyle = "yellow";
			ctx.fillStyle = "yellow";
			ctx.font = "64px Consolas";
			ctx.fillText("Select your ship:", 700, 80);
			for (let shipType in Hellaxy.shipTypes){
				ctx.drawImage(Hellaxy.shipTypes[shipType].skin, hor*70, ver*70 + 50, 64, 64);
				if (cursor.x.between(hor*70, hor*70 + 64) && cursor.y.between(ver*70 + 50, ver*70 + 114)){
					ctx.strokeRect(hor*70 - 4, ver*70 + 46, 70, 70);
					if (click){
						//Hellaxy.shipTypes[shipType].spawn(400, 400, player1, function(){Hellaxy.setScreen("menu");}); //Ja das muss so umständlich angesprochen werden, die Laufvariable ist hier iwie nur ein String	
						Hellaxy.setScreen("space");
					}
				}
				hor++;
				if (hor > 24) hor = 1, ver++;
			}
			ctx.font = "40px Consolas";
			this.showButton(660, 900, 600, 100, "Back", "yellow", function(){Hellaxy.setScreen("menu");});
		})
	}

	
	
	
	static #drawLoop(){
		Hellaxy.#currentScreen.draw();
		cursor.draw();
		requestAnimationFrame(Hellaxy.#drawLoop);
	}
	
	
	
	static setScreen(screenName){
		if (!exists(this.#screens[screenName])){
			console.log("Error: could not find screen to switch to!");
			return;
		}
		this.#currentScreen = this.#screens[screenName];
	}

	
	
	static start(){
		Hellaxy.setScreen("loading");
		Hellaxy.#drawLoop();
	}
}










