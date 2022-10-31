class Screen{
	constructor(ID, color, theme, gui){	//ID, bg, theme, action
		this.ID = trySet(ID, "Nameless screen " + hellaxy.screens.length);
		this.offsetX = 0;
		this.offsetY = 0;
		this.color = trySet(color, "black");
		this.theme = trySet(hellaxy.audio[theme], new Audio);
		this.gui = trySet(gui, function(){});
		this.bodies = [];
		
		hellaxy.screens[ID] = this;
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
		hellaxy.ctx.fillStyle = "black";
		if (this.color == "black") hellaxy.ctx.fillStyle = "white";
		x = hellaxy.ctx.canvas.width * x /100;
		y = hellaxy.ctx.canvas.height * y / 100;
		width = hellaxy.ctx.canvas.width * width /100;
		height = hellaxy.ctx.canvas.height * height / 100;
		hellaxy.ctx.fillRect(x, y, width, height);
		hellaxy.ctx.fillStyle = color;
		hellaxy.ctx.fillRect(x + height * 0.1, y + 0.1 * height , (width - 0.2 * height) * ratio, height * 0.8);
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
		hellaxy.ctx.fillStyle = this.color;
		hellaxy.ctx.fillRect(0, 0, hellaxy.ctx.canvas.width, hellaxy.ctx.canvas.height);
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
}