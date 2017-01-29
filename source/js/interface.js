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

var camera, scene, stage, renderer;
var mouseX = 0, prevMouseX = 0, mouseY = 0, mouseDown = false, mouseDirection, overlay, overlayCtx,underlay, underlayCtx;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var mouseDownCoord = new Object();
var sections = [];
function init() {

	setEnvironment();
	setLights();
	
	$("section").each(function(i,elm) {
		sections.push(addProject(elm,stage));
		sections[i].count=i;
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
	ground.position.y=-22;
	ground.transparent = true;
	scene.add(ground);

	var spotLight1 = new THREE.SpotLight( 0xffffff); 
	spotLight1.castShadow = false;
	spotLight1.position.set( 20, 55, 20 ); 
	spotLight1.target.position.set(0, 0, -10 );
	spotLight1.shadow.mapSize.height = shadowMapSize;
	spotLight1.shadow.mapSize.width = shadowMapSize;
	spotLight1.intensity = .45;
	spotLight1.penumbra = 1.5;
	spotLight1.decay = 2;
	spotLight1.angle = de2ra(15);
	scene.add( spotLight1 );
	scene.add(spotLight1.target);

	var spotLight2 = new THREE.SpotLight( 0xFFFFFF); 
	spotLight2.castShadow = true;
	spotLight2.position.set( 0, 50, -10 ); 
	// spotLight2.target.position.set( 0, 5, -10 );
	spotLight2.shadow.mapSize.height = 1024;
	spotLight2.shadow.mapSize.width = 1024;
	spotLight2.intensity = .15;
	spotLight2.exponent = .05;
	spotLight2.angle = de2ra(75);
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
	console.log(scrollPercentage);
	stage.position.x=0-scrollPercentage*(screenWidthFromDistance(60)*(sections.length-1));
}
function setEnvironment() {
	var container = document.createElement( 'div' );
	container.setAttribute("class","content");
	document.getElementsByClassName('devices')[0].appendChild( container );

	camera = new THREE.PerspectiveCamera( setFOV(), window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 60;


	scene = new THREE.Scene();
	stage = new THREE.Group();
	scene.add(stage);
	$(".projects").bind("scroll",scrollHandler);
	
	// var loader = new THREE.JSONLoader();
	// loader.load(
	// // resource URL
	// 'models/banana.json',
	// // Function when resource is loaded
	// function ( geometry, materials ) {
	// 	var material = new THREE.MultiMaterial( materials );
	// 	var object = new THREE.Mesh( geometry, material );
	// 	object.traverse( function ( child ) {
	//         if ( child instanceof THREE.Mesh ) {
	//             child.geometry.computeVertexNormals();
	//         }
	//     });
		
	// 	object.castShadow=true;
	// 	object.position.y=-22;
	// 	object.position.z=-20;
	// 	object.position.x= -45;
	// 	object.scale.set(3,3,3);
	// 	stage.add( object );
 //    });
	


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

	underlay = document.createElement('canvas');
	underlayCtx = underlay.getContext('2d');
	underlay.width=window.innerWidth;
	underlay.height=window.innerHeight;
	container.appendChild(underlay);

	overlay = document.createElement('canvas');
	overlayCtx = overlay.getContext('2d');
	overlay.width=window.innerWidth;
	overlay.height=window.innerHeight;
	overlay.style.position='absolute';
	overlay.style.top='1%';
	overlay.style.left='-1%';
	container.appendChild(overlay);

	var element = renderer.domElement;
	element.style.position='absolute';
	// element.style.zIndex='1000';
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
	camera.position.y = ( - mousePosition.y - camera.position.y ) * 0.003;
	renderer.render( scene, camera );
	
	// underlayCtx.clearRect(0,0, window.innerWidth, window.innerHeight);
	// underlayCtx.save();
       
 //    // Create a shape, of some sort
 //    underlayCtx.beginPath();
 //    underlayCtx.moveTo(window.innerWidth, 0);
 //    underlayCtx.lineTo(0, window.innerHeight);
 //    underlayCtx.lineTo(window.innerWidth, window.innerHeight);
 //    underlayCtx.lineTo(window.innerWidth, 0);
 //    underlayCtx.closePath();
 //    // Clip to the current path
 //    underlayCtx.clip();
	// underlayCtx.drawImage(renderer.domElement, 0, 0, window.innerWidth, window.innerHeight);
	// underlayCtx.restore();

	// overlayCtx.clearRect(0,0, window.innerWidth, window.innerHeight);
	// overlayCtx.save();
       
 //    // Create a shape, of some sort
 //    overlayCtx.beginPath();
 //    overlayCtx.moveTo(0, 0);
 //    overlayCtx.lineTo(window.innerWidth, 0);
 //    overlayCtx.lineTo(0, (window.innerHeight-30));
 //    overlayCtx.lineTo(0,0);
 //    overlayCtx.closePath();
 //    // Clip to the current path
 //    overlayCtx.clip();
	// overlayCtx.drawImage(renderer.domElement, 0, 0, window.innerWidth, window.innerHeight);
	// overlayCtx.restore();
	// renderer.domElement.style.display='none';
	// console.log(renderer.domElement);
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
	var fov = map_range(window.innerWidth, 375, 1440, 95, 60);
	if (fov<60) fov=60;
	if (fov>90) fov=90;
	return fov;	
}
function hexToRgb(r,t){var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r),a=function(){return void 0==this.alpha?"rgb("+this.r+", "+this.g+", "+this.b+")":(this.alpha>1?this.alpha=1:this.alpha<0&&(this.alpha=0),"rgba("+this.r+", "+this.g+", "+this.b+", "+this.alpha+")")};return void 0==t?n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16),toString:a}:null:(t>1?t=1:0>t&&(t=0),n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16),alpha:t,toString:a}:null)}function rgbToHex(r,t,n){function a(r){var t=r.toString(16);return 1==t.length?"0"+t:t}if(void 0==t||void 0==n){if("string"==typeof r){var i=/^rgb[a]?\(([\d]+)[ \n]*,[ \n]*([\d]+)[ \n]*,[ \n]*([\d]+)[ \n]*,?[ \n]*([.\d]+)?[ \n]*\)$/i.exec(r);return rgbToHex(parseInt(i[1]),parseInt(i[2]),parseInt(i[3]))}return void 0==r.r||void 0==r.g||void 0==r.b?null:rgbToHex(r.r,r.g,r.b)}var e=r;return"#"+a(e)+a(t)+a(n)}
$(".controls a").click(function(e) {
	e.stopPropagation();
});

