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
	
	setTimeout(function() {
		scrollHandler();
		animate();
		$("section").each(function(i,elm) {
			sections.push(addProject(elm,stage));
			sections[i].count=i;
		});
		// $("section:first-child").find("video")[0].play();
	},1000);

}

function getProximity(sectionNo) {
	if ($(".projects")[0].scrollHeight>$(".projects")[0].scrollWidth) {
		var localScroll = $(".projects").scrollTop() / $(".projects")[0].scrollHeight;
	} else {
		var localScroll = $(".projects").scrollLeft() / $(".projects")[0].scrollWidth;
	}
	return (sectionNo) - (localScroll * sections.length);
}
function scrollHandler() {
	if ($(".projects")[0].scrollHeight>$(".projects")[0].scrollWidth) {
		scrollPercentage = $(".projects").scrollTop() / ($(".projects")[0].scrollHeight-$(window).innerHeight());	
	} else {
		scrollPercentage = $(".projects").scrollLeft() / ($(".projects")[0].scrollWidth-$(window).innerWidth());
	}
	
	progression = scrollPercentage * sections.length;

	activeSection = Math.floor(progression);

	if (activeSection == sections.length) activeSection -=1;
	if (activeSection != prevActiveSection) {
		for (i=0;i<sections.length;i++) {
			if (i==activeSection) {
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
		
		if (sections[i].proximity>-0.75 && sections[i].proximity<0.75) {
			sections[i].visible = true;
		} else {
			sections[i].visible = false;
		}
	}
	prevActiveSection = activeSection;
	var scrollTarget = 0-scrollPercentage*(screenWidthFromDistance(200)*(sections.length-1));
	TweenMax.to(stage.position, 0.75, {ease: Power4.easeOut, x: scrollTarget});
}
function setEnvironment() {
	var pixelRatio = window.devicePixelRatio;
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


	
	var myAntialias=false;
	if (pixelRatio>1) {
		myAntialias=false;
	}

	renderer = new THREE.WebGLRenderer( {alpha: true, antialias: myAntialias });
	// renderer.setClearColor( 0xff0000, 0 );
	renderer.setClearColor( 0x000000, 0 );
	renderer.setPixelRatio( 2 );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled	= true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	container.appendChild( renderer.domElement );

	var element = renderer.domElement;
	element.style.position='absolute';
	window.addEventListener( 'resize', onWindowResize, false );
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

var storedMouse = { x:0, y:0 };
function onDocumentMouseMove( event ) {
	if (typeof event == "undefined") {
		var event = {
			clientX: storedMouse.x,
			clientY: storedMouse.y
		}
	}
	storedMouse.x = event.clientX;
	storedMouse.y = event.clientY;
	mouseX = windowHalfX - event.clientX;
	mouseY = windowHalfY - event.clientY;
	prevMouseX=mouseX;
	TweenMax.to(mousePosition, 2, {x: mouseX, y:mouseY, ease: Power1.easeOut});
	// $(".current_project.active h2").each(function() {
	// 	// console.log($(this).find("a")[0].getBoundingClientRect());
	// 	var bounds = $(this).find("a")[0].getBoundingClientRect();
	// 	// var bounds = {
	// 	// 	x1: $(this).offset().left,
	// 	// 	y1: $(this).offset().top+30,
	// 	// 	x2: $(this).offset().left+$(this).innerWidth(),
	// 	// 	y2: $(this).offset().top+$(this).innerHeight()+30
	// 	// }
	// 	// if (event.clientX>bounds.x1 && event.clientX<bounds.x2 && event.clientY>bounds.y1 && event.clientY<bounds.y2) {
	// 	if (event.clientX>bounds.left && event.clientX<bounds.right && event.clientY>bounds.top && event.clientY<bounds.bottom) {
	// 		$(this.parentNode).addClass("hover");
	// 		$(this.parentNode.ref).find("a").addClass("clickable");
	// 	} else {
	// 		$(this.parentNode).removeClass("hover");
	// 		$(this.parentNode.ref).find("a").removeClass("clickable");
	// 	}
	// })
}

TweenMax.ticker.addEventListener("tick",animate);
var hasData=false;
setTimeout(function() {
	hasData=true
},4000);
var pixelRatioSwitchCount=-1;
setInterval(fps.reset, 10000);
var windowInFocus=true;
$(window).focus(function() {
	windowInFocus=true;
	console.log("window in focus");
});
$(window).blur(function() {
	windowInFocus=false;
	console.log("window out of focus");
});

frameCount=0;
function animate() {
	if (!windowInFocus) {
		if (frameCount>3) {
			// console.log(frameCount);
			render();
			frameCount=0;
			pixelRatioSwitchCount=0;
		} 
	} else {
		render();
	}
	frameCount++;
	if (typeof renderer!="undefined" && windowInFocus) {
		if (renderer.getPixelRatio()<2 && !renderer.antialias) {
			renderer.antialias=true;
		} else {
			if (renderer.antialias && renderer.getPixelRatio()>=2) renderer.antialias=false;
		}
		fps.getFPS()
		if (pixelRatioSwitchCount<4 && hasData) {
			if (fps.average < 25) {
				if (renderer.getPixelRatio() != 1) {
					renderer.setPixelRatio( 1 );
					pixelRatioSwitchCount+=1;
				}
			} else if (fps.average < 35) {
				if (renderer.getPixelRatio() != 1.5) {
					console.log("set pixel ratio 1.5");
					renderer.setPixelRatio( 1.5 );
					pixelRatioSwitchCount+=1;
				}
			} else {
				if (renderer.getPixelRatio() != 2) {
					console.log("set pixel ratio 2");
					renderer.setPixelRatio( 2 );
					pixelRatioSwitchCount+=1;
				}
			}
		} else {
			if (hasData) {
				if (fps.average>25) {
					console.log("set pixel ratio 1.5");
					renderer.setPixelRatio( 1.5 );
				} else {
					renderer.setPixelRatio( 1 );
				}
			}
		}
	}
}

function render() {
	// var time = Date.now();
	// console.log(camera);
	if (typeof camera != "undefined") {
		camera.position.x = 0- ( mousePosition.x - camera.position.x ) * 0.003;
		camera.position.y = 4-(( - mousePosition.y - camera.position.y ) * 0.003);
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
	if (window.innerWidth<600) {
		fov=70;
	}
	return fov;	
}

$(".controls a").click(function(e) {
	e.stopPropagation();
});

