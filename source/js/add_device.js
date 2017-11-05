function addPhone(rotation, position, screenMaterial, glassMaterial, loader, color_dark, color_light) {

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
			var material = new THREE.MeshPhongMaterial(materials[0])
			var object = new THREE.Mesh( geometry, material );				
			object.position.y=-0.6;
			object.castShadow=true;
			object.receiveShadow = false;
			phoneGroup.add( object );
			object.traverse( function ( child ) {
				// child.geometry.computeFaceNormals();

		        phoneGroup.position.y=-5;
		        phoneGroup.position.z=-1;		      
				object.material.emissive.r = (color_dark.r/255);
				object.material.emissive.g = (color_dark.g/255);
				object.material.emissive.b = (color_dark.b/255);
				object.material.color.r = (color_light.r/255);
				object.material.color.g = (color_light.g/255);
				object.material.color.b = (color_light.b/255);
					
	    	});
	    	loader.load(
				'models/iphone-back.json',
				function ( geometry, materials ) {
					var material = new THREE.MeshPhongMaterial(materials[0])
					var object = new THREE.Mesh( geometry, material );				
					object.position.y=-0.6;
					object.castShadow=true;
					object.receiveShadow = false;
					phoneGroup.add( object );
					object.traverse( function ( child ) {
						// child.geometry.computeFaceNormals();
						child.geometry.computeVertexNormals();
				        phoneGroup.position.y=-5;
				        phoneGroup.position.z=-1;

				       
						object.material.emissive.r = (color_dark.r/255);
						object.material.emissive.g = (color_dark.g/255);
						object.material.emissive.b = (color_dark.b/255);
						object.material.color.r = (color_light.r/255);
						object.material.color.g = (color_light.g/255);
						object.material.color.b = (color_light.b/255);
						object.material.shininess = 10;

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

function addLaptop(rotation, position, screenMaterial, glassMaterial, loader, color_dark, color_light) {
	var deferred = new $.Deferred();
	var macbookGroup = new THREE.Group();
	var macbookScreenGroup = new THREE.Object3D();	
    var material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color:0xffffff, metalness:0.5, roughness:1});
	var macbookPivot = new THREE.Object3D();
	

	loader.load(
		// resource URL
		'models/screen-back.json',
		// Function when resource is loaded
		function ( geometry, materials ) {
			// var material = new THREE.MultiMaterial( materials );
			var material = new THREE.MeshPhongMaterial(materials[0])
			var object = new THREE.Mesh( geometry, material );
			// scene.add( object );
			
			object.position.y=0;
			object.position.x=-0.5;
			object.position.z=0;
			// object.rotation.y=de2ra(180);
			object.receiveShadow = false;
			object.castShadow=true;
			material.shininess = 0.2;
			object.traverse( function ( child ) {
		        // console.log("screen",object);
		        if ( child instanceof THREE.Mesh ) {
		            child.geometry.computeVertexNormals();
		        }
		        object.material.side=THREE.DoubleSide;
		        var color_dark = {
		        	r:10,
		        	g:10,
		        	b:10
		        }
		        var color_light = color_dark;
				macbookScreenGroup.add( object );
		        
		    });
		    // console.log("loaded screen back 1");
		    loader.load(
				'models/screen-front.json',
				function ( geometry, materials ) {
					
					var material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color:0x0f0f0f, emissive:0x0, metalness:0.7, roughness:0.2 });
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
					object.castShadow=false;
					object.receiveShadow = false;
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

					// console.log("loaded screen front 2");
					loader.load(
						'models/keyboard.json',
						function ( geometry, materials ) {
							var bodyMaterial = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color:0xcccccc, metalness:0.2, roughness:1});
							var object = new THREE.Mesh( geometry, bodyMaterial );
							object.position.x=-0.5;
							object.castShadow=false;
							object.receiveShadow = true;
							macbookGroup.add( object );
							// console.log("loaded keyboard 3");
							loader.load(
								// resource URL
								'models/keys.json',
								// Function when resource is loaded
								function ( geometry, materials ) {
									var material = new THREE.MeshPhongMaterial(materials[0])
									var object = new THREE.Mesh( geometry, material );
									// scene.add( object );
									
									object.position.y=0.005;
									// object.position.y=0.06;
									object.position.x=-0.5;
									object.position.z=0;
									object.receiveShadow = true;
									object.castShadow=true;
									var color_dark = {
										r: 0,
										g: 0,
										b: 0
									}
									var color_light = color_dark;
							       
						        	object.material.side=THREE.DoubleSide;
									object.material.specular.r = color_dark.r/255;
									object.material.specular.g = color_dark.g/255;
									object.material.specular.b = color_dark.b/255;
									object.material.emissive.r = color_light.r/255;
									object.material.emissive.g = color_light.g/255;
									object.material.emissive.b = color_light.b/255;
									object.material.shininess=15;	

									macbookGroup.add( object );
									// console.log("loaded keys 4");
							    	loader.load(
										// resource URL
										'models/keys-top.json',
										// Function when resource is loaded
										function ( geometry, materials ) {
											var material = new THREE.MeshPhongMaterial(materials[0])
											var object = new THREE.Mesh( geometry, material );
											// scene.add( object );
											
											object.position.y=0.005;
											// object.position.y=0.06;
											object.position.x=-0.5;
											object.position.z=0;
											object.receiveShadow = false;
											object.castShadow=false;
											var color_dark = {
												r: 0,
												g: 0,
												b: 0
											}
											var color_light = {
												r:5,
												g:5,
												b:5
											};
									        
								        	object.material.side=THREE.DoubleSide;
											object.material.specular.r = color_dark.r/255;
											object.material.specular.g = color_dark.g/255;
											object.material.specular.b = color_dark.b/255;
											object.material.emissive.r = color_light.r/255;
											object.material.emissive.g = color_light.g/255;
											object.material.emissive.b = color_light.b/255;
											object.material.shininess=21;	
								        
											macbookGroup.scale.set(6.25,6.25,6.25);
											macbookGroup.add( object );
											// macbookGroup.position = position;
											macbookGroup.position.z=position.z;
											macbookGroup.position.y=position.y;
											macbookGroup.position.x=position.x;
											macbookGroup.rotation.x = rotation.x;
											macbookGroup.rotation.y = rotation.y;
											macbookGroup.rotation.z = rotation.z;
											macbookGroup.screen = macbookPivot;
											// screenMaterial.opacity=0;
											// console.log("screenMaterial",screenMaterial);
											
											// console.log("loaded keys top 5");
											
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