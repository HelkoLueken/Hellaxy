class Cursor extends Body{
	click = false;
	static unikat = "No Cursor initiated yet.";
	
	constructor(){
		super();
		
		Cursor.unikat = this;
		
		document.onmousedown = function(trigger) {
			Cursor.unikat.click = true;
			Cursor.unikat.setSkin("arrow");
		};
	
		document.onmouseup = function(trigger) {
		    Cursor.unikat.click = false;
		    Cursor.unikat.setSkin("cursor");
		};
	
		document.onmousemove = function(m) {
			let scale = canvas.width/1920;
		    Cursor.unikat.x = (m.pageX - canvas.offsetLeft - 10) / scale;
		    Cursor.unikat.y = (m.pageY - canvas.offsetTop - 10) / scale;
		};		
	}
}