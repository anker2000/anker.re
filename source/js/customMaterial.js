function customMaterial(element) {
	var screenMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
	if (element.tagName=="IMG") {
		var texture = new THREE.TextureLoader().load( element.src);
	} else if (element.tagName=="VIDEO") {
		var texture = new THREE.VideoTexture( element );
	}
	texture.minFilter = THREE.LinearFilter;
	texture.magFilter = THREE.LinearFilter;
	texture.format = THREE.RGBFormat;
	texture.wrapS = THREE.ClampToEdgeWrapping;
	texture.wrapT = THREE.ClampToEdgeWrapping;
	screenMaterial.map = texture;
	return screenMaterial;
}