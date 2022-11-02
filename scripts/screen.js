class Screen{
	constructor(ID, color, theme, gui){	//ID, bg, theme, action
		this.ID = trySet(ID, "Nameless screen");
		this.offsetX = 0;
		this.offsetY = 0;
		this.color = trySet(color, "black");
		this.gui = trySet(gui, function(){});
		this.bodies = [];
		this.scale = 1;
		
		this.setTheme(theme);
		
		if (exists(ID)) hellaxy.screens[ID] = this;
	}
	
	
	
	gui(){
	};
	
	
	
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
			drop(this.bodies[i]);
		}
	}
	
	
	
	drawBar(x, y, width, height, color, ratio){
		ctx.fillStyle = "black";
		if (this.color == "black") ctx.fillStyle = "white";
		ctx.fillRect(x, y, width, height);
		ctx.fillStyle = color;
		ctx.fillRect(x + height * 0.1, y + 0.1 * height , (width - 0.2 * height) * ratio, height * 0.8);
	}
	
	
	
	showButton(posx, posy, width, height, tag, colour, action){
		ctx.lineWidth = 4;
		let textY = parseInt(ctx.font.split('p')[0]) + posy + 0.4*((height - 2 * ctx.lineWidth) - parseInt(ctx.font.split('p')[0]));
	
		ctx.fillStyle = "black";
		ctx.fillRect(posx , posy, width, height);
	
		ctx.fillStyle = "white";
		ctx.fillRect(posx + 2, posy + 2, width - 4, height - 4);
	
		ctx.fillStyle = "black";
		ctx.fillRect(posx + 4, posy + 4, width - 8, height - 8);
	
		ctx.fillStyle = colour;
		ctx.fillRect(posx + 2 * ctx.lineWidth, posy + 2 * ctx.lineWidth, width - ctx.lineWidth * 4, height - ctx.lineWidth * 4);
		ctx.strokeStyle = "black";
	
		if (cursor.x.between(posx, posx + width) && cursor.y.between(posy, posy + height)){
			if (click) action();
			ctx.strokeRect(posx + ctx.lineWidth * 3, posy + ctx.lineWidth * 3, width - ctx.lineWidth * 6, height - ctx.lineWidth * 6);
		}
		
		ctx.fillStyle = "black";
		ctx.fillText(tag, posx + ((width - ctx.measureText(tag).width)*0.5), textY);
		ctx.fillStyle = "yellow";
	}
	
	
	
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
	
	
	
	focus(on){
		this.offsetX = on.x - 960 / this.scale;
		this.offsetY = on.y - 540 / this.scale;
	}
	
	
	
	draw(){
		ctx.fillStyle = this.color;
		ctx.fillRect(0, 0, 1920, 1080);
		for (let i = 0; i < this.bodies.length; i++){
			this.bodies[i].draw();
		}
		this.gui();
		//loop(this.theme);
	}
	
	
	physics(){
		for (var i = 0; i < this.bodies.length; i++){
			this.bodies[i].move();
			if (this.bodies[i].x < -200 ||this.bodies[i].y < -200 ||this.bodies[i].x > this.width + 200 || this.bodies[i].y > this.height + 200) this.drop(this.bodies[i]);
		}
	}
	
	
	
	setTheme(themeName){
		this.theme = trySet(hellaxy.audio[themeName], new Audio());
		this.theme.loop = true;
	}
}