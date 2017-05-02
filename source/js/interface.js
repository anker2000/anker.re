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
	// setTimeout(function() {
	// 	$("video").each(function() {
	// 		this.play();
	// 	});
	// },2000);
});

// if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var camera, scene, stage, renderer;
var mouseX = 0, prevMouseX = 0, mouseY = 0, mouseDown = false, mouseDirection;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var mouseDownCoord = new Object();
var sections = [], progression = 0, activeSection = 0, prevActiveSection = null, background = { light: { r:0, g:0, b:0 }, dark: { r:0, g:0, b:0 } };
function init() {

	setEnvironment();
	setLights();
	
	$("section").each(function(i,elm) {
		sections.push(addProject(elm,stage));
		sections[i].count=i;
	});
	// $("section:first-child").find("video")[0].play();
	scrollHandler();
	animate();
}

function getProximity(sectionNo) {
	var localScroll = $(".projects").scrollTop() / $(".projects")[0].scrollHeight;
	return (sectionNo) - (localScroll * sections.length);
}
function scrollHandler() {
	scrollPercentage = $(".projects").scrollTop() / ($(".projects")[0].scrollHeight-$(window).innerHeight());
	progression = scrollPercentage * sections.length;

	activeSection = Math.floor(progression);
	// if (progression>-0.5 && progression<i+0.5) {
	// }

	if (activeSection == sections.length) activeSection -=1;
	if (activeSection != prevActiveSection) {
		for (i=0;i<sections.length;i++) {
			if (i==activeSection) {
				// console.log("starting section ",activeSection)
				sections[activeSection].start();
			} else {
				sections[i].end();
			}
		}
	}
	var inProximity=[];
	for (i=0;i<sections.length;i++) {
		sections[i].proximity = getProximity(i);
		sections[i].updateRotation();
		// console.log(sections[i].name,sections[i].visible);
		// console.log(sections[i].name, sections[i].proximity);
		if (sections[i].proximity>-0.75 && sections[i].proximity<0.75) {
			// console.log(sections[i].name, "in proximity");
			// inProximity.push(sections[i]);
			sections[i].visible = true;
		} else {
			sections[i].visible = false;
		}
	}
	prevActiveSection = activeSection;
	var scrollTarget = 0-scrollPercentage*(screenWidthFromDistance(200)*(sections.length-1));
	// stage.position.x = scrollTarget;
	TweenMax.to(stage.position, 0.75, {ease: Power4.easeOut, x: scrollTarget});
}
function setEnvironment() {
	var container = document.createElement( 'div' );
	container.setAttribute("class","content");
	document.getElementsByClassName('devices')[0].appendChild( container );

	camera = new THREE.PerspectiveCamera( setFOV(), window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.z = 120;
	// cameraTrolley.position.z=120;
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
	// animate();
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	// overlay.width=window.innerWidth;
	// overlay.height=window.innerHeight;
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
	TweenMax.to(mousePosition, 2, {x: mouseX, y:mouseY, ease: Power1.easeOut});
}

TweenMax.ticker.addEventListener("tick",animate);


function animate() {
	// requestAnimationFrame( animate );
	render();
}

function render() {
	// var time = Date.now();
	// console.log(camera);
	if (typeof camera != "undefined") {
		camera.position.x = 0- ( mousePosition.x - camera.position.x ) * 0.003;
		camera.position.y = 0-(( - mousePosition.y - camera.position.y ) * 0.003);
		renderer.render( scene, camera );
	}
}
	
	
function de2ra(degree) { 
	return degree*(Math.PI/180);
}
function screenWidthFromDistance(distance) {
	var aspect = window.innerWidth / window.innerHeight;
	var frustumHeight = 1.75 * distance * Math.tan(camera.fov * 0.5 * (Math.PI/180));
	var frustumWidth = frustumHeight * aspect;
	return frustumWidth;
}
function setFOV() {
	// var fov = map_range(window.innerWidth, 0, 100, 60, 305);
	fov = 40;

	return fov;	
}

$(".controls a").click(function(e) {
	e.stopPropagation();
});

