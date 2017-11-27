$(function() {
	init();
});

var globalDistance = 200;
if ($(window).height()>$(window).width()) globalDistance = 300;

var snapWrapper = $(".projects");
var camera, scene, stage, renderer;
var mouseX = 0, prevMouseX = 0, mouseY = 0, mouseDown = false, mouseDirection;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var mouseDownCoord = new Object();
var sections = [], progression = 0, activeSection = 0, prevActiveSection = null, background = { light: { r:0, g:0, b:0 }, dark: { r:0, g:0, b:0 } };
function startSection() {
	$activeSection = $(".projects > section:nth-child("+(activeSection+1)+")"); 
  	$("a.cta").removeClass("off");
  	$("a.back").removeClass("off");
	$("a.cta, a.back").css("color",$activeSection.data("text-color"));
  	$("a.cta .arrow, a.back .arrow").css("background-color",$activeSection.data("text-color"));
}
function init() {
	var options = {
	  $menu: false,
	  menuSelector: 'a',
	  panelSelector: '> section',
	  namespace: '.panelSnap',
	  onSnapStart: function(){ 
	  	if (!$("body").hasClass("article")) $("a.cta").addClass("off") 
	  },
	  onSnapFinish: function(){  
	  	// console.log("snap finish"); 
	  	if (!$("body").hasClass("article")) startSection();
	  },
	  onActivate: function(){ 
	  	// console.log("snap activate");
	  },
	  directionThreshold: 10,
	  slideSpeed: 400,
	  delay: 0,
	  easing: 'swing',
	  offset: 0,
	  navigation: {
	    keys: {
	      nextKey: false,
	      prevKey: false,
	    },
	    buttons: {
	      $nextButton: false,
	      $prevButton: false,
	    },
	    wrapAround: false
	  }
	};

	snapWrapper.panelSnap(options);
	snapWrapper.bind("scroll",scrollHandler);

	setEnvironment();
	setLights();
	scrollHandler();
	animate();
	$(".projects section").each(function(i,elm) {
		sections.push(addProject(elm,stage,i));
	});
	$("a.cta").bind("click",goToCaseStudy);
	$("a.back").bind("click",goToFrontPage);
}

function getProximity(sectionNo) {
	
	var localScroll = snapWrapper.scrollTop() / snapWrapper[0].scrollHeight;
	
	return (sectionNo) - (localScroll * sections.length);
}
function scrollHandler() {
	if (!$("body").hasClass("article")) {
		scrollPercentage = snapWrapper.scrollTop() / (snapWrapper[0].scrollHeight-$("section",snapWrapper).height());	
		progression = scrollPercentage * sections.length;

		activeSection = Math.floor(progression);

		if (activeSection == sections.length) activeSection -=1;
		if (activeSection != prevActiveSection) {
			for (i=0;i<sections.length;i++) {
				if (i==activeSection) {
					sections[activeSection].start();
					for (no=0;no<sections[i].tween.length;no++) {
						sections[i].tween[no].resume();
					}
				} else {
					sections[i].end();
					for (no=0;no<sections[i].tween.length;no++) {
						sections[i].tween[no].pause();
					}
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
				sections[i].visible = true;
			}
		}
		prevActiveSection = activeSection;
		var scrollTarget = 0-scrollPercentage*(screenWidthFromDistance(globalDistance)*(sections.length-1));
		TweenMax.to(stage.position, 0.75, {ease: Power4.easeOut, y: -1*scrollTarget});
	}
}
function setEnvironment() {
	var pixelRatio = window.devicePixelRatio;
	if (pixelRatio==1) {
		pixelRatio=1.5;
	} else {
		pixelRatio=2;
	}
	var container = document.createElement( 'div' );
	container.setAttribute("class","content");
	document.getElementsByClassName('devices')[0].appendChild( container );

	camera = new THREE.PerspectiveCamera( setFOV(), window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.z = 115;
	camera.myTarget = new THREE.Vector3(0,50,0);

	camera.lookAt(camera.myTarget);

	scene = new THREE.Scene();
	stage = new THREE.Group();
	scene.add(stage);
	
	
	var myAntialias=false;
	if (pixelRatio>1) {
		myAntialias=false;
	}

	renderer = new THREE.WebGLRenderer( {alpha: true, antialias: myAntialias });
	// renderer.setClearColor( 0xff0000, 0 );
	renderer.setClearColor( 0x000000, 0 );
	renderer.setPixelRatio( pixelRatio );
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
	camera.fov = setFOV();
	scrollHandler();
	for (i=0;i<sections.length;i++) {
		sections[i].updatePosition();
	}
}
function kickOffSite() {
	if (!$("body").hasClass("loaded")) {
		TweenMax.to(camera.myTarget, 2, {x:0, y:0, z:0, delay:.7, ease:Power4.easeOut});
		setTimeout(function() {
			$("body").addClass("loaded");
			startSection();
		},2000);
		setTimeout(function() {
			sections[activeSection].updateRotation();
		},1000);
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
	TweenMax.to(mousePosition, 1, {x: mouseX, y:mouseY, ease: Power1.easeOut});
}

TweenMax.ticker.addEventListener("tick",function() {
	requestAnimationFrame(animate);
});
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
		if (frameCount>2) {
			// console.log(frameCount);
			render();
			frameCount=0;
			pixelRatioSwitchCount=0;
		} 
	} else {
		render();
	}
	frameCount++;
	// if (typeof renderer!="undefined" && windowInFocus) {
	// 	if (renderer.getPixelRatio()<2 && !renderer.antialias) {
	// 		renderer.antialias=true;
	// 	} else {
	// 		if (renderer.antialias && renderer.getPixelRatio()>=2) renderer.antialias=false;
	// 	}
	// 	fps.getFPS()
	// 	if (pixelRatioSwitchCount<4 && hasData) {
	// 		if (fps.average < 25) {
	// 			if (renderer.getPixelRatio() != 1) {
	// 				renderer.setPixelRatio( 1 );
	// 				pixelRatioSwitchCount+=1;
	// 			}
	// 		} else if (fps.average < 35) {
	// 			if (renderer.getPixelRatio() != 1.5) {
	// 				console.log("set pixel ratio 1.5");
	// 				renderer.setPixelRatio( 1.5 );
	// 				pixelRatioSwitchCount+=1;
	// 			}
	// 		} else {
	// 			if (renderer.getPixelRatio() != 2) {
	// 				console.log("set pixel ratio 2");
	// 				renderer.setPixelRatio( 2 );
	// 				pixelRatioSwitchCount+=1;
	// 			}
	// 		}
	// 	} else {
	// 		if (hasData) {
	// 			if (fps.average>25) {
	// 				console.log("set pixel ratio 1.5");
	// 				renderer.setPixelRatio( 1.5 );
	// 			} else {
	// 				renderer.setPixelRatio( 1 );
	// 			}
	// 		}
	// 	}
	// }
}

function render() {
	// var time = Date.now();
	// console.log(camera);
	if (typeof camera != "undefined") {
		camera.position.x = 0- ( mousePosition.x - camera.position.x ) * 0.009;
		camera.position.y = 0 - (( - mousePosition.y - camera.position.y ) * 0.009);
		camera.lookAt(camera.myTarget);
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

