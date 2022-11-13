class Screen{
	#color = "black";
	offsetX = 0;
	offsetY = 0;
	scale = 1;
	
	
	
	
	constructor(color, gui){
		if (exists(color)) this.#color = color;
		if (exists(gui) && typeof(gui) == "function") this.gui = gui;
	}
	
	
	
	gui(){};



	drawBar(x, y, width, height, color, ratio){
		ctx.fillStyle = "black";
		if (this.#color == "black") ctx.fillStyle = "white";
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
			if (cursor.click) action();
			ctx.strokeRect(posx + ctx.lineWidth * 3, posy + ctx.lineWidth * 3, width - ctx.lineWidth * 6, height - ctx.lineWidth * 6);
		}
		
		ctx.fillStyle = "black";
		ctx.fillText(tag, posx + ((width - ctx.measureText(tag).width)*0.5), textY);
		ctx.fillStyle = "yellow";
	}
	
	
	
	draw(){
		ctx.fillStyle = this.#color;
		ctx.fillRect(0, 0, 1920, 1080);
		this.gui();
	}

}



