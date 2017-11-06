function addProject(section, stage, count) {
	var sectionObject = new THREE.Group();
	sectionObject.count=count;
	sectionObject.position.y = sectionObject.count * -1*screenWidthFromDistance(200);
	if (count>0) sectionObject.visible = false;
	var area = {};
	function resizeHandler() {
		area.screenWidth=screenWidthFromDistance(camera.position.z);
	}
	$(window).bind("resize",resizeHandler);
	resizeHandler();
	
	var loader = new THREE.JSONLoader();
	var screenMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });	
	var video = $(section).find("video");
	for (var vl=0;vl<video.length;vl++) {
		video[vl].pause();
		sectionObject.video = video[vl];
	}

	var screenMaterialArray = new Array();

	var materialArray = $(section)[0].children;
	for (im = 0; im < materialArray.length; im++) {
		
		if (materialArray[im].tagName=="IMG" || materialArray[im].tagName=="VIDEO") {			
			screenMaterialArray.push(customMaterial(materialArray[im]));
		}		
	}
	
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
	var emDarken = 1;
	var color_light = hexToRgb($(section).data("device-light"));
	var color_dark = hexToRgb($(section).data("device-dark"));

	
	sectionObject.elm = section;


	sectionObject.name=$(section).find("h2").html()
	sectionObject.tween = [];
	sectionObject.loaded=0;
	sectionObject.ref = section;

	if ($(section).hasClass("mobile")) {
		sectionObject.deviceType="mobile";
		var phonesGroup = new THREE.Group();
		addPhone({ x:de2ra(60), y:de2ra(-140), z:de2ra(30) },{ x:-10, y:4, z:-8 }, screenMaterialArray[1], glassMaterial, loader, color_dark, color_light).done(function(phoneGroup) {
			// TweenMax.to(phoneGroup.rotation, 1.5, {y:de2ra(0),  ease:Power4.easeOut});
			phoneGroup.startRotationPoint = 60;
			phonesGroup.add(phoneGroup);
			sectionObject.loaded+=.333333;
			sectionObject.tween.push(TweenMax.to(phoneGroup.position, 3.5,{ y:phoneGroup.position.y-1, yoyo:true, repeat:-1, delay:0, ease:Power2.easeInOut, onComplete:function() {}}));
			// console.log("phone added");
		});

		addPhone({ x:de2ra(50), y:de2ra(35), z:de2ra(-80) },{ x:15, y:1, z:-8 }, screenMaterialArray[0], glassMaterial, loader, color_dark, color_light).done(function(phoneGroup) {
			// TweenMax.to(phoneGroup.rotation, 1.5, {y:de2ra(0),  ease:Power4.easeOut});
			sectionObject.tween.push(TweenMax.to(phoneGroup.position, 3.5,{ y:phoneGroup.position.y-1, yoyo:true, repeat:-1, delay:0.5, ease:Power2.easeInOut, onComplete:function() {}}));	
			phoneGroup.startRotationPoint = 50;
			phonesGroup.add(phoneGroup);
			sectionObject.loaded+=.333333;
			// console.log("phone added");
		});


		addPhone({ x:de2ra(120), y:de2ra(0), z:de2ra(-60) },{ x:45, y:-11, z:-8 }, screenMaterialArray[2], glassMaterial, loader, color_dark, color_light).done(function(phoneGroup) {
			// TweenMax.to(phoneGroup.rotation, 1.5, {y:de2ra(0),  ease:Power4.easeOut});
			sectionObject.tween.push(TweenMax.to(phoneGroup.position, 3.5,{ y:phoneGroup.position.y-1, yoyo:true, repeat:-1, delay:1.5, ease:Power2.easeInOut, onComplete:function() {}}));
			phoneGroup.startRotationPoint = 120;
			phonesGroup.add(phoneGroup);
			sectionObject.loaded+=.333333;
			// console.log("phone added");
		});

		phonesGroup.position.y=5;
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
		sectionObject.deviceType="desktop";
		// console.log("print out",screenMaterialArray[0],screenMaterialArray[1])
		addLaptop({x:de2ra(60), y:de2ra(0), z:de2ra(0)}, { x:0, y:-45, z:10}, screenMaterialArray[0], glassMaterial, loader, color_dark, color_light).done(function(macbookGroup) {
			// console.log("received macbook", macbookGroup);
			sectionObject.loaded+=1.5;
			sectionObject.macbookGroup = macbookGroup;
			macbookGroup.startRotationPoint = 0;
			macbookGroup.opacity = 0;
			macbookGroup.begin = function() {
				// console.log("macbook open");
				// var openLid = TweenMax.to(macbookGroup.screen.rotation, 1.3, { x:-de2ra(20), delay:1.25, ease:Power4.easeOut});
			}
			macbookGroup.end = function() {
				// var openLid = TweenMax.to(macbookGroup.screen.rotation, 1, { x:de2ra(90), ease:Power4.easeOut});
			}
			sectionObject.add(macbookGroup);
			// sectionObject.tween.push(TweenMax.to(macbookGroup.position, 3.5,{ y:macbookGroup.position.y-1, yoyo:true, repeat:-1, ease:Power2.easeInOut, onComplete:function() {}}));
			if (sectionObject.loaded==1) {
				scrollHandler();
			}
			if (sectionObject.kickstart) {
				macbookGroup.begin()
			}
			// console.log("macbook added");
		});
		addPhone({ x:de2ra(-15), y:de2ra(10), z:de2ra(15) },{ x:-50, y:-25, z:0 }, screenMaterialArray[1], glassMaterial, loader, color_dark, color_light).done(function(phoneGroup) {
			// TweenMax.to(phoneGroup.rotation, 1.5, {y:de2ra(0),  ease:Power4.easeOut});
			var phonesGroup = new THREE.Group();
			
			// phonesGroup.rotation.z=de2ra(-15);
			phoneGroup.scale.x = 16;
			phoneGroup.scale.y = 16;
			phoneGroup.scale.z = 16;
			phonesGroup.begin = function() {

			}
			phonesGroup.end = function() {

			}
			phonesGroup.startRotationPoint = 0;
			phoneGroup.startRotationPoint = -30;
			phonesGroup.add(phoneGroup);
			
			// sectionObject.tween.push(TweenMax.to(phoneGroup.position, 3.5,{ y:phoneGroup.position.y-1, yoyo:true, repeat:-1, delay:0.5, ease:Power2.easeInOut, onComplete:function() {}}));
			sectionObject.loaded=1;
			sectionObject.loaded+=.5;

			scrollHandler();

			sectionObject.add(phonesGroup);

		});
	}
	sectionObject.updateRotation = function() {
		if (typeof sectionObject.macbookGroup!="undefined") {
			if (sectionObject.deviceType=="desktop" && Math.abs(getProximity(this.count))<1) {
				var lidAngle = map_range(Math.abs(getProximity(this.count)),-0.15,0,90,20);
				if (lidAngle<-90) lidAngle = -90;
				TweenMax.to(sectionObject.macbookGroup.screen.rotation, 1, { x:-de2ra(lidAngle), ease:Power4.easeOut})
			}
		}
		if (Math.abs(this.proximity)<0.1) {
			if (this.video) this.video.play();
			for (t=0;t<this.tween.length;t++) {
				this.tween[t].play();
			}
		} else {
			if (this.video) this.video.pause();
			for (t=0;t<this.tween.length;t++) {
				this.tween[t].pause();
			}
		}
		try {
			if (this.children[0].children[0].type=="Group" && this.children[0].children.length>2) { //phones
				var targetRotation =  this.children[0].startRotationPoint+(this.proximity*100);
				for (r=0;r<this.children[0].children.length; r++) {
					this.children[0].children[r].rotation.x=de2ra(this.children[0].children[r].startRotationPoint+(this.proximity*200));
				}
			} else {
				var targetRotation =  this.children[0].startRotationPoint+(this.proximity*100);
				this.children[0].children[1].rotation.x=de2ra(this.children[0].children[1].startRotationPoint+(this.proximity*-200));
			}
			this.children[0].rotation.y=de2ra(targetRotation);
			
		} catch(e) {

		}

	}
	sectionObject.updatePosition = function() {
		// this.position.x = this.count*screenWidthFromDistance(200);
		this.position.y = sectionObject.count * -1*screenWidthFromDistance(200);
	}
	sectionObject.start = function(object) {

		if (typeof this.loaded == "undefined" || typeof sectionObject.headline == "undefined") {
			setTimeout(function() {
				sectionObject.start()
			},50);
			return false;
		}
		
		
		$(sectionObject.headline.parentNode).addClass("active");
		kickOffSite();
		
		$("body").css("background",$(section).data("bg-dark")).css("color",$(section).data("text-color"));

		$("nav .toggle span").css("background-color",$(section).data("text-color"));
		mainLight.color = rgbPercentage(hexToRgb($(section).data("bg-dark")));
		var intensity = colorIntensity(hexToRgb($(section).data("bg-light")));
		TweenMax.to(groundMaterial, 1,{ opacity:map_range(intensity, 0, 1, 0.3, 0.04), onComplete:function() {}})


		for (var a=0;a<sectionObject.children.length;a++) {
			// console.log("sectionobject child",a);
			if (typeof sectionObject.children[a].begin != "undefined") {
				sectionObject.children[a].begin();
			}
		}
		sectionObject.kickstart=true;
	}
	sectionObject.end = function() {

		for (var a=0;a<sectionObject.children.length;a++) {
			// console.log("sectionobject child",a);
			if (typeof sectionObject.children[a].end != "undefined") {
				sectionObject.children[a].end();
			}
		}
		if (typeof sectionObject.headline =="object") {
			$(sectionObject.headline.parentNode).removeClass("active");
		}
	}
	stage.add( sectionObject );
	
	sectionObject.checkLoad = function() {
		if (sectionObject.loaded>0.98) {
			animateText.register(sectionObject);
			scrollHandler();
		} else {
			setTimeout(sectionObject.checkLoad,100);
		}
	}
	sectionObject.checkLoad();
	setTimeout(function(sectionObject) {
		// sectionObject.position.y = sectionObject.count*screenWidthFromDistance(200);
		sectionObject.position.y = sectionObject.count * -1*screenWidthFromDistance(200);
	},100,sectionObject);
	return sectionObject;
}
