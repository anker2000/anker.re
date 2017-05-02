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
	sectionObject.elm = section;


	sectionObject.name=$(section).find("h2").html()
	sectionObject.tween = [];
	sectionObject.loaded=0;
	if ($(section).hasClass("mobile")) {

		var phonesGroup = new THREE.Group();
		addPhone({ x:de2ra(60), y:de2ra(-140), z:de2ra(30) },{ x:-10, y:10, z:-10 }, screenMaterial2, glassMaterial, reflectionCube, video, loader, color_dark, color_light).done(function(phoneGroup) {
			// TweenMax.to(phoneGroup.rotation, 1.5, {y:de2ra(0),  ease:Power4.easeOut});
			phoneGroup.startRotationPoint = 60;
			phonesGroup.add(phoneGroup);
			sectionObject.loaded+=.333333;
			sectionObject.tween.push(TweenMax.to(phoneGroup.position, 3.5,{ y:phoneGroup.position.y-1, yoyo:true, repeat:-1, delay:0, ease:Power2.easeInOut, onComplete:function() {}}));
		});

		addPhone({ x:de2ra(50), y:de2ra(35), z:de2ra(-80) },{ x:15, y:7, z:-10 }, screenMaterial, glassMaterial, reflectionCube, video, loader, color_dark, color_light).done(function(phoneGroup) {
			// TweenMax.to(phoneGroup.rotation, 1.5, {y:de2ra(0),  ease:Power4.easeOut});
			sectionObject.tween.push(TweenMax.to(phoneGroup.position, 3.5,{ y:phoneGroup.position.y-1, yoyo:true, repeat:-1, delay:0.5, ease:Power2.easeInOut, onComplete:function() {}}));	
			phoneGroup.startRotationPoint = 50;
			phonesGroup.add(phoneGroup);
			sectionObject.loaded+=.333333;
		});


		addPhone({ x:de2ra(120), y:de2ra(0), z:de2ra(-60) },{ x:45, y:-5, z:-10 }, screenMaterial2, glassMaterial, reflectionCube, video, loader, color_dark, color_light).done(function(phoneGroup) {
			// TweenMax.to(phoneGroup.rotation, 1.5, {y:de2ra(0),  ease:Power4.easeOut});
			sectionObject.tween.push(TweenMax.to(phoneGroup.position, 3.5,{ y:phoneGroup.position.y-1, yoyo:true, repeat:-1, delay:1.5, ease:Power2.easeInOut, onComplete:function() {}}));
			phoneGroup.startRotationPoint = 120;
			phonesGroup.add(phoneGroup);
			sectionObject.loaded+=.333333;
		});

		phonesGroup.position.y=8;
		phonesGroup.position.z=15;
		// phonesGroup.rotation.z=de2ra(-15);
		phonesGroup.position.x=-12
		phonesGroup.begin = function() {

		}
		phonesGroup.end = function() {

		}
		phonesGroup.startRotationPoint = 12
		sectionObject.add(phonesGroup);

	} else if ($(section).hasClass("desktop")) {
		// addLaptop({x:de2ra(35), y:de2ra(-65), z:de2ra(40)}, { x:10, y:-15, z:10}, screenMaterial, glassMaterial, reflectionCube, loader, color_dark, color_light).done(function(macbookGroup) {
		addLaptop({x:de2ra(15), y:de2ra(65), z:de2ra(-7)}, { x:5, y:-10, z:0}, screenMaterial, glassMaterial, reflectionCube, loader, color_dark, color_light).done(function(macbookGroup) {
			// console.log("received macbook", macbookGroup);
			sectionObject.loaded=1;
			macbookGroup.startRotationPoint = 65;
			sectionObject.add(macbookGroup);
			sectionObject.tween.push(TweenMax.to(macbookGroup.position, 3.5,{ y:macbookGroup.position.y-1, yoyo:true, repeat:-1, ease:Power2.easeInOut, onComplete:function() {}}));
			scrollHandler();
			if (sectionObject.kickstart) {
				sectionObject.children[0].begin()
			}						
		});
	}
	sectionObject.updateRotation = function() {
		// console.log(this.name,this.proximity);
		if (Math.abs(this.proximity)<0.1) {
			this.video.play();
			for (t=0;t<this.tween.length;t++) {
				this.tween[t].play();
			}
		} else {
			this.video.pause();
			for (t=0;t<this.tween.length;t++) {
				this.tween[t].pause();
			}
		}
		try {
			// console.log(this.name,this.type, this.children[0].children[0].type);
			if (this.name,this.type, this.children[0].children[0].type=="Group") { //phones
				var targetRotation =  this.children[0].startRotationPoint+(this.proximity*90);
			} else {
				var targetRotation =  this.children[0].startRotationPoint+(this.proximity*10);
			}
			this.children[0].rotation.y=de2ra(targetRotation);
			
		} catch(e) {
			// console.log(this.name,this.type,this.children[0]);
		}
	}
	sectionObject.updatePosition = function() {
		this.position.x = this.count*screenWidthFromDistance(200);
	}
	sectionObject.start = function() {
		if (typeof sectionObject.children[0] == "undefined") {
			sectionObject.kickstart=true;
		} else {
			sectionObject.children[0].begin();
		}
		$("body").css("background",$(section).data("bg-dark"));
		$(".current_project *").css("color",$(section).data("text-color"));
		mainLight.color = rgbPercentage(hexToRgb($(section).data("bg-dark")));
		var intensity = colorIntensity(hexToRgb($(section).data("bg-light")));
		groundMaterial.opacity = map_range(intensity, 0, 1, 0.12, 0.04);

		// console.log("headline",section.headline, $(section).find("h2"));
		// setTimeout(function() {
		// 	animateText.animateHeadline(sectionObject,true);
		// },1000);
		
	}
	sectionObject.end = function() {
		if (typeof sectionObject.children[0] == "object") {
			sectionObject.children[0].end();
			// console.log(sectionObject);
			// sectionObject.video.pause();
		}
		// animateText.animateHeadline(sectionObject,false);
	}
	stage.add( sectionObject );
	
	sectionObject.checkLoad = function() {
		if (sectionObject.loaded>0.98) {
			animateText.register(sectionObject);
			$(".devices canvas").css("opacity",1)
		} else {
			setTimeout(sectionObject.checkLoad,100);
		}
	}
	sectionObject.checkLoad();
	setTimeout(function(sectionObject) {
		sectionObject.position.x = sectionObject.count*screenWidthFromDistance(200);
	},100,sectionObject);
	return sectionObject;
}
