var phoneModel = null;
var macbookModel = null;

var glassMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff  });
glassMaterial.specular.r=1;
glassMaterial.specular.g=1;
glassMaterial.specular.b=1;
glassMaterial.transparent = true;
glassMaterial.opacity = 0.05;
glassMaterial.shininess = 20;
// glassMaterial.envMap = reflectionCube;
glassMaterial.reflectivity = 5;
glassMaterial.combine = THREE.MixOperation;

var metalMaterial = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color:0xffffff, metalness:0.5, roughness:1});
function loadPhone(loader) {
	var deferred = new $.Deferred();
	if (phoneModel!=null) {
		console.log("cloning");
		var returnPhone = phoneModel.clone();
		deferred.resolve(returnPhone);
	} else {
		
		var screenGeometry = new THREE.PlaneGeometry( 0.55, 1, 1 );
		var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
		

		var phoneGroup = new THREE.Mesh( screenGeometry, material );
		phoneGroup.receiveShadow = false;
		phoneGroup.position.z = 0.022;
		phoneGroup.position.y = 0.05;

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
				object.name="iphoneFront";
				object.traverse( function ( child ) {
					// child.geometry.computeFaceNormals();
			        phoneGroup.position.y=-5;
			        phoneGroup.position.z=-1;		      
						
		    	});
		    	loader.load(
					'models/iphone-back.json',
					function ( geometry, materials ) {
						var material = new THREE.MeshPhongMaterial(materials[0])
						var object = new THREE.Mesh( geometry, material );				
						object.position.y=-0.6;
						object.castShadow=true;
						object.receiveShadow = false;
						object.name="iphoneBack"
						phoneGroup.add( object );
						object.traverse( function ( child ) {
							// child.geometry.computeFaceNormals();
							child.geometry.computeVertexNormals();
					        phoneGroup.position.y=-5;
					        phoneGroup.position.z=-1;							
							phoneGroup.scale.set( 30, 30, 30 );
							phoneGroup.castShadow = true;
							
							phoneModel = phoneGroup;
							deferred.resolve(phoneGroup);
				    	})				    	
					}
				);
			}
		);
	}
	return deferred.promise();
}

function addPhone(rotation, position, screenMaterial, loader, color_dark, color_light) {
	var deferred = new $.Deferred();
	loadPhone(loader).done(function(phoneGroup) {
		phoneGroup.position.z=position.z;
		phoneGroup.position.y=position.y;
		phoneGroup.position.x=position.x;
		phoneGroup.rotation.x=rotation.x;
		phoneGroup.rotation.y=rotation.y;
		phoneGroup.rotation.z=rotation.z;
		phoneGroup.children[0].material = screenMaterial;
		phoneGroup.children[1].material.emissive.r = (color_dark.r/255);
		phoneGroup.children[1].material.emissive.g = (color_dark.g/255);
		phoneGroup.children[1].material.emissive.b = (color_dark.b/255);
		phoneGroup.children[1].material.color.r = (color_light.r/255);
		phoneGroup.children[1].material.color.g = (color_light.g/255);
		phoneGroup.children[1].material.color.b = (color_light.b/255);
		phoneGroup.children[2].material.emissive.r = (color_dark.r/255);
		phoneGroup.children[2].material.emissive.g = (color_dark.g/255);
		phoneGroup.children[2].material.emissive.b = (color_dark.b/255);
		phoneGroup.children[2].material.color.r = (color_light.r/255);
		phoneGroup.children[2].material.color.g = (color_light.g/255);
		phoneGroup.children[2].material.color.b = (color_light.b/255);
		phoneGroup.children[2].material.shininess = 10;

		deferred.resolve(phoneGroup);
	});
	return deferred.promise();
}

function loadLaptop(screenMaterial, loader, color_dark, color_light) {
	var deferred = new $.Deferred();
	if (macbookModel!=null) {
		console.log("cloning");
		var returnMac = macbookModel.clone();
		deferred.resolve(returnMac);
	} else {
	    
		var macbookPivot = new THREE.Object3D();
		var macbookGroup = new THREE.Mesh();
		var macbookScreenGroup = new THREE.Mesh();
		macbookScreenGroup.name = "screenGroup";

		loader.load(
			// resource URL
			'models/screen-back.json',
			// Function when resource is loaded
			function ( geometry, materials ) {
				// var material = new THREE.MultiMaterial( materials );
				var material = new THREE.MeshPhongMaterial(materials[0])
				var object = new THREE.Mesh( geometry, metalMaterial );
				// scene.add( object );
				
				object.position.y=0;
				object.position.x=-0.5;
				object.position.z=0;
				object.name = "screenBack";
				object.receiveShadow = false;
				object.castShadow=true;
				material.shininess = 0.2;
				object.traverse( function ( child ) {
			        // console.log("screen",object);
			        if ( child instanceof THREE.Mesh ) {
			            child.geometry.computeVertexNormals();
			        }
			        object.material.side=THREE.DoubleSide;
			    });
			    macbookScreenGroup.add(object);
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

						var desktopScreen = new THREE.Mesh( desktopGeometry, material );
						desktopScreen.name="screenFront"
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

								var bodyMaterial = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color:0xbdbdbd, metalness:0.2, roughness:1});
								var object = new THREE.Mesh( geometry, bodyMaterial );
								object.position.x=-0.5;
								object.castShadow=false;
								object.receiveShadow = true;
								object.material.shininess = 10;
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

										macbookGroup.add( object );
										// console.log("loaded keys 4");
								    	loader.load(
											// resource URL
											'models/keys-top.json',
											// Function when resource is loaded
											function ( geometry, materials ) {
												var material = new THREE.MeshPhongMaterial(materials[0])
												var object = new THREE.Mesh( geometry, material );
												object.name="keysTop";
												object.position.y=0.005;
												object.position.x=-0.5;
												object.position.z=0;
												object.receiveShadow = false;
												object.castShadow=false;
									        	object.material.side=THREE.DoubleSide;
												
												object.material.shininess=0;	
									        
												macbookGroup.scale.set(6.25,6.25,6.25);
												macbookGroup.add( object );
												macbookGroup.screen = macbookPivot;
												macbookModel = macbookGroup;
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
	}
	
	return deferred.promise();
}
function addLaptop(rotation, position, screenMaterial, loader, color_dark, color_light) {
	var deferred = new $.Deferred();
	loadLaptop( screenMaterial, loader).done(function(macbookGroup) {
		macbookGroup.position.z=position.z;
		macbookGroup.position.y=position.y;
		macbookGroup.position.x=position.x;
		macbookGroup.rotation.x = rotation.x;
		macbookGroup.rotation.y = rotation.y;
		macbookGroup.rotation.z = rotation.z;

		macbookGroup.children[0].children[0].children[2].material = screenMaterial;

		deferred.resolve(macbookGroup);
	});
	return deferred.promise();
}