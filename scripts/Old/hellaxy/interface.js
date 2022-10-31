function setupHellaxyScreens(){

	new Screen("title", "blackscreen", "theme1", function(){
		Helon.ctx.font = "244px Consolas";
		Helon.ctx.fillText("Hellaxy", 480, 320);
		Helon.ctx.font = "32px Consolas";
		if (!intervalReact(true, 500, "title")) Helon.ctx.fillText("> Press Space <", 800, 640);
		Helon.ctx.fillText("developed by HelkoLueken", 44, 980);
		if (key.space) setScreen("menue");
	});

	
	new Screen("menue", "blackscreen", "theme1", function(){
		Helon.ctx.font = "64px Consolas";
		Helon.ctx.fillText("Hellaxy", 850, 80);
		Helon.ctx.fillText("Main Menu", 810, 160);
		Helon.ctx.font = "32px Consolas";
		if (intervalReact(key.esc)) setScreen("title");
		//button(660, 700, 600, 150, "Test room", "yellow", function(){Hellaxy.campaigns.quicktest.start()})
		button(660, 400, 600, 150, "Start Game", "yellow", function(){setScreen("shipSelect");})
		//button(660, 600, 600, 100, "Free-Roam Mode", "yellow", function(){/*setScreen("freeroam");*/})
		button(660, 650, 600, 150, "Controls", "yellow", function(){setScreen("controls");})
		muteButton();
	});
	
	
	
	new Screen("shipSelect", "blackscreen", "theme1", function(){
		var hor = 1;
		var ver = 1;
		Helon.ctx.strokeStyle = "yellow";
		Helon.ctx.fillText("Select your ship:", 850, 80);
		for (let shiptype in Hellaxy.shipTypes){
				Helon.ctx.drawImage(Hellaxy.shipTypes[shiptype].skin, hor*70, ver*70 + 50, 64, 64);
				if (cursor.x.between(hor*70, hor*70 + 64) && cursor.y.between(ver*70 + 50, ver*70 + 114)){
					Helon.ctx.strokeRect(hor*70 - 4, ver*70 + 46, 70, 70);
					if (click){
						Hellaxy.shipTypes[shiptype].spawn(400, 400, player1, function(){ //Ja das muss so umständlich angesprochen werden, die Laufvariable ist hier iwie nur ein String
							Hellaxy.space.clear();
							resetAudio();
							setScreen("menue");
						});
						resetAudio();
						setScreen("space");
					}
				}
				hor++;
				if (hor > 24) hor = 1, ver++;
		}
		button(660, 900, 600, 100, "Back", "yellow", function(){setScreen("menue");});
	});
	

	
	new Screen("controls", "blackscreen", "theme1", function(){
		Helon.ctx.font = "64px Consolas";
		Helon.ctx.fillText("Controls", 850, 80);
		Helon.ctx.font = "32px Consolas";
		Helon.ctx.fillText("Move around = WASD", 100,200);
		Helon.ctx.fillText("Light Weapon = Space", 100,250);
		Helon.ctx.fillText("Medium Weapon = E", 100,300);
		Helon.ctx.fillText("Heavy Weapon = Q", 100,350);
		Helon.ctx.fillText("Special Abilities = 1 - 3", 100,400);
		Helon.ctx.fillText("Pause Game / Skip Dialog = esc", 100,450);
		Helon.ctx.fillText("Point at cursor / Show targets direction = Left mouse button", 100,500);
		Helon.ctx.fillText("Zoom in / out = + / -", 100,550);
		button(660, 900, 600, 100, "Back", "yellow", function(){setScreen("menue");});
	});
	
	
	new Screen("paused", "blank", "none", function(){
		Helon.previousScreen.display();
		button(660, 400, 600, 100, "Resume to game", "yellow", function(){Helon.back();});
		button(660, 600, 600, 100, "Return to menue", "yellow", function(){Hellaxy.space.clear(); resetAudio(); setScreen("menue");});
		muteButton();

		Helon.ctx.lineWidth = 8;
		Helon.ctx.strokeStyle = "black";
		Helon.ctx.font = "204px Consolas";
		Helon.ctx.strokeText("- Game Paused -", 100, 240);
		Helon.ctx.fillStyle = "yellow";
		Helon.ctx.fillText("- Game Paused -", 100, 240);
		Helon.ctx.font = "32px Consolas";
		Helon.ctx.lineWidth = 1;
	});
	
	
	
	 new Screen("messager", "blank", "none", function(){
		if (Hellaxy.msgs.length === 0){
			Helon.back();
		}
		else{
			Helon.previousScreen.display();
			Helon.ctx.fillStyle = "grey";
			Helon.ctx.fillRect(0,0,1920,130);
			Helon.ctx.fillStyle = "white";
			Helon.ctx.fillRect(170,10,1740,110);
			Helon.ctx.strokeStyle = "black";
			Helon.ctx.lineWidth = 10;
			Helon.ctx.strokeRect(10,10,1895,110);
			Helon.ctx.strokeRect(10,10,160,110);
			Helon.ctx.fillStyle = "black";
			Helon.ctx.fillText("Intercom", 18, 70);
			
			if (Hellaxy.msgs.length > 1) Helon.ctx.fillText(Hellaxy.msgs[1].content, 190, 100);
			Helon.ctx.fillText(Hellaxy.msgs[0].content, 190, 50);
			
			Helon.ctx.strokeStyle = "yellow";
			Helon.ctx.fillStyle = "yellow";
			Helon.ctx.fillText("Continue(E)", 1700, 170);
			Helon.ctx.lineWidth = 1;
			if (intervalReact(key.e, 500, "msgDelay")){
				Hellaxy.msgs.splice(0,2);
			}
			if (intervalReact(key.esc, 500, "esc")){
				Hellaxy.msgs.splice(0, Hellaxy.msgs.length);
			}
		}
	}); 
}



/*
} */