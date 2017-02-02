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

	var videoTexture = new THREE.VideoTexture( video );
	videoTexture.minFilter = THREE.LinearFilter;
	videoTexture.magFilter = THREE.LinearFilter;
	videoTexture.format = THREE.RGBFormat;
	videoTexture.wrapS = THREE.ClampToEdgeWrapping;
	videoTexture.wrapT = THREE.ClampToEdgeWrapping;
	screenMaterial.map = videoTexture;

	var glassMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff  });
	glassMaterial.specular.r=1;
	glassMaterial.specular.g=1;
	glassMaterial.specular.b=1;
	glassMaterial.transparent = true;
	glassMaterial.opacity = 0.1;
	glassMaterial.shininess = 10;

	var color_light = hexToRgb($(section).data("device-light"));
	var color_dark = hexToRgb($(section).data("device-dark"));
	console.log(color_light.r, color_dark);

	if ($(section).hasClass("mobile")) {
		var phoneGroup = new THREE.Group();
		var screenGeometry = new THREE.PlaneGeometry( 0.55, 0.983, 1 );
		var screen = new THREE.Mesh( screenGeometry, screenMaterial );
		screen.receiveShadow = false;
		screen.position.z = 0.0292;
		screen.position.y = 0.05;
		screen.receiveShadow = false;
		screen.position.z = 0.0292;
		screen.position.y = 0.05;
		phoneGroup.add( screen );

		var glass = new THREE.Mesh( screenGeometry, glassMaterial );
		glass.receiveShadow = true;
		glass.position.z = 0.0293;
		glass.position.y = 0.05;
		glass.transparent = true;		
		// phoneGroup.add(glass);

		loader.load(
			// resource URL
			'models/phone.json',
			// Function when resource is loaded
			function ( geometry, materials ) {
				var material = new THREE.MultiMaterial( materials );
				var object = new THREE.Mesh( geometry, material );				
				object.position.y=-0.6;
				object.castShadow=true;
				object.traverse( function ( child ) {
			        phoneGroup.position.y=-5;
			        phoneGroup.position.z=-1;
			        for (i=0;i<object.material.materials.length;i++) {
			        	var tC = .75;
			        	object.material.materials[i].side=2;
						object.material.materials[i].specular.r = color_dark.r/255;
						object.material.materials[i].specular.g = color_dark.g/255;
						object.material.materials[i].specular.b = color_dark.b/255;
						object.material.materials[i].emissive.r = color_light.r/255;
						object.material.materials[i].emissive.g = color_light.g/255;
						object.material.materials[i].emissive.b = color_light.b/255;
			        } 
					phoneGroup.add( object );
		    	}
		    );

			phoneObject = object;
			phoneGroup.position.z=0;
			phoneGroup.position.y=-1;
			phoneGroup.scale.set( 30, 30, 30 );
			phoneGroup.castShadow = true;

			// phone1 = phoneGroup.clone();
			// phone1.position.x=-25;
			// phone1.position.z = -20;
			
			TweenMax.to(phoneGroup.rotation, 1.5, {y:de2ra(0),  ease:Power4.easeOut});
			var tween = TweenMax.to(phoneGroup.position, 3.5,{ y:0, yoyo:true, repeat:-1, ease:Power2.easeInOut, onComplete:function() {}});
			// setTimeout(function() {
			// 	var tween = TweenMax.to(phone1.position, 3.5,{ y:0, yoyo:true, repeat:-1, ease:Power2.easeInOut, onComplete:function() {}});
			// },1500);
			
			
		});
		sectionObject.add(phoneGroup);
		
	} else if ($(section).hasClass("desktop")) {
		var macbookGroup = new THREE.Group();
		var macbookScreenGroup = new THREE.Object3D();
		loader.load(
			// resource URL
			'models/screen.json',
			// Function when resource is loaded
			function ( geometry, materials ) {
				var material = new THREE.MultiMaterial( materials );
				var object = new THREE.Mesh( geometry, material );
				// scene.add( object );
				
				object.position.y=0;
				object.position.x=-0.5;
				object.position.z=0;
				// object.rotation.y=de2ra(180);
				
				object.castShadow=true;
				object.traverse( function ( child ) {
			        
			        for (i=0;i<object.material.materials.length;i++) {
			        	var tC = .75;
			        	object.material.materials[i].side=2;
						object.material.materials[i].specular.r=1;
						object.material.materials[i].specular.g=.7;
						object.material.materials[i].specular.b=0;	
						object.material.materials[i].emissive.r=1;
						object.material.materials[i].emissive.g=.8;
						object.material.materials[i].emissive.b=0;
						object.material.materials[i].shininess=8;	
			        }
					macbookScreenGroup.add( object );
			    });
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
		// macbookScreenGroup.add(desktopGlass);

		var macbookPivot = new THREE.Object3D();
		var tempgeometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
		var tempmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );	
		mesh = new THREE.Mesh( tempgeometry, tempmaterial );
		macbookPivot.add( mesh );
		
		macbookScreenGroup.position.z=3;
		macbookPivot.add(macbookScreenGroup);
		macbookPivot.position.z=-2.8;
		macbookPivot.rotation.x=de2ra(90);
		var openLid = TweenMax.to(macbookPivot.rotation, 1, { x:0, ease:Power4.easeInOut});
		var turnOnScreen = TweenMax.to(screenMaterial, 0.3, {opacity:1, delay:0.5});
		macbookGroup.add(macbookPivot);

		// macbookGroup.rotation.y=de2ra(90);
		loader.load(
			// resource URL
			'models/keyboard.json',
			// Function when resource is loaded
			function ( geometry, materials ) {
				var material = new THREE.MultiMaterial( materials );
				var object = new THREE.Mesh( geometry, material );
				// scene.add( object );
				object.position.x=-0.5;
				
				object.castShadow=true;
				
		        
		        for (i=0;i<object.material.materials.length;i++) {
		        	var tC = .75;
		        	object.material.materials[i].side=2;
					object.material.materials[i].specular.r=1;
					object.material.materials[i].specular.g=.7;
					object.material.materials[i].specular.b=0;		
					object.material.materials[i].emissive.r=1;
						object.material.materials[i].emissive.g=.8;
						object.material.materials[i].emissive.b=0;
					object.material.materials[i].shininess=1.5;	
		        }
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
				object.position.x=-0.5;
				object.position.z=0;
				
				object.castShadow=true;
				
		        for (i=0;i<object.material.materials.length;i++) {
		        	var tC = .75;
		        	object.material.materials[i].side=2;
					object.material.materials[i].specular.r=1;
					object.material.materials[i].specular.g=.7;
					object.material.materials[i].specular.b=0;	
					object.material.materials[i].emissive.r=1;
					object.material.materials[i].emissive.g=.8;
					object.material.materials[i].emissive.b=0;
					object.material.materials[i].shininess=21;	
		        }
				macbookGroup.add( object );
		    	
		    }
		);	

		macbookGroup.position.y=-10;
		macbookGroup.position.z=4;
		macbookGroup.scale.set(4,4,4);
		// scene.add(macbookGroup);
		sectionObject.add(macbookGroup);

		sectionObject.position.z=5;
		var tween1 = TweenMax.to(macbookGroup.position, 3.5,{ y:-9, yoyo:true, repeat:-1, ease:Power2.easeInOut, onComplete:function() {}});
		// var tween2 = TweenMax.to(macbookGroup.rotation, 3.5,{ y:de2ra(360), yoyo:true, repeat:-1, ease:Power2.easeInOut, onComplete:function() {}});
	}
	sectionObject.updatePosition = function() {
		this.position.x = this.count*screenWidthFromDistance(60);
	}
	sectionObject.start = function() {
		console.log("new section",section, $(section).attr("data-bg-light"), $(section).attr("data-bg-dark"));
		$(".devices").css("background","radial-gradient(ellipse at center, "+$(section).data("bg-light")+" 0%, "+$(section).data("bg-dark")+" 100%)")
	}
	stage.add( sectionObject );
	
	setTimeout(function(sectionObject) {
		sectionObject.position.x = sectionObject.count*screenWidthFromDistance(60);
	},100,sectionObject);
	return sectionObject;
}