class Body{
	/** A movable object that can be displayed on the Canvas element
	*/
	constructor(){
		this.x = 0;
		this.y = 0;
		this.vx = 0;
		this.vy = 0;
		this.a = 0;
		this.angle = 0;
		this.vangle = 0;
		this.skin = new Image();
		this.mass = 1;
		this.width = 1;
		this.height = 1;
		this.screen = new Screen();
	}
		
	
	
	
	
	angleTowards(angled){
		if (this.x === angled.x && this.y === angled.y) return 0;
		if (this.x <= angled.x) return get360((Math.atan((angled.y -this.y) / (angled.x - this.x)) / Math.PI * 180) + 90);
		if (this.x > angled.x) return get360((Math.atan((angled.y -this.y) / (angled.x - this.x)) / Math.PI * 180) + 270);
	}
	
	
	
	/**
	*@author Darius
	*Berechnet einen teilelastischen Zusammenstoß zwischen diesem Body und bod;
	*/
	collideWith(bod){
		var k = 0.6; // Stoßzahl
		this.vx = ((this.mass * this.vx + bod.mass * bod.vx) - bod.mass * (this.vx - bod.vx) * k) / (this.mass + bod.mass);
		this.vy = ((this.mass * this.vy + bod.mass * bod.vy) - bod.mass * (this.vy - bod.vy) * k) / (this.mass + bod.mass);
		bod.vx = ((this.mass * this.vx + bod.mass * bod.vx) - this.mass * (bod.vx - this.vx) * k) / (this.mass + bod.mass);
		bod.vy = ((this.mass * this.vy + bod.mass * bod.vy) - this.mass * (bod.vy - this.vy) * k) / (this.mass + bod.mass);

		this.move();
		bod.move();
	}
	
	
	
	draw(){
		if (!this.isVisible()) return;
		let x = (this.x - this.screen.offsetX) * this.screen.scale;
		let y = (this.y - this.screen.offsetY) * this.screen.scale;
		let visibleX = x - (this.screen.scale * this.width) / 2;
		let visibleY = y - (this.screen.scale * this.height) / 2;
		let visibleWidth = (this.screen.scale * this.width)
		let visibleHeight = (this.screen.scale * this.height)
		ctx.translate(x, y); // Drehung
		ctx.rotate(this.angle * Math.PI / 180);
		ctx.translate(-x, -y);
		ctx.drawImage(this.skin, visibleX, visibleY, visibleWidth, visibleHeight); // Display
		ctx.translate(x, y); // Rückdrehung
		ctx.rotate(-this.angle * Math.PI / 180);
		ctx.translate(-x, -y);
	}
	
	
	
	distanceTo(distanced){
		return Math.sqrt((distanced.x - this.x)*(distanced.x - this.x) + (distanced.y - this.y)*(distanced.y - this.y));
	}
	
	
	
	drop(){
		this.screen.drop(this);
	}
	
	
	
	getVges(){
		return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
	}
	
	
	
	isVisible(){
		if (this.x < this.screen.offsetX - 100  / this.screen.scale) return false;
		if (this.x > this.screen.offsetX + 2200  / this.screen.scale) return false;
		if (this.y < this.screen.offsetY - 100  / this.screen.scale) return false;
		if (this.y >this.screen.offsetY + 1200  / this.screen.scale) return false;
		return true;
	}
	
	
	
	move(){
		this.x += this.vx;
		this.y -= this.vy;
		this.angle += this.vangle;
		this.angle = get360(this.angle);
	}
	
	
	
	pointsAt(Suspect){
		if (this.angle.between(this.angleTowards(Suspect) + 5, this.angleTowards(Suspect) - 5)) return true;
		return false;
	}
	
	
	
	pointAt(da){
		this.angle = this.angleTowards(da);
	}
	
	
	
	pointFrom(da){
		this.angle = get360(this.angleTowards(da) - 180);
	}
	
	
	
	pointsFrom(Suspect){
		if (this.angle.between(this.angleTowards(Suspect) + 175, this.angleTowards(Suspect) - 175)) return true;
		return false;
	}
	
	
	
	setSkin(to){
		this.skin = hellaxy.images[to];
		this.width = this.skin.naturalWidth;
		this.height = this.skin.naturalHeight;
	}
	
	
	
	overlaps(Suspect) {
		if (this.x.between(Suspect.x - this.width/2 - Suspect.width/2, Suspect.x + this.width/2 + Suspect.width/2)){
			if (this.y.between(Suspect.y - this.height/2 - Suspect.height/2, Suspect.y + this.height/2 + Suspect.height/2)) return true;
		}
		return false;
	}
}