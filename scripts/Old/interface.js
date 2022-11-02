function setupHellaxyScreens(){
	
	
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