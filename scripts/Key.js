class Key{
	static w = false;
	static a = false;
	static s = false;
	static d = false;
	static e = false;
	static q = false;
	static i = false;
	static space = false;
	static esc = false;
	static enter = false;
	
	
	
	
	
	static init(){
		addEventListener("keydown", function(w) {
			if (w.keyCode === 49) Key.one = true;
			if (w.keyCode === 50) Key.two = true;
			if (w.keyCode === 51) Key.three = true;
		    if (w.keyCode === 87) Key.w = true;
		    if (w.keyCode === 83) Key.s = true;
		    if (w.keyCode === 65) Key.a = true;
		    if (w.keyCode === 68) Key.d = true;
		    if (w.keyCode === 69) Key.e = true;
			if (w.keyCode === 81) Key.q = true;
			if (w.keyCode === 73) Key.i = true;
			if (w.keyCode === 32) Key.space = true;
		    if (w.keyCode === 27) Key.esc = true;
			if (w.keycode === 13) Key.enter = true;
			if (w.keyCode === 187) Key.plus = true;
			if (w.keyCode === 189) Key.minus = true;
		
		    w.preventDefault();
		    w.stopPropagation();
		}, false);
		
		
		
		addEventListener("keyup", function(w) {
			if (w.keyCode === 49) Key.one = false;
			if (w.keyCode === 50) Key.two = false;
			if (w.keyCode === 51) Key.three = false;
		    if (w.keyCode === 87) Key.w = false;
		    if (w.keyCode === 83) Key.s = false;
		    if (w.keyCode === 65) Key.a = false;
		    if (w.keyCode === 68) Key.d = false;
		    if (w.keyCode === 69) Key.e = false;
			if (w.keyCode === 81) Key.q = false;
			if (w.keyCode === 73) Key.i = false;
			if (w.keyCode === 32) Key.space = false;
		    if (w.keyCode === 27) Key.esc = false;
			if (w.keycode === 13) Key.enter = false;
			if (w.keyCode === 187) Key.plus = false;
			if (w.keyCode === 189) Key.minus = false;
		}, false);
	}
}







