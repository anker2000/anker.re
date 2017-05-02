function addPhone(rotation, position, screenMaterial, glassMaterial, reflectionCube, video, loader, color_dark, color_light) {

	var deferred = new $.Deferred();
	var phoneGroup = new THREE.Group();
	var screenGeometry = new THREE.PlaneGeometry( 0.55, 1, 1 );
	var screen = new THREE.Mesh( screenGeometry, screenMaterial );
	screen.receiveShadow = false;
	screen.position.z = 0.022;
	screen.position.y = 0.05;
	phoneGroup.add( screen );

	// var glassMaterial = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color:0x222222, emissive:0x0, metalness:0.7, roughness:0.2, envMap:reflectionCube });
	var glass = new THREE.Mesh( screenGeometry, glassMaterial );
	glass.receiveShadow = false;
	glass.position.z = 0.0225;
	glass.position.y = 0.05;
	phoneGroup.add(glass);

	loader.load(
		'models/iphones7.json',
		function ( geometry, materials ) {
			var material = new THREE.MultiMaterial( materials );
			var object = new THREE.Mesh( geometry, material );				
			object.position.y=-0.6;
			object.castShadow=true;
			object.receiveShadow = true;
			phoneGroup.add( object );
			object.traverse( function ( child ) {
				// child.geometry.computeFaceNormals();
		        phoneGroup.position.y=-5;
		        phoneGroup.position.z=-1;
		       for (i=0;i<object.material.materials.length;i++) {
		        	var tC = .75;
					object.material.materials[i].emissive.r = (color_dark.r/255);
					object.material.materials[i].emissive.g = (color_dark.g/255);
					object.material.materials[i].emissive.b = (color_dark.b/255);
					object.material.materials[i].color.r = (color_light.r/255);
					object.material.materials[i].color.g = (color_light.g/255);
					object.material.materials[i].color.b = (color_light.b/255);
					// object.material.materials[i].shininess = 10;
		        } 
	    	});
	    	loader.load(
				'models/iphone-back.json',
				function ( geometry, materials ) {
					var material = new THREE.MultiMaterial( materials );
					var object = new THREE.Mesh( geometry, material );				
					object.position.y=-0.6;
					object.castShadow=true;
					object.receiveShadow = true;
					phoneGroup.add( object );
					object.traverse( function ( child ) {
						child.geometry.computeFaceNormals();
				        phoneGroup.position.y=-5;
				        phoneGroup.position.z=-1;

				       for (i=0;i<object.material.materials.length;i++) {
				        	var tC = .75;
							object.material.materials[i].emissive.r = (color_dark.r/255);
							object.material.materials[i].emissive.g = (color_dark.g/255);
							object.material.materials[i].emissive.b = (color_dark.b/255);
							object.material.materials[i].color.r = (color_light.r/255);
							object.material.materials[i].color.g = (color_light.g/255);
							object.material.materials[i].color.b = (color_light.b/255);
							object.material.materials[i].shininess = 10;
				        } 
						phoneGroup.position.z=position.z;
						phoneGroup.position.y=position.y;
						phoneGroup.position.x=position.x;
						phoneGroup.scale.set( 30, 30, 30 );
						phoneGroup.castShadow = true;
						phoneGroup.rotation.x=rotation.x;
						phoneGroup.rotation.y=rotation.y;
						phoneGroup.rotation.z=rotation.z;
						deferred.resolve(phoneGroup);
			    	})				    	
				}
			);
		}
	);
	return deferred.promise();
}

function addLaptop(rotation, position, screenMaterial, glassMaterial, reflectionCube, loader, color_dark, color_light) {
	var deferred = new $.Deferred();
	var macbookGroup = new THREE.Group();
	var macbookScreenGroup = new THREE.Object3D();

	var texture = new THREE.TextureLoader().load( "models/macbook-texture.png" );
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 12, 12 );

	
    var material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color:0xffffff, metalness:0.5, roughness:1, map:texture, roughnessMap:texture});

	var macbookPivot = new THREE.Object3D();
	

	loader.load(
		// resource URL
		'models/screen-back.json',
		// Function when resource is loaded
		function ( geometry, materials ) {
			// var material = new THREE.MultiMaterial( materials );
			
			var object = new THREE.Mesh( geometry, material );
			// scene.add( object );
			
			object.position.y=0;
			object.position.x=-0.5;
			object.position.z=0;
			// object.rotation.y=de2ra(180);

			object.castShadow=true;
			object.traverse( function ( child ) {
		        // console.log("screen",object);
		        var color_dark = {
		        	r:40,
		        	g:40,
		        	b:40
		        }
		        var color_light = color_dark;
				macbookScreenGroup.add( object );
		    });
		    console.log("loaded screen back 1");
		    loader.load(
				// resource URL
				'models/screen-front.json',
				// Function when resource is loaded
				function ( geometry, materials ) {
					
					var material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color:0x222222, emissive:0x0, metalness:0.7, roughness:0.2, envMap:reflectionCube });
					var object = new THREE.Mesh( geometry, material );				
					object.position.y=0;
					object.position.x=-0.5;
					object.position.z=0;
					// object.rotation.y=de2ra(180);
					var color_dark = {
						r:0,
						g:0,
						b:0
					}
					var color_light = color_dark;
					object.castShadow=true;
					macbookScreenGroup.add( object );
					var desktopGeometry = new THREE.PlaneGeometry( 8.7, 5.8, 1 );

					var desktopScreen = new THREE.Mesh( desktopGeometry, screenMaterial );
					desktopScreen.position.z = -3.16;
					desktopScreen.position.y = 3.3;
					desktopScreen.rotation.x = de2ra(1);

					macbookScreenGroup.add(desktopScreen);

					var desktopGlass = new THREE.Mesh(desktopGeometry, glassMaterial);
					desktopGlass.receiveShadow = true;
					desktopGlass.position.z = -3.16;
					desktopGlass.position.y = 3.3;
					desktopGlass.rotation.x = de2ra(1);
					macbookScreenGroup.add(desktopGlass);

					
					var tempgeometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
					var tempmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );	
					mesh = new THREE.Mesh( tempgeometry, tempmaterial );
					
					macbookScreenGroup.position.z=3.1;
					macbookPivot.add(macbookScreenGroup);
					macbookPivot.position.z=-3;
					macbookPivot.position.y=0;
					macbookPivot.rotation.x=de2ra(90);
					
					macbookGroup.add(macbookPivot);

					console.log("loaded screen front 2");
					loader.load(
						'models/keyboard.json',
						function ( geometry, materials ) {
							var bodyMaterial = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color:0xffffff, metalness:0.2, roughness:1, map:texture, roughnessMap:texture});
							var object = new THREE.Mesh( geometry, bodyMaterial );
							object.position.x=-0.5;
							object.castShadow=true;
							macbookGroup.add( object );
							console.log("loaded keyboard 3");
							loader.load(
								// resource URL
								'models/keys.json',
								// Function when resource is loaded
								function ( geometry, materials ) {
									var material = new THREE.MultiMaterial( materials );
									var object = new THREE.Mesh( geometry, material );
									// scene.add( object );
									
									object.position.y=0.005;
									// object.position.y=0.06;
									object.position.x=-0.5;
									object.position.z=0;
									
									object.castShadow=false;
									var color_dark = {
										r: 0,
										g: 0,
										b: 0
									}
									var color_light = color_dark;
							        for (i=0;i<object.material.materials.length;i++) {
							        	var tC = .75;
							        	object.material.materials[i].side=THREE.DoubleSide;
										object.material.materials[i].specular.r = color_dark.r/255;
										object.material.materials[i].specular.g = color_dark.g/255;
										object.material.materials[i].specular.b = color_dark.b/255;
										object.material.materials[i].emissive.r = color_light.r/255;
										object.material.materials[i].emissive.g = color_light.g/255;
										object.material.materials[i].emissive.b = color_light.b/255;
										object.material.materials[i].shininess=21;	
							        }
									macbookGroup.add( object );
									console.log("loaded keys 4");
							    	loader.load(
										// resource URL
										'models/keys-top.json',
										// Function when resource is loaded
										function ( geometry, materials ) {
											var material = new THREE.MultiMaterial( materials );
											var object = new THREE.Mesh( geometry, material );
											// scene.add( object );
											
											object.position.y=0.005;
											// object.position.y=0.06;
											object.position.x=-0.5;
											object.position.z=0;
											
											object.castShadow=true;
											var color_dark = {
												r: 15,
												g: 15,
												b: 15
											}
											var color_light = {
												r:25,
												g:25,
												b:25
											};
									        for (i=0;i<object.material.materials.length;i++) {
									        	var tC = .75;
									        	object.material.materials[i].side=THREE.DoubleSide;
												object.material.materials[i].specular.r = color_dark.r/255;
												object.material.materials[i].specular.g = color_dark.g/255;
												object.material.materials[i].specular.b = color_dark.b/255;
												object.material.materials[i].emissive.r = color_light.r/255;
												object.material.materials[i].emissive.g = color_light.g/255;
												object.material.materials[i].emissive.b = color_light.b/255;
												object.material.materials[i].shininess=21;	
									        }
											macbookGroup.scale.set(6.25,6.25,6.25);
											macbookGroup.add( object );
											console.log(position);
											// macbookGroup.position = position;
											macbookGroup.position.z=position.z;
											macbookGroup.position.y=position.y;
											macbookGroup.position.x=position.x;
											macbookGroup.rotation.x = rotation.x;
											macbookGroup.rotation.y = rotation.y;
											macbookGroup.rotation.z = rotation.z;
											macbookGroup.screen = macbookPivot;
											// screenMaterial.opacity=0;
											console.log("screenMaterial",screenMaterial);
											
											console.log("loaded keys top 5");
											macbookGroup.begin = function() {
												console.log("macbook open");
												var openLid = TweenMax.to(macbookGroup.screen.rotation, 1, { x:-de2ra(20), ease:Power4.easeInOut});
											}
											macbookGroup.end = function() {
												var openLid = TweenMax.to(macbookGroup.screen.rotation, 1, { x:de2ra(90), ease:Power4.easeInOut});
											}
									    	deferred.resolve(macbookGroup);
									    }
									);
							    }
							);
						}
					);
				}
			);
		}
	);
		
											
	// scene.add(macbookGroup);
	
	return deferred.promise();
}