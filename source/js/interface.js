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
	var camera, scene, renderer, particles, geometry, materials = [], starMaterials = [], parameters, i, h, color, sprite, size, effect;
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
		document.body.appendChild( container );

		camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
		camera.position.z = 65;
		camera.position.y = 0;
		// camera.lookAt( 0, 0, -65 );

		scene = new THREE.Scene();
		
		var loader = new THREE.JSONLoader();
		phoneGroup = new THREE.Group();

		var screenGeometry = new THREE.PlaneGeometry( 0.55, 0.983, 1 );
		var mobileMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

		// var texture = THREE.ImageUtils.loadTexture( "css/screen.jpg" );
		// texture.repeat.set( 1, 1 );	
		// texture.anisotropy=2;

		mobileVideo = document.getElementById( 'mobile' );
		var mobileTexture = new THREE.VideoTexture( mobileVideo );
		mobileTexture.minFilter = THREE.LinearFilter;
		mobileTexture.magFilter = THREE.LinearFilter;
		mobileTexture.format = THREE.RGBFormat;
		mobileTexture.wrapS = THREE.ClampToEdgeWrapping;
		mobileTexture.wrapT = THREE.ClampToEdgeWrapping;
		// texture.anisotropy=2;

		mobileMaterial.map = mobileTexture;
		// screenMaterial.color = "#ffffff";

		var screen = new THREE.Mesh( screenGeometry, mobileMaterial );
		screen.receiveShadow = false;
		// screen.rotation.x = de2ra(90);
		screen.position.z = 0.0292;
		screen.position.y = 0.05;




		
		
		screen.receiveShadow = false;
		// screen.rotation.x = de2ra(90);
		screen.position.z = 0.0292;
		screen.position.y = 0.05;

		phoneGroup.add( screen );
		
		
		var glassMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff  });
		glassMaterial.specular.r=1;
		glassMaterial.specular.g=1;
		glassMaterial.specular.b=1;
		glassMaterial.transparent = true;
		glassMaterial.opacity = 0.1;
		glassMaterial.shininess = 0.2;

		var glass = new THREE.Mesh( screenGeometry, glassMaterial );
		glass.receiveShadow = true;
		glass.position.z = 0.0293;
		glass.position.y = 0.05;
		glass.transparent = true;


		var groundGeometry = new THREE.PlaneGeometry( 250, 250, 1 );
		var groundMaterial = new THREE.ShadowMaterial();

		groundMaterial.opacity = .3;

		var ground = new THREE.Mesh(groundGeometry, groundMaterial);
		ground.receiveShadow = true;
		ground.rotation.x=55;
		ground.position.y=-20;
		ground.transparent = true;

		scene.add(ground);
		phoneGroup.add(glass);

		loader.load(
			// resource URL
			'models/phone.json',
			// Function when resource is loaded
			function ( geometry, materials ) {
				var material = new THREE.MultiMaterial( materials );
				var object = new THREE.Mesh( geometry, material );
				// scene.add( object );
				
				object.position.y=-0.6;
				object.castShadow=true;
				object.traverse( function ( child ) {
		        if ( child instanceof THREE.Mesh ) {
		            child.geometry.computeVertexNormals();
		        }
		        phoneGroup.position.y=-5;
		        phoneGroup.position.z=-1;
		        for (i=0;i<object.material.materials.length;i++) {
		        	var tC = .75;
		        	object.material.materials[i].side=2;
					object.material.materials[i].specular.r=tC;
					object.material.materials[i].specular.g=tC;
					object.material.materials[i].specular.b=tC;	
					object.material.materials[i].emissive.r=.0;
					object.material.materials[i].emissive.g=.0;
					object.material.materials[i].emissive.b=.0;
					object.material.materials[i].shininess=10;	
		        }
		       
		  
				phoneGroup.add( object );
				
		    });

			phoneObject = object;

			phoneGroup.position.z=0;
			phoneGroup.position.y=-1;
			phoneGroup.scale.set( 25, 25, 25 );
			phoneGroup.castShadow = true;

			phone1 = phoneGroup.clone();
			phone1.position.x=-25;
			phone1.position.z = -20;
			
			phone2 = phoneGroup.clone();
			phone2.position.x=25;
			phone2.position.z = -20;
			// scene.add(phone1);
			// scene.add(phone2);

			TweenMax.to(phoneGroup.rotation, 1.5, {y:de2ra(0),  ease:Power4.easeOut});

			var tween = TweenMax.to(phoneGroup.position, 3.5,{ y:0, yoyo:true, repeat:-1, onRepeat:repeatFunc, ease:Power2.easeInOut, onComplete:function() {}});
			setTimeout(function() {
				var tween = TweenMax.to(phone1.position, 3.5,{ y:0, yoyo:true, repeat:-1, onRepeat:repeatFunc, ease:Power2.easeInOut, onComplete:function() {}});
			},1500);
			setTimeout(function() {
				var tween = TweenMax.to(phone2.position, 3.5,{ y:0, yoyo:true, repeat:-1, onRepeat:repeatFunc, ease:Power2.easeInOut, onComplete:function() {}});
			},3000);
			function repeatFunc() {

			}
		}
		
	);
	macbookGroup = new THREE.Group();
	var macbookScreenGroup = new THREE.Object3D();
	loader.load(
			// resource URL
			'models/screen.json',
			// Function when resource is loaded
			function ( geometry, materials ) {
				var material = new THREE.MultiMaterial( materials );
				var object = new THREE.Mesh( geometry, material );
				// scene.add( object );
				
				object.position.y=0;
				object.position.x=-0.5;
				object.position.z=0;
				// object.rotation.y=de2ra(180);
				
				object.castShadow=true;
				object.traverse( function ( child ) {
		        if ( child instanceof THREE.Mesh ) {
		            child.geometry.computeVertexNormals();
		        }
		        for (i=0;i<object.material.materials.length;i++) {
		        	var tC = .75;
		        	object.material.materials[i].side=2;
					object.material.materials[i].specular.r=tC;
					object.material.materials[i].specular.g=tC;
					object.material.materials[i].specular.b=tC;	
					object.material.materials[i].emissive.r=.0;
					object.material.materials[i].emissive.g=.0;
					object.material.materials[i].emissive.b=.0;
					object.material.materials[i].shininess=1;	
		        }
				macbookScreenGroup.add( object );
		    });
		}
	);
	var desktopMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
	desktopVideo = document.getElementById( 'desktop' );
	var desktopTexture = new THREE.VideoTexture( desktopVideo );
	desktopTexture.minFilter = THREE.LinearFilter;
	desktopTexture.magFilter = THREE.LinearFilter;
	desktopTexture.format = THREE.RGBFormat;
	desktopTexture.wrapS = THREE.ClampToEdgeWrapping;
	desktopTexture.wrapT = THREE.ClampToEdgeWrapping;

	desktopMaterial.map = desktopTexture;
	
	var desktopGeometry = new THREE.PlaneGeometry( 8.7, 5.8, 1 );

	var desktopScreen = new THREE.Mesh( desktopGeometry, desktopMaterial );
	desktopScreen.position.z = -3;
	desktopScreen.position.y = 3.3;
	desktopScreen.rotation.x = de2ra(1);
	macbookScreenGroup.add(desktopScreen);

	var desktopGlass = new THREE.Mesh(desktopGeometry, glassMaterial);
	desktopGlass.receiveShadow = true;
	desktopGlass.position.z = -3;
	desktopGlass.position.y = 3.3;
	desktopGlass.rotation.x = de2ra(1);
	desktopGlass.transparent = false;
	macbookScreenGroup.add(desktopGlass);

	var macbookPivot = new THREE.Object3D();
	var tempgeometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
	var tempmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );	
	mesh = new THREE.Mesh( tempgeometry, tempmaterial );
	macbookPivot.add( mesh );
	
	macbookScreenGroup.position.z=3;
	macbookPivot.add(macbookScreenGroup);
	macbookPivot.position.z=-3;
	macbookPivot.rotation.x=de2ra(90);
	var openLid = TweenMax.to(macbookPivot.rotation, 2, { x:0, ease:Power4.easeInOut});
	macbookGroup.add(macbookPivot);

	loader.load(
			// resource URL
			'models/keyboard.json',
			// Function when resource is loaded
			function ( geometry, materials ) {
				var material = new THREE.MultiMaterial( materials );
				var object = new THREE.Mesh( geometry, material );
				// scene.add( object );
				
				object.position.y=0;
				object.position.x=-0.5;
				object.position.z=0;
				
				object.castShadow=true;
				object.traverse( function ( child ) {
		        if ( child instanceof THREE.Mesh ) {
		            child.geometry.computeVertexNormals();
		        }
		        for (i=0;i<object.material.materials.length;i++) {
		        	var tC = .75;
		        	object.material.materials[i].side=2;
					object.material.materials[i].specular.r=tC;
					object.material.materials[i].specular.g=tC;
					object.material.materials[i].specular.b=tC;	
					object.material.materials[i].emissive.r=.0;
					object.material.materials[i].emissive.g=.0;
					object.material.materials[i].emissive.b=.0;
					object.material.materials[i].shininess=1.5;	
		        }
				macbookGroup.add( object );
		    });
		}
		
	);
	loader.load(
			// resource URL
			'models/keys.json',
			// Function when resource is loaded
			function ( geometry, materials ) {
				var material = new THREE.MultiMaterial( materials );
				var object = new THREE.Mesh( geometry, material );
				// scene.add( object );
				
				object.position.y=0;
				object.position.x=-0.5;
				object.position.z=0;
				
				object.castShadow=true;
				object.traverse( function ( child ) {
		        if ( child instanceof THREE.Mesh ) {
		            child.geometry.computeVertexNormals();
		        }
		        for (i=0;i<object.material.materials.length;i++) {
		        	var tC = .75;
		        	object.material.materials[i].side=2;
					object.material.materials[i].specular.r=tC;
					object.material.materials[i].specular.g=tC;
					object.material.materials[i].specular.b=tC;	
					object.material.materials[i].emissive.r=.0;
					object.material.materials[i].emissive.g=.0;
					object.material.materials[i].emissive.b=.0;
					object.material.materials[i].shininess=21;	
		        }
				macbookGroup.add( object );
		    });
		}
		
	);
	

	// scene.add( phoneGroup );

	macbookGroup.position.y=-10;
	macbookGroup.position.z=10;
	macbookGroup.scale.set(4,4,4);
	scene.add(macbookGroup);

	
	var tween1 = TweenMax.to(macbookGroup.position, 3.5,{ y:-9, yoyo:true, repeat:-1, ease:Power2.easeInOut, onComplete:function() {}});
	


	var spotLight4 = new THREE.SpotLight( 0xffffff); 
	spotLight4.castShadow = false;
	spotLight4.position.set( 20, 35, 20 ); 
	spotLight4.target.position.set(00, 15, 0 );
	spotLight4.shadow.mapSize.height = shadowMapSize;
	spotLight4.shadow.mapSize.width = shadowMapSize;
	spotLight4.intensity = 0.20;
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


	var myAntialias=true;
	// if (window.devicePixelRatio>1) {
	// 	myAntialias=false;
	// }

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
	camera.position.set(0, 0, 65);
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

