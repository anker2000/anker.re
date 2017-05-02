function setLights() {
	var shadowMapSize = 512;
	var groundGeometry = new THREE.PlaneGeometry( 1650, 1650, 1 );
	groundMaterial = new THREE.ShadowMaterial();
	groundMaterial.opacity = 0.1;
	var ground = new THREE.Mesh(groundGeometry, groundMaterial);
	ground.receiveShadow = true;
	ground.rotation.x=55;
	ground.position.y=-50;
	ground.transparent = true;
	scene.add(ground);

	mainLight = new THREE.AmbientLight( { color:0x000000,intensity:0.02 } ); // soft white light
	mainLight.intensity = 0.37;
	scene.add( mainLight );

	



	var spotLight1 = new THREE.SpotLight( 0xffffff); 
	spotLight1.shadow.mapSize.height = shadowMapSize;
	spotLight1.shadow.mapSize.width = shadowMapSize;
	spotLight1.castShadow = false;
	spotLight1.position.set( 0, 55, 0 );
	spotLight1.intensity = .2;
	spotLight1.penumbra = 1;
	spotLight1.decay = 2;
	spotLight1.angle = .45;
	scene.add( spotLight1 );
	scene.add(spotLight1.target);

	var spotLight2 = new THREE.SpotLight( 0xFFFFFF); 
	spotLight2.castShadow = true;
	spotLight2.position.set( 0, 150, 20 ); 
	spotLight2.shadow.mapSize.height = shadowMapSize;
	spotLight2.shadow.mapSize.width = shadowMapSize;
	spotLight2.intensity = .1;
	spotLight2.exponent = .05;
	spotLight2.penumbra = 1;
	spotLight2.decay = 2;
	spotLight2.angle = de2ra(80);
	spotLight2.target.position = {
		x:0,
		y:0,
		z:-40
	}
	console.log(spotLight2);
	scene.add( spotLight2 );
	scene.add(spotLight2.target);


	// var shadowGeometry = new THREE.CubeGeometry( 35, 15, 1 );
	// var transpMaterial = new THREE.ShadowMaterial();
	// transpMaterial.opacity = 0.1;
	// var plane = new THREE.Mesh( shadowGeometry, transpMaterial );
	// plane.receiveShadow = true;
	// plane.position.z = -2.7;
	// scene.add( plane );
}