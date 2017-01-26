var multiSearch = function() {
	var defaultSearchPlatform = "spotify";
	var select;

	
	return {
		Init: function() {
			
		}
	}
}();

$(function() {
	multiSearch.Init();
})

var presentationMode=false;
var doubleTapInterval, tapped = false;
var controls;
var intervalID;
$(function() {
	init();
	animate();	
});

// if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
	var container;
	var camera, scene, renderer, particles, geometry, materials = [], parameters, i, h, color, sprite, size, effect;
	var mouseX = 0, prevMouseX = 0, mouseY = 0, mouseDown = false, mouseDirection;
	var phone = new Object(), tweenRotation, phoneObject;
	var phoneObject, phoneGroup, newPhone, macbookGroup;
	var idleTimeout, idle = true;
	var myRotation=new Object();
	myRotation.x=0;
	myRotation.y=0;
	phone.rotation=myRotation;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	var mouseDownCoord = new Object();
	var shadowMapSize = 512;


	function init() {
		document.addEventListener( 'mousemove', onDocumentMouseMove, false ); 
		container = document.createElement( 'div' );
		container.setAttribute("class","content");
		document.getElementsByClassName('devices')[0].appendChild( container );

		setEnvironment();
		setLights();
		
		$("section").each(function() {
			addProject(this,scene);
		});
	}
function setLights() {
	var groundGeometry = new THREE.PlaneGeometry( 250, 250, 1 );
	var groundMaterial = new THREE.ShadowMaterial();
	groundMaterial.opacity = .3;
	var ground = new THREE.Mesh(groundGeometry, groundMaterial);
	ground.receiveShadow = true;
	ground.rotation.x=55;
	ground.position.y=-20;
	ground.transparent = true;
	scene.add(ground);

	var spotLight4 = new THREE.SpotLight( 0xffffff); 
	spotLight4.castShadow = false;
	spotLight4.position.set( 20, 55, 20 ); 
	spotLight4.target.position.set(00, 15, 0 );
	spotLight4.shadow.mapSize.height = shadowMapSize;
	spotLight4.shadow.mapSize.width = shadowMapSize;
	spotLight4.intensity = 0.15;
	spotLight4.penumbra = 1.5;
	// spotLight4.exponent = 15;
	spotLight4.decay = 2;
	spotLight4.angle = de2ra(25);
	scene.add( spotLight4 );

	var spotLight3 = new THREE.SpotLight( 0xFFFFFF); 
	spotLight3.castShadow = true;
	spotLight3.position.set( 0, 50, -10 ); 
	spotLight3.target.position.set( 0, 5, -10 );
	spotLight3.shadow.mapSize.height = 1024;
	spotLight3.shadow.mapSize.width = 1024;
	spotLight3.intensity = .15;
	spotLight3.exponent = .05;
	spotLight3.angle = de2ra(85);
	scene.add( spotLight3 );

	var geometry1 = new THREE.CubeGeometry( 35, 15, 1 );


	var transpMaterial = new THREE.ShadowMaterial();
	transpMaterial.opacity = 0.1;

	var plane = new THREE.Mesh( geometry1, transpMaterial );
	plane.receiveShadow = true;
	// plane.rotation.x = de2ra(90);
	plane.position.z = -2.7;
	scene.add( plane );
}


function setEnvironment() {
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 65;
	camera.position.y = 0;
	scene = new THREE.Scene();

	var myAntialias=true;
	if (window.devicePixelRatio>1) {
		myAntialias=false;
	}
	renderer = new THREE.WebGLRenderer( {alpha: true, antialias: myAntialias });
	renderer.setClearColor( 0x000000, 0 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled	= true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	container.appendChild( renderer.domElement );
	// renderer.domElement.style.webkitTransform='scale(.5) translate3d(-50%,-50%,0)';
	var element = renderer.domElement;
	window.addEventListener( 'resize', onWindowResize, false );
	camera.position.set(0, 0, 60);
	animate();
}

	function onWindowResize() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
		// effect.setSize( window.innerWidth, window.innerHeight );
		// render();
	}
	var mousePosition = { x:0, y:0 };
	function onDocumentMouseMove( event ) {
		mouseX = windowHalfX - event.clientX;
		mouseY = windowHalfY - event.clientY;
		prevMouseX=mouseX;
		TweenMax.to(mousePosition, 1, {x: mouseX, y:mouseY});

	}

	
	

	function animate() {
		// controls.update();
		requestAnimationFrame( animate );
		render();
	}

	function render() {
		var time = Date.now();

		camera.position.x = ( mousePosition.x - camera.position.x ) * 0.003;
		camera.position.y = ( - mousePosition.y - camera.position.y ) * 0.003;

		camera.lookAt( 0,0, 0 );
		// phone1.rotation.y += 0.03;
		// phone2.rotation.y -= 0.03;
		for ( i = 0; i < scene.children.length; i ++ ) {
			var object = scene.children[ i ];

			if ( object instanceof THREE.PointCloud ) {
				object.y = (time) * ( i < 4 ? i + 1 : - ( i + 1 ) );
			}

		}
		renderer.render( scene, camera );

	}
	
	
	
function de2ra(degree) { 
	return degree*(Math.PI/180);
}

function hexToRgb(r,t){var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r),a=function(){return void 0==this.alpha?"rgb("+this.r+", "+this.g+", "+this.b+")":(this.alpha>1?this.alpha=1:this.alpha<0&&(this.alpha=0),"rgba("+this.r+", "+this.g+", "+this.b+", "+this.alpha+")")};return void 0==t?n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16),toString:a}:null:(t>1?t=1:0>t&&(t=0),n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16),alpha:t,toString:a}:null)}function rgbToHex(r,t,n){function a(r){var t=r.toString(16);return 1==t.length?"0"+t:t}if(void 0==t||void 0==n){if("string"==typeof r){var i=/^rgb[a]?\(([\d]+)[ \n]*,[ \n]*([\d]+)[ \n]*,[ \n]*([\d]+)[ \n]*,?[ \n]*([.\d]+)?[ \n]*\)$/i.exec(r);return rgbToHex(parseInt(i[1]),parseInt(i[2]),parseInt(i[3]))}return void 0==r.r||void 0==r.g||void 0==r.b?null:rgbToHex(r.r,r.g,r.b)}var e=r;return"#"+a(e)+a(t)+a(n)}
$(".controls a").click(function(e) {
	e.stopPropagation();
});

