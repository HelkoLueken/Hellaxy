﻿var audio = {};
function loadAudio(){
audio.shot_light = new Audio("ress/audio/shot_light.mp3");
audio.engine1 = new Audio("ress/audio/engine1.mp3");
audio.theme1 = new Audio("ress/audio/theme1.mp3");

}

var image = {
	quantity : 0,
	loaded : 0
};
function createImage(path) {
	image.quantity += 1;
    var img = new Image();
    img.src = path;
	img.addEventListener("load",function(e){
	    image.loaded +=1;
	    if (image.loaded === image.quantity) {
			sector.at = "menue";
			console.log(image.quantity,image.loaded);
		}
	})
    return img;
}
function loadImages() {

    for (var res in resources) {
        if (resources.hasOwnProperty(res)) {
            image[res] = createImage(resources[res]);
        }
    }

    console.log(image);
}
