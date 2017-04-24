function addProject(section, stage) {
	var sectionObject = new THREE.Group();
	var area = {};
	function resizeHandler() {
		area.screenWidth=screenWidthFromDistance(camera.position.z);
		console.log(area.screenWidth);
	}
	$(window).bind("resize",resizeHandler);
	resizeHandler();
	
	var loader = new THREE.JSONLoader();
	var screenMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });	
	var video = $(section).find("video")[0];

	var reflectionCube = new THREE.CubeTextureLoader().load(["models/environment2.jpg","models/environment2.jpg","models/environment2.jpg","models/environment2.jpg","models/environment2.jpg","models/environment2.jpg"] );
	reflectionCube.format = THREE.RGBFormat;

	var videoTexture = new THREE.VideoTexture( video );
	videoTexture.minFilter = THREE.LinearFilter;
	videoTexture.magFilter = THREE.LinearFilter;
	videoTexture.format = THREE.RGBFormat;
	videoTexture.wrapS = THREE.ClampToEdgeWrapping;
	videoTexture.wrapT = THREE.ClampToEdgeWrapping;
	screenMaterial.map = videoTexture;
	// screenMaterial.emissiveMap = videoTexture;
	// screenMaterial.emissiveIntensity = 2;
	// screenMaterial.reflectivity = 0;


	var screenMaterial2 = new THREE.MeshBasicMaterial({ color: 0x333333 });	
	var glassMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff  });
	glassMaterial.specular.r=1;
	glassMaterial.specular.g=1;
	glassMaterial.specular.b=1;
	glassMaterial.transparent = true;
	glassMaterial.opacity = 0.05;
	glassMaterial.shininess = 20;
	glassMaterial.envMap = reflectionCube;
	glassMaterial.reflectivity = 5;
	glassMaterial.combine = THREE.MixOperation;
	var emDarken = 1;
	var color_light = hexToRgb($(section).data("device-light"));
	var color_dark = hexToRgb($(section).data("device-dark"));
	console.log(color_light.r, color_dark);

	if ($(section).hasClass("mobile")) {
		var phone1, phone2, phone3;
		
		
		addPhone({ x:de2ra(-35), z:de2ra(-20) },{ y:23,	x:8, z:0 }, screenMaterial, glassMaterial, loader, color_dark, color_light).done(function(phoneGroup) {
			TweenMax.to(phoneGroup.rotation, 1.5, {y:de2ra(0),  ease:Power4.easeOut});
			var tween = TweenMax.to(phoneGroup.position, 3.5,{ y:phoneGroup.position.y-1, yoyo:true, repeat:-1, delay:0.5, ease:Power2.easeInOut, onComplete:function() {}});	
			sectionObject.add(phoneGroup);	
			phone1 = phoneGroup;
		});

		addPhone({ x:de2ra(-60), z:de2ra(20) },{ x:-8, y:7,	z:0	}, screenMaterial2, glassMaterial, loader, color_dark, color_light).done(function(phoneGroup) {
			TweenMax.to(phoneGroup.rotation, 1.5, {y:de2ra(0),  ease:Power4.easeOut});
			var tween = TweenMax.to(phoneGroup.position, 3.5,{ y:phoneGroup.position.y-1, yoyo:true, repeat:-1, delay:0.5, ease:Power2.easeInOut, onComplete:function() {}});	
			sectionObject.add(phoneGroup);
			phone2 = phoneGroup;
		});


		addPhone({ x:de2ra(-65),z:de2ra(0) },{ x:0, y:-12, z:0 }, screenMaterial2, glassMaterial, loader, color_dark, color_light).done(function(phoneGroup) {
			TweenMax.to(phoneGroup.rotation, 1.5, {y:de2ra(0),  ease:Power4.easeOut});
			var tween = TweenMax.to(phoneGroup.position, 3.5,{ y:phoneGroup.position.y-1, yoyo:true, repeat:-1, delay:0.5, ease:Power2.easeInOut, onComplete:function() {}});		
			sectionObject.add(phoneGroup);
			phone3 = phoneGroup;
		});
		
	} else if ($(section).hasClass("desktop")) {
		var macbookGroup = new THREE.Group();
		var macbookScreenGroup = new THREE.Object3D();

		var texture = new THREE.TextureLoader().load( "models/macbook-texture.png" );
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set( 12, 12 );

		
        var material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color:0xffffff, metalness:0.5, roughness:1, map:texture, roughnessMap:texture});

		
		

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
			}
		);
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
			}
		);
		

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

		var macbookPivot = new THREE.Object3D();
		var tempgeometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
		var tempmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );	
		mesh = new THREE.Mesh( tempgeometry, tempmaterial );
		// macbookPivot.add( mesh );
		
		macbookScreenGroup.position.z=3.1;
		macbookPivot.add(macbookScreenGroup);
		macbookPivot.position.z=-3;
		macbookPivot.position.y=0;
		macbookPivot.rotation.x=de2ra(90);
		
		macbookGroup.add(macbookPivot);
		loader.load(
			'models/keyboard.json',
			function ( geometry, materials ) {
				var object = new THREE.Mesh( geometry, material );
				object.position.x=-0.5;
				object.castShadow=true;
				console.log("material",material)
				macbookGroup.add( object );
		});
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
				
				object.castShadow=true;
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
		    	
		    }
		);
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
				macbookGroup.add( object );
		    	
		    }
		);	
		macbookGroup.position.x=20;
		macbookGroup.position.y=-15;
		macbookGroup.position.z=-5;
		macbookGroup.rotation.x=de2ra(35);
		macbookGroup.rotation.y=de2ra(-65);
		macbookGroup.rotation.z=de2ra(40);
		macbookGroup.scale.set(5,5,5);
		// scene.add(macbookGroup);
		sectionObject.add(macbookGroup);

		sectionObject.position.z=5;
		// screenMaterial.opacity=0;
		console.log("screenMaterial",screenMaterial);
		
		var tween1 = TweenMax.to(macbookGroup.position, 3.5,{ y:macbookGroup.position.y-1, yoyo:true, repeat:-1, ease:Power2.easeInOut, onComplete:function() {}});
		var openLid = TweenMax.to(macbookPivot.rotation, 2.5, { x:-de2ra(20), ease:Power4.easeInOut, delay: 2});
		// var turnComputer = TweenMax.to(macbookGroup.rotation, 2, { x:de2ra(15), y:-de2ra(65), ease:Power4.easeInOut, delay: 2});
		// var turnOnScreen = TweenMax.to(screenMaterial, 0.3, {opacity:1, delay:4});
		// var tween2 = TweenMax.to(macbookGroup.rotation, 3.5,{ y:de2ra(360), yoyo:true, repeat:-1, ease:Power2.easeInOut, onComplete:function() {}});
	}
	sectionObject.updatePosition = function() {
		this.position.x = this.count*screenWidthFromDistance(200);
	}
	sectionObject.start = function() {
		console.log("new section",section, $(section).attr("data-bg-light"), $(section).attr("data-bg-dark"));
		$("body").css("background",$(section).data("bg-dark"));
		// $(".current_project *").css("color",$(section).data("bg-light"));
	}
	stage.add( sectionObject );
	
	setTimeout(function(sectionObject) {
		sectionObject.position.x = sectionObject.count*screenWidthFromDistance(200);
	},100,sectionObject);
	return sectionObject;
}
function addPhone(rotation, position, screenMaterial, glassMaterial, loader, color_dark, color_light) {
	console.log("rotation",position);
	var deferred = new $.Deferred();
	var phoneGroup = new THREE.Group();
	var screenGeometry = new THREE.PlaneGeometry( 0.55, 1, 1 );
	var screen = new THREE.Mesh( screenGeometry, screenMaterial );
	screen.receiveShadow = false;
	screen.position.z = 0.0292;
	screen.position.y = 0.05;
	phoneGroup.add( screen );

	var glass = new THREE.Mesh( screenGeometry, glassMaterial );
	glass.receiveShadow = false;
	glass.position.z = 0.0292;
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
				        } 
						phoneGroup.position.z=position.z;
						phoneGroup.position.y=position.y;
						phoneGroup.position.x=position.x;
						phoneGroup.scale.set( 30, 30, 30 );
						phoneGroup.castShadow = true;
						phoneGroup.rotation.x=rotation.x;
						phoneGroup.rotation.z=rotation.z;

						deferred.resolve(phoneGroup);
			    	})				    	
				}
			);
		}
	);
	return deferred.promise();
}