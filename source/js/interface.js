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
});

// if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var camera, scene, renderer;
var mouseX = 0, prevMouseX = 0, mouseY = 0, mouseDown = false, mouseDirection;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var mouseDownCoord = new Object();

function init() {

	setEnvironment();
	setLights();
	
	$("section").each(function() {
		addProject(this,scene);
	});

	animate();
}
function setLights() {
	var shadowMapSize = 512;
	var groundGeometry = new THREE.PlaneGeometry( 250, 250, 1 );
	var groundMaterial = new THREE.ShadowMaterial();
	groundMaterial.opacity = .3;
	var ground = new THREE.Mesh(groundGeometry, groundMaterial);
	ground.receiveShadow = true;
	ground.rotation.x=55;
	ground.position.y=-20;
	ground.transparent = true;
	scene.add(ground);

	var spotLight1 = new THREE.SpotLight( 0xffffff); 
	spotLight1.castShadow = false;
	spotLight1.position.set( 20, 55, 20 ); 
	spotLight1.target.position.set(00, 15, 0 );
	spotLight1.shadow.mapSize.height = shadowMapSize;
	spotLight1.shadow.mapSize.width = shadowMapSize;
	spotLight1.intensity = 0.15;
	spotLight1.penumbra = 1.5;
	spotLight1.decay = 2;
	spotLight1.angle = de2ra(25);
	scene.add( spotLight1 );

	var spotLight2 = new THREE.SpotLight( 0xFFFFFF); 
	spotLight2.castShadow = true;
	spotLight2.position.set( 0, 50, -10 ); 
	spotLight2.target.position.set( 0, 5, -10 );
	spotLight2.shadow.mapSize.height = 1024;
	spotLight2.shadow.mapSize.width = 1024;
	spotLight2.intensity = .15;
	spotLight2.exponent = .05;
	spotLight2.angle = de2ra(85);
	scene.add( spotLight2 );

	var shadowGeometry = new THREE.CubeGeometry( 35, 15, 1 );
	var transpMaterial = new THREE.ShadowMaterial();
	transpMaterial.opacity = 0.1;
	var plane = new THREE.Mesh( shadowGeometry, transpMaterial );
	plane.receiveShadow = true;
	plane.position.z = -2.7;
	scene.add( plane );
}


function setEnvironment() {
	var container = document.createElement( 'div' );
	container.setAttribute("class","content");
	document.getElementsByClassName('devices')[0].appendChild( container );

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 60;
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

	var element = renderer.domElement;
	window.addEventListener( 'resize', onWindowResize, false );
	animate();
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
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
	camera.position.y = ( - mousePosition.y - camera.position.y ) * 0.003;
	renderer.render( scene, camera );
}
	
	
function de2ra(degree) { 
	return degree*(Math.PI/180);
}
function screenWidthFromDistance(distance) {
	var aspect = window.innerWidth / window.innerHeight;
	var frustumHeight = 2.0 * distance * Math.tan(camera.fov * 0.5 * (Math.PI/180));
	var frustumWidth = frustumHeight * aspect;
	console.log(frustumWidth, frustumHeight);
	var factor = window.innerWidth/frustumWidth;
	return window.innerWidth * factor;
}
function hexToRgb(r,t){var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r),a=function(){return void 0==this.alpha?"rgb("+this.r+", "+this.g+", "+this.b+")":(this.alpha>1?this.alpha=1:this.alpha<0&&(this.alpha=0),"rgba("+this.r+", "+this.g+", "+this.b+", "+this.alpha+")")};return void 0==t?n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16),toString:a}:null:(t>1?t=1:0>t&&(t=0),n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16),alpha:t,toString:a}:null)}function rgbToHex(r,t,n){function a(r){var t=r.toString(16);return 1==t.length?"0"+t:t}if(void 0==t||void 0==n){if("string"==typeof r){var i=/^rgb[a]?\(([\d]+)[ \n]*,[ \n]*([\d]+)[ \n]*,[ \n]*([\d]+)[ \n]*,?[ \n]*([.\d]+)?[ \n]*\)$/i.exec(r);return rgbToHex(parseInt(i[1]),parseInt(i[2]),parseInt(i[3]))}return void 0==r.r||void 0==r.g||void 0==r.b?null:rgbToHex(r.r,r.g,r.b)}var e=r;return"#"+a(e)+a(t)+a(n)}
$(".controls a").click(function(e) {
	e.stopPropagation();
});

