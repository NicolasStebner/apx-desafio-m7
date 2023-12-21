(function () {
	let pictureFile;
	const myDropzone = new Dropzone(".img-to-replace", {
		url: "/falsa",
		autoProcessQueue: false,
		paramName: "file",
		maxFilesize: 1 //mb
	});

	myDropzone.on("thumbnail", function (file) {
		pictureFile = file;
		if (pictureFile.dataURL) {
			localStorage.setItem("urlMascota", pictureFile.dataURL);
		}
	});
})();
