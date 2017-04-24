// var multiSearch = function() {
// 	var defaultSearchPlatform = "spotify";
// 	var select;

	
// 	return {
// 		Init: function() {
			
// 		}
// 	}
// }();

// $(function() {
// 	multiSearch.Init();
// })

$(function() {
	init();
	setTimeout(function() {
		$("video").each(function() {
			// this.pause();
		});
	},2000);
});

// if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var camera, scene, stage, renderer;
var mouseX = 0, prevMouseX = 0, mouseY = 0, mouseDown = false, mouseDirection;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var mouseDownCoord = new Object();
var sections = [], activeSection = 0, prevActiveSection = null, background = { light: { r:0, g:0, b:0 }, dark: { r:0, g:0, b:0 } };
function init() {

	setEnvironment();
	setLights();
	
	$("section").each(function(i,elm) {
		sections.push(addProject(elm,stage));
		sections[i].count=i;
	});
	$("section:first-child").find("video")[0].play();
	scrollHandler();
	animate();
}
function setLights() {
	var shadowMapSize = 1024;
	var groundGeometry = new THREE.PlaneGeometry( 1650, 1650, 1 );
	var groundMaterial = new THREE.ShadowMaterial();
	groundMaterial.opacity = 0.1;
	var ground = new THREE.Mesh(groundGeometry, groundMaterial);
	ground.receiveShadow = true;
	ground.rotation.x=55;
	ground.position.y=-30;
	ground.transparent = true;
	scene.add(ground);

	var light = new THREE.AmbientLight( 0x666666 ); // soft white light
	scene.add( light );



	var spotLight1 = new THREE.SpotLight( 0xffffff); 
	spotLight1.shadow.mapSize.height = shadowMapSize;
	spotLight1.shadow.mapSize.width = shadowMapSize;
	spotLight1.castShadow = false;
	spotLight1.position.set( 0, 55, 0 );
	spotLight1.intensity = .2;
	spotLight1.penumbra = 1;
	spotLight1.decay = 2;
	spotLight1.angle = .45;
	scene.add( spotLight1 );
	scene.add(spotLight1.target);

	var spotLight2 = new THREE.SpotLight( 0xFFFFFF); 
	spotLight2.castShadow = true;
	spotLight2.position.set( 0, 150, -0 ); 
	spotLight2.target.position.set( 0, 0, 0 );
	spotLight2.shadow.mapSize.height = shadowMapSize;
	spotLight2.shadow.mapSize.width = shadowMapSize;
	spotLight2.intensity = .1;
	spotLight2.exponent = .05;
	spotLight2.penumbra = 1;
	spotLight2.decay = 2;
	spotLight2.angle = de2ra(80);
	scene.add( spotLight2 );
	scene.add(spotLight2.target);


	// var shadowGeometry = new THREE.CubeGeometry( 35, 15, 1 );
	// var transpMaterial = new THREE.ShadowMaterial();
	// transpMaterial.opacity = 0.1;
	// var plane = new THREE.Mesh( shadowGeometry, transpMaterial );
	// plane.receiveShadow = true;
	// plane.position.z = -2.7;
	// scene.add( plane );
}

function scrollHandler() {
	scrollPercentage = $(".projects").scrollTop() / ($(".projects")[0].scrollHeight-$(window).innerHeight());
	activeSection = Math.floor(scrollPercentage * sections.length);
	if (activeSection == sections.length) activeSection -=1;
	if (activeSection != prevActiveSection) {
		console.log("starting section ",activeSection)
		sections[activeSection].start();
	}
	prevActiveSection = activeSection;
	stage.position.x=0-scrollPercentage*(screenWidthFromDistance(200)*(sections.length-1));
}
function setEnvironment() {
	var container = document.createElement( 'div' );
	container.setAttribute("class","content");
	document.getElementsByClassName('devices')[0].appendChild( container );

	camera = new THREE.PerspectiveCamera( setFOV(), window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.z = 120;
	console.log(camera)

	scene = new THREE.Scene();
	stage = new THREE.Group();
	scene.add(stage);
	$(".projects").bind("scroll",scrollHandler);
	
	var myAntialias=true;
	if (window.devicePixelRatio>1) {
		myAntialias=false;
	}
	renderer = new THREE.WebGLRenderer( {alpha: true, antialias: myAntialias });
	renderer.setClearColor( 0xff0000, 0 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled	= true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	container.appendChild( renderer.domElement );

	var element = renderer.domElement;
	element.style.position='absolute';
	window.addEventListener( 'resize', onWindowResize, false );
	animate();
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	overlay.width=window.innerWidth;
	overlay.height=window.innerHeight;
	camera.fov = setFOV();
	scrollHandler();
	for (i=0;i<sections.length;i++) {
		sections[i].updatePosition();
	}
}

var mousePosition = { x:0, y:0 };
document.addEventListener( 'mousemove', onDocumentMouseMove, false ); 
function onDocumentMouseMove( event ) {
	mouseX = windowHalfX - event.clientX;
	mouseY = windowHalfY - event.clientY;
	prevMouseX=mouseX;
	TweenMax.to(mousePosition, 1, {x: mouseX, y:mouseY});
}




function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	// var time = Date.now();

	camera.position.x = ( mousePosition.x - camera.position.x ) * 0.003;
	camera.position.y = (( - mousePosition.y - camera.position.y ) * 0.003);
	renderer.render( scene, camera );
}
	
	
function de2ra(degree) { 
	return degree*(Math.PI/180);
}
function screenWidthFromDistance(distance) {
	var aspect = window.innerWidth / window.innerHeight;
	var frustumHeight = 2.0 * distance * Math.tan(camera.fov * 0.5 * (Math.PI/180));
	var frustumWidth = frustumHeight * aspect;
	return frustumWidth;
}
function setFOV() {
	// var fov = map_range(window.innerWidth, 0, 100, 60, 305);
	fov = 40;

	return fov;	
}
function hexToRgb(r,t){var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r),a=function(){return void 0==this.alpha?"rgb("+this.r+", "+this.g+", "+this.b+")":(this.alpha>1?this.alpha=1:this.alpha<0&&(this.alpha=0),"rgba("+this.r+", "+this.g+", "+this.b+", "+this.alpha+")")};return void 0==t?n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16),toString:a}:null:(t>1?t=1:0>t&&(t=0),n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16),alpha:t,toString:a}:null)}
function rgbToHex(r,t,n){function a(r){var t=r.toString(16);return 1==t.length?"0"+t:t}if(void 0==t||void 0==n){if("string"==typeof r){var i=/^rgb[a]?\(([\d]+)[ \n]*,[ \n]*([\d]+)[ \n]*,[ \n]*([\d]+)[ \n]*,?[ \n]*([.\d]+)?[ \n]*\)$/i.exec(r);return rgbToHex(parseInt(i[1]),parseInt(i[2]),parseInt(i[3]))}return void 0==r.r||void 0==r.g||void 0==r.b?null:rgbToHex(r.r,r.g,r.b)}var e=r;return"#"+a(e)+a(t)+a(n)}
$(".controls a").click(function(e) {
	e.stopPropagation();
});

