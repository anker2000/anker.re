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
	sectionObject.video = video;
	sectionObject.name=$(section).find("h2").html()
	if ($(section).hasClass("mobile")) {		
		var phonesGroup = new THREE.Group();
		addPhone({ x:de2ra(60), y:de2ra(-140), z:de2ra(30) },{ y:10, x:-10, z:-10 }, screenMaterial2, glassMaterial, reflectionCube, loader, color_dark, color_light).done(function(phoneGroup) {
			// TweenMax.to(phoneGroup.rotation, 1.5, {y:de2ra(0),  ease:Power4.easeOut});
			var tween = TweenMax.to(phoneGroup.position, 3.5,{ y:phoneGroup.position.y-1, yoyo:true, repeat:-1, delay:0.5, ease:Power2.easeInOut, onComplete:function() {}});	
			phonesGroup.add(phoneGroup);
		});

		addPhone({ x:de2ra(50), y:de2ra(35), z:de2ra(-80) },{ x:15, y:7,	z:-10 }, screenMaterial, glassMaterial, reflectionCube, loader, color_dark, color_light).done(function(phoneGroup) {
			// TweenMax.to(phoneGroup.rotation, 1.5, {y:de2ra(0),  ease:Power4.easeOut});
			var tween = TweenMax.to(phoneGroup.position, 3.5,{ y:phoneGroup.position.y-1, yoyo:true, repeat:-1, delay:0.5, ease:Power2.easeInOut, onComplete:function() {}});	
			phonesGroup.add(phoneGroup);
		});


		addPhone({ x:de2ra(120), y:de2ra(0), z:de2ra(-60) },{ x:45, y:-5, z:-10 }, screenMaterial2, glassMaterial, reflectionCube, loader, color_dark, color_light).done(function(phoneGroup) {
			// TweenMax.to(phoneGroup.rotation, 1.5, {y:de2ra(0),  ease:Power4.easeOut});
			var tween = TweenMax.to(phoneGroup.position, 3.5,{ y:phoneGroup.position.y-1, yoyo:true, repeat:-1, delay:0.5, ease:Power2.easeInOut, onComplete:function() {}});		
			phonesGroup.add(phoneGroup);
		});
		phonesGroup.position.y=16;
		phonesGroup.rotation.z=de2ra(-15);
		phonesGroup.begin = function() {

		}
		phonesGroup.end = function() {

		}

		sectionObject.add(phonesGroup);

	} else if ($(section).hasClass("desktop")) {
		addLaptop({x:de2ra(35), y:de2ra(-65), z:de2ra(40)}, { x:10, y:-20, z:-20}, screenMaterial, glassMaterial, reflectionCube, loader, color_dark, color_light).done(function(macbookGroup) {
			console.log("received macbook", macbookGroup);
			sectionObject.add(macbookGroup);
		});
	}
	sectionObject.updatePosition = function() {
		this.position.x = this.count*screenWidthFromDistance(200);
	}
	sectionObject.start = function() {
		sectionObject.video.play();
		console.log("section", sectionObject);
		sectionObject.children[0].begin();
		$("body").css("background",$(section).data("bg-dark"));
		$(".current_project *").css("color",$(section).data("text-color"));
		mainLight.color = rgbPercentage(hexToRgb($(section).data("bg-dark")));
		var intensity = colorIntensity(hexToRgb($(section).data("bg-light")));
		groundMaterial.opacity = map_range(intensity, 0, 1, 0.3, 0.05);
	}
	sectionObject.end = function() {
		if (typeof sectionObject.children[0] == "object") {
			sectionObject.children[0].end();
			console.log(sectionObject);
			// sectionObject.video.stop();
		}
	}
	stage.add( sectionObject );
	
	setTimeout(function(sectionObject) {
		sectionObject.position.x = sectionObject.count*screenWidthFromDistance(200);
	},100,sectionObject);
	return sectionObject;
}
