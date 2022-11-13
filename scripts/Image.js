Image.loading = {};
Image.loaded = {};





Image.loadAllFiles = function(){
	if (imageFiles == undefined){
		//to be read from .index.js within image folder.
		console.log("Warning: Tried to load image files. But file index not available.");
	}
	for (let i = 0; i < imageFiles.length; i++){
		imageName = imageFiles[i].split(".")[0];
		img = new Image();
		img.src = "image/" + imageFiles[i];
		img.name = imageName;
		img.onload = function(){
			Image.loaded[this.name] = this;
			delete(Image.loading[this.name]);
		}
		img.onerror = function(){
			console.log("Error: Image " + this.src + " not found! Loading dummy instead.")
			this.src = "image/cross.png";
		}
		
		Image.loading[imageName] = img;
	}
}



Image.get = function(imgName){
	if (!Image.allFilesLoaded()){
		console.log("Warning: Trying to access image before loading all files! Empty image returned.");
		return new Image();
	}
	if (!exists(imgName) || !exists(Image.loaded[imgName]) || !exists(Image.loaded[imgName].src)){
		console.log("Warning: Tried to access image with invalid ID or corrupted source path. Returning dummy instead");
		imgName = "cross";
	}
	return Image.loaded[imgName];
}



Image.getLoadingProgress = function(){
	let nrLoading = Object.keys(Image.loading).length;
	let nrLoaded = Object.keys(Image.loaded).length;
	if (nrLoaded === 0) return 0;
	return nrLoaded / (nrLoaded + nrLoading);
}



Image.allFilesLoaded = function(){
	return (Image.getLoadingProgress() === 1);
}



