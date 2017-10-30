var presentationMode=false;


$(function() {
	setTimeout(function() {
		init();
		animate();
	},2800);
	$(".carColor").each(function() {
		$("div.thumbnail",this).css("background","url(css/noise.png), linear-gradient(to bottom, "+$(this).data("car")+" 0%, "+$(this).data("background")+" 150%)");
		$(this).bind("click touchstart", function() {
			setColor($(this).data("car"),$(this).data("background"));
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
		});

	});
	window.addEventListener("keydown",keyLogger);
	if (presentationMode) setPresentationMode();
});
function keyLogger(e) {
	if (e.code=="KeyA") {
		$(".controls li.carColor:nth-child(1)").trigger("click");
	}
	if (e.code=="KeyS") {
		$(".controls li.carColor:nth-child(2)").trigger("click");
	}
	if (e.code=="KeyD") {
		$(".controls li.carColor:nth-child(3)").trigger("click");
	}
}
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	var container;
	var camera, scene, renderer, particles, geometry, materials = [], parameters, i, h, color, sprite, size;
	var mouseX = 0, prevMouseX = 0, mouseY = 0, mouseDown = false, mouseDirection;
	var car = new Object(), tweenRotation, carObject;
	var carObject;
	var idleTimeout, idle = true;
	var myRotation=new Object();
	myRotation.x=0;
	myRotation.y=0;
	car.rotation=myRotation;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	var mouseDownCoord = new Object();
	var shadowMapSize = 2048;

	setTimeout(function() {
		$(".fade h2").addClass("active");
	},300);
	function init() {

		container = document.createElement( 'div' );
		container.setAttribute("class","content");
		document.body.appendChild( container );

		camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
		camera.position.z = 7;
		camera.position.y = 1.05;
		camera.lookAt( 0, 0.4 );

		


		scene = new THREE.Scene();
		
		var loader = new THREE.JSONLoader();
		loader.load(
			// resource URL
			'models/q5-mix.json',
			// Function when resource is loaded
			function ( geometry, materials ) {
				var material = new THREE.MultiMaterial( materials );
				var object = new THREE.Mesh( geometry, material );
				scene.add( object );


				object.traverse( function ( child ) {
		        if ( child instanceof THREE.Mesh ) {
		            child.geometry.computeVertexNormals();
		        }
		        // setColorFast('#959ea6','#545e6c')
		    });

			setActive();
			// car = object;
			carObject = object;
			TweenMax.to(carObject.rotation, 3, {y:de2ra(-90),  ease:Power3.easeInOut});
			$(".background h1").addClass("active");
			object.castShadow = true;
			setColorFast('#727881','#545e6c');
			// console.log(carObject, "hey object");
			render();
			// setTimeout(render,1000);
			$(".fade").css("opacity",0);
			$(".fade h2").removeClass("active");
			var tween = TweenMax.fromTo(camera.position, 3,	{ y:0.5	}, { y:1.05 });
			setIdle();
			if (presentationMode) setPresentationMode();
		}
		
	);
		
	
		var light = new THREE.AmbientLight( 0x333333 ); // soft white light
		scene.add( light );


		var spotLight1 = new THREE.SpotLight( 0xEEEEEE); 
		spotLight1.castShadow = true;
		spotLight1.position.set( -12, 100, 0 ); 
		spotLight1.target.position.set( -12, 0, 0 );
		spotLight1.intensity = 0.3;
		spotLight1.exponent = 20;
		spotLight1.angle = de2ra(85);
		spotLight1.shadow.mapSize.height = shadowMapSize;
		spotLight1.shadow.mapSize.width = shadowMapSize;
		scene.add( spotLight1 );

		var spotLight2 = new THREE.SpotLight( 0xEEEEEE); 
		spotLight2.castShadow = true;
		spotLight2.position.set( 12, 100, 0 ); 
		spotLight2.target.position.set( 12, 0, 0 );
		spotLight2.intensity = 0.3;
		spotLight2.exponent = 20;
		spotLight2.angle = de2ra(85);
		spotLight2.shadow.mapSize.height = shadowMapSize;
		spotLight2.shadow.mapSize.width = shadowMapSize;
		scene.add( spotLight2 );

		var spotLight4 = new THREE.SpotLight( 0xEEEEEE); 
		spotLight4.castShadow = false;
		spotLight4.position.set( 0, 5, 20 ); 
		spotLight4.target.position.set( 0, 5, 0 );
		spotLight4.shadow.mapSize.height = shadowMapSize;
		spotLight4.shadow.mapSize.width = shadowMapSize;
		spotLight4.intensity = 0.12;
		spotLight4.exponent = 15;
		spotLight4.angle = de2ra(25);
		scene.add( spotLight4 );



		var geometry1 = new THREE.CubeGeometry( 35, 15, 1 );


		var transpMaterial = new THREE.ShadowMaterial();
		transpMaterial.opacity = 0.7;

		var plane = new THREE.Mesh( geometry1, transpMaterial );
		plane.receiveShadow = true;
		plane.rotation.x = de2ra(90);
		plane.position.y = -0.475;
		scene.add( plane );



		renderer = new THREE.WebGLRenderer( {alpha: true, antialias: true });
		renderer.setPixelRatio( window.devicePixelRatio);
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMap.enabled	= true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		container.appendChild( renderer.domElement );
		
		document.addEventListener('mousedown',mouseDownHandler);
		document.addEventListener('mouseup',mouseUpHandler);
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener('touchstart',onDocumentTouchStart);
		document.addEventListener('touchend',onDocumentTouchEnd);
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );
		window.addEventListener( 'resize', onWindowResize, false );
	}
	function mouseDownHandler(e) {
		console.log("mouse down start");
		setActive();
		if (e.target.tagName!="A") {
			// console.log(e);
			mouseDown=true;
			mouseDownCoord.x=e.clientX;
			mouseDownCoord.y=e.clientY;
			mouseDownCoord.rotation=car.rotation;
		}

	}
	function mouseUpHandler() {
		mouseDown=false;
		setIdle();
	}
	function onWindowResize() {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );
		render();
	}

	function onDocumentMouseMove( event ) {
		mouseX = event.clientX - mouseDownCoord.x;
		mouseY = event.clientY - mouseDownCoord.y;
		var directionChanged=false;
		if (mouseDown) {
			if (mouseX>prevMouseX) {
				if (mouseDirection=="left") directionChanged=true;
				mouseDirection="right";
			} else {
				if (mouseDirection=="right") directionChanged=true;
				mouseDirection="left";
			}
			if (directionChanged) {
				mouseDownCoord.x = event.clientX;
				mouseX=0;
			}
			prevMouseX=mouseX;
			TweenMax.to(carObject.rotation, 0.7, {y:(carObject.rotation.y+de2ra(mouseX/10)), ease:Power3.easeOut});

		}
	}

	function onDocumentTouchStart( e ) {
		console.log("mouse down start");
		setActive();
		if (e.target.tagName!="A" && e.touches.length === 1 ){
			e.preventDefault();
			// console.log(e);
			mouseDown=true;
			mouseDownCoord.x=e.touches[ 0 ].pageX;
			mouseDownCoord.y=e.touches[ 0 ].pageY;
			mouseDownCoord.rotation=car.rotation;
		}
	}
	function onDocumentTouchEnd( event ) {
		mouseDown=false;
		setIdle();
	}

	function onDocumentTouchMove( event ) {

		if ( event.touches.length === 1 ) {
			event.preventDefault();
			mouseX = event.touches[ 0 ].pageX - mouseDownCoord.x;
			mouseY = event.touches[ 0 ].pageY - mouseDownCoord.y;
			var directionChanged=false;
			if (mouseDown) {
				if (mouseX>prevMouseX) {
					if (mouseDirection=="left") directionChanged=true;
					mouseDirection="right";
				} else {
					if (mouseDirection=="right") directionChanged=true;
					mouseDirection="left";
				}
				if (directionChanged) {
					mouseDownCoord.x = event.clientX;
					mouseX=0;
				}
				prevMouseX=mouseX;
				TweenMax.to(carObject.rotation, 0.7, {y:(carObject.rotation.y+de2ra(mouseX/10)), ease:Power3.easeOut});

			}
		}

	}

	//

	function animate() {

		requestAnimationFrame( animate );
		render();
	}

	function render() {
		if (!idle) {
			var targetY = mouseX;
			try {

			} catch(e) {

			}
			renderer.render( scene, camera );
		}
		
	}
	function setColor(hex,hexbg) {

		setActive();
		document.body.style.backgroundColor=hexbg;
		var color = hexToRgb(hex);
		
		var rPercent=color.r/255;
		var gPercent=color.g/255;
		var bPercent=color.b/255;

		TweenMax.to(carObject.material.materials[9].color, 1.2, {r: rPercent, g: gPercent, b: bPercent });
		setIdle();
		render();
	}
	function setActive() {
		clearTimeout(idleTimeout);
		console.log("set active");
		idle=false;
	}
	function setIdle() {
		idleTimeout = setTimeout(function() {
			idle=true;
			console.log("set idle");
		},4000);		
	}
	function setColorFast(hex,hexbg) {
		document.body.style.backgroundColor=hexbg;
		var color = hexToRgb(hex);
		var rPercent=color.r/255;
		var gPercent=color.g/255;
		var bPercent=color.b/255;
		for (i=0;i<carObject.material.materials.length;i++) {
			if (carObject.material.materials[i].name=="CarPaint") {
				carObject.material.materials[i].color.r=rPercent;
				carObject.material.materials[i].color.g=gPercent;
				carObject.material.materials[i].color.b=bPercent;
			}

			if (carObject.material.materials[i].name=="Aluminum.001" || carObject.material.materials[i].name=="GlassLightsBump.001" || carObject.material.materials[i].name=="GlassLights.001") {
				carObject.material.materials[i].color.r=.8;
				carObject.material.materials[i].color.g=.8;
				carObject.material.materials[i].color.b=.8;
				carObject.material.materials[i].emissive.r=.2;
				carObject.material.materials[i].emissive.g=.2;
				carObject.material.materials[i].emissive.b=.3;
				carObject.material.materials[i].shininess=100;
				carObject.material.materials[i].emissiveIntensity=.5;
				carObject.material.materials[i].specular.r=1;
				carObject.material.materials[i].specular.g=1;
				carObject.material.materials[i].specular.b=1;
			}
			if (carObject.material.materials[i].name=="GlassRed.001") {
				carObject.material.materials[i].color.r=.5;
				carObject.material.materials[i].color.g=.0;
				carObject.material.materials[i].color.b=.0;
				carObject.material.materials[i].emissive.r=.3;
				carObject.material.materials[i].emissive.g=.0;
				carObject.material.materials[i].emissive.b=.0;
			}

		}
		
		render();
	}
function de2ra(degree) { 
	return degree*(Math.PI/180);
}
function setPresentationMode() {
	$("canvas, .controls, .background, .fade").css("-webkit-transform","scale(-1,1)");
	$("div, li, canvas").css("cursor","none");
}
function hexToRgb(r,t){var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r),a=function(){return void 0==this.alpha?"rgb("+this.r+", "+this.g+", "+this.b+")":(this.alpha>1?this.alpha=1:this.alpha<0&&(this.alpha=0),"rgba("+this.r+", "+this.g+", "+this.b+", "+this.alpha+")")};return void 0==t?n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16),toString:a}:null:(t>1?t=1:0>t&&(t=0),n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16),alpha:t,toString:a}:null)}function rgbToHex(r,t,n){function a(r){var t=r.toString(16);return 1==t.length?"0"+t:t}if(void 0==t||void 0==n){if("string"==typeof r){var i=/^rgb[a]?\(([\d]+)[ \n]*,[ \n]*([\d]+)[ \n]*,[ \n]*([\d]+)[ \n]*,?[ \n]*([.\d]+)?[ \n]*\)$/i.exec(r);return rgbToHex(parseInt(i[1]),parseInt(i[2]),parseInt(i[3]))}return void 0==r.r||void 0==r.g||void 0==r.b?null:rgbToHex(r.r,r.g,r.b)}var e=r;return"#"+a(e)+a(t)+a(n)}
$(".controls a").click(function(e) {
	e.stopPropagation();
});

