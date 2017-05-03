function addPhone(e,a,o,s,r,t,n,l,m){var d=new $.Deferred,E=new THREE.Group,p=new THREE.PlaneGeometry(.55,1,1),c=new THREE.Mesh(p,o);c.receiveShadow=!1,c.position.z=.022,c.position.y=.05,E.add(c);var h=new THREE.Mesh(p,s);return h.receiveShadow=!1,h.position.z=.0225,h.position.y=.05,E.add(h),n.load("models/iphones7.json",function(o,s){var r=new THREE.MultiMaterial(s),t=new THREE.Mesh(o,r);t.position.y=-.6,t.castShadow=!0,t.receiveShadow=!0,E.add(t),t.traverse(function(e){for(E.position.y=-5,E.position.z=-1,i=0;i<t.material.materials.length;i++){t.material.materials[i].emissive.r=l.r/255,t.material.materials[i].emissive.g=l.g/255,t.material.materials[i].emissive.b=l.b/255,t.material.materials[i].color.r=m.r/255,t.material.materials[i].color.g=m.g/255,t.material.materials[i].color.b=m.b/255}}),n.load("models/iphone-back.json",function(o,s){var r=new THREE.MultiMaterial(s),t=new THREE.Mesh(o,r);t.position.y=-.6,t.castShadow=!0,t.receiveShadow=!0,E.add(t),t.traverse(function(o){for(o.geometry.computeVertexNormals(),E.position.y=-5,E.position.z=-1,i=0;i<t.material.materials.length;i++){t.material.materials[i].emissive.r=l.r/255,t.material.materials[i].emissive.g=l.g/255,t.material.materials[i].emissive.b=l.b/255,t.material.materials[i].color.r=m.r/255,t.material.materials[i].color.g=m.g/255,t.material.materials[i].color.b=m.b/255,t.material.materials[i].shininess=10}E.position.z=a.z,E.position.y=a.y,E.position.x=a.x,E.scale.set(30,30,30),E.castShadow=!0,E.rotation.x=e.x,E.rotation.y=e.y,E.rotation.z=e.z,d.resolve(E)})})}),d.promise()}function addLaptop(e,a,o,s,r,t,n,l){var m=new $.Deferred,d=new THREE.Group,E=new THREE.Object3D,p=(new THREE.TextureLoader).load("models/macbook-texture.png");p.wrapS=THREE.RepeatWrapping,p.wrapT=THREE.RepeatWrapping,p.repeat.set(12,12);var c=new THREE.MeshStandardMaterial({side:THREE.DoubleSide,color:16777215,metalness:.5,roughness:1,map:p,roughnessMap:p}),h=new THREE.Object3D;return t.load("models/screen-back.json",function(n,l){var w=new THREE.Mesh(n,c);w.position.y=0,w.position.x=-.5,w.position.z=0,w.castShadow=!0,w.traverse(function(e){E.add(w)}),console.log("loaded screen back 1"),t.load("models/screen-front.json",function(n,l){var c=new THREE.MeshStandardMaterial({side:THREE.DoubleSide,color:2236962,emissive:0,metalness:.7,roughness:.2,envMap:r}),w=new THREE.Mesh(n,c);w.position.y=0,w.position.x=-.5,w.position.z=0;var v={r:0,g:0,b:0};w.castShadow=!0,E.add(w);var g=new THREE.PlaneGeometry(8.7,5.8,1),u=new THREE.Mesh(g,o);u.position.z=-3.16,u.position.y=3.3,u.rotation.x=de2ra(1),E.add(u);var R=new THREE.Mesh(g,s);R.receiveShadow=!0,R.position.z=-3.16,R.position.y=3.3,R.rotation.x=de2ra(1),E.add(R);var T=new THREE.BoxBufferGeometry(200,200,200),H=new THREE.MeshBasicMaterial({color:16777215});mesh=new THREE.Mesh(T,H),E.position.z=3.1,h.add(E),h.position.z=-3,h.position.y=0,h.rotation.x=de2ra(90),d.add(h),console.log("loaded screen front 2"),t.load("models/keyboard.json",function(s,r){var n=new THREE.MeshStandardMaterial({side:THREE.DoubleSide,color:16777215,metalness:.2,roughness:1,map:p,roughnessMap:p}),l=new THREE.Mesh(s,n);l.position.x=-.5,l.castShadow=!0,d.add(l),console.log("loaded keyboard 3"),t.load("models/keys.json",function(s,r){var n=new THREE.MultiMaterial(r),l=new THREE.Mesh(s,n);l.position.y=.005,l.position.x=-.5,l.position.z=0,l.castShadow=!1;var E={r:0,g:0,b:0},p=E;for(i=0;i<l.material.materials.length;i++){l.material.materials[i].side=THREE.DoubleSide,l.material.materials[i].specular.r=E.r/255,l.material.materials[i].specular.g=E.g/255,l.material.materials[i].specular.b=E.b/255,l.material.materials[i].emissive.r=p.r/255,l.material.materials[i].emissive.g=p.g/255,l.material.materials[i].emissive.b=p.b/255,l.material.materials[i].shininess=21}d.add(l),console.log("loaded keys 4"),t.load("models/keys-top.json",function(s,r){var t=new THREE.MultiMaterial(r),n=new THREE.Mesh(s,t);n.position.y=.005,n.position.x=-.5,n.position.z=0,n.castShadow=!0;var l={r:15,g:15,b:15},E={r:25,g:25,b:25};for(i=0;i<n.material.materials.length;i++){n.material.materials[i].side=THREE.DoubleSide,n.material.materials[i].specular.r=l.r/255,n.material.materials[i].specular.g=l.g/255,n.material.materials[i].specular.b=l.b/255,n.material.materials[i].emissive.r=E.r/255,n.material.materials[i].emissive.g=E.g/255,n.material.materials[i].emissive.b=E.b/255,n.material.materials[i].shininess=21}d.scale.set(6.25,6.25,6.25),d.add(n),console.log(a),d.position.z=a.z,d.position.y=a.y,d.position.x=a.x,d.rotation.x=e.x,d.rotation.y=e.y,d.rotation.z=e.z,d.screen=h,console.log("screenMaterial",o),console.log("loaded keys top 5"),m.resolve(d)})})})})}),m.promise()}
function addProject(e,o){function n(){a.screenWidth=screenWidthFromDistance(camera.position.z),console.log(a.screenWidth)}var i=new THREE.Group,a={};$(window).bind("resize",n),n();var d=new THREE.JSONLoader,s=new THREE.MeshBasicMaterial({color:16777215}),c=$(e).find("video")[0],l=(new THREE.CubeTextureLoader).load(["models/environment2.jpg","models/environment2.jpg","models/environment2.jpg","models/environment2.jpg","models/environment2.jpg","models/environment2.jpg"]);l.format=THREE.RGBFormat;var h=new THREE.VideoTexture(c);h.minFilter=THREE.LinearFilter,h.magFilter=THREE.LinearFilter,h.format=THREE.RGBFormat,h.wrapS=THREE.ClampToEdgeWrapping,h.wrapT=THREE.ClampToEdgeWrapping,s.map=h;var p=new THREE.MeshBasicMaterial({color:3355443}),u=new THREE.MeshPhongMaterial({color:16777215});u.specular.r=1,u.specular.g=1,u.specular.b=1,u.transparent=!0,u.opacity=.05,u.shininess=20,u.envMap=l,u.reflectivity=5,u.combine=THREE.MixOperation;var y=hexToRgb($(e).data("device-light")),m=hexToRgb($(e).data("device-dark"));if(i.video=c,i.elm=e,i.name=$(e).find("h2").html(),i.tween=[],i.loaded=0,$(e).hasClass("mobile")){var g=new THREE.Group;addPhone({x:de2ra(60),y:de2ra(-140),z:de2ra(30)},{x:-10,y:10,z:-10},p,u,l,c,d,m,y).done(function(e){e.startRotationPoint=60,g.add(e),i.loaded+=.333333,i.tween.push(TweenMax.to(e.position,3.5,{y:e.position.y-1,yoyo:!0,repeat:-1,delay:0,ease:Power2.easeInOut,onComplete:function(){}}))}),addPhone({x:de2ra(50),y:de2ra(35),z:de2ra(-80)},{x:15,y:7,z:-10},s,u,l,c,d,m,y).done(function(e){i.tween.push(TweenMax.to(e.position,3.5,{y:e.position.y-1,yoyo:!0,repeat:-1,delay:.5,ease:Power2.easeInOut,onComplete:function(){}})),e.startRotationPoint=50,g.add(e),i.loaded+=.333333}),addPhone({x:de2ra(120),y:de2ra(0),z:de2ra(-60)},{x:45,y:-5,z:-10},p,u,l,c,d,m,y).done(function(e){i.tween.push(TweenMax.to(e.position,3.5,{y:e.position.y-1,yoyo:!0,repeat:-1,delay:1.5,ease:Power2.easeInOut,onComplete:function(){}})),e.startRotationPoint=120,g.add(e),i.loaded+=.333333}),g.position.y=5,g.position.z=15,g.position.x=-12,g.begin=function(){},g.end=function(){},g.startRotationPoint=12,i.add(g)}else $(e).hasClass("desktop")&&addLaptop({x:de2ra(15),y:de2ra(65),z:de2ra(-7)},{x:10,y:-10,z:0},s,u,l,d,m,y).done(function(e){i.loaded=1,e.startRotationPoint=65,e.begin=function(){console.log("macbook open");TweenMax.to(e.screen.rotation,1,{x:-de2ra(20),delay:.75,ease:Power4.easeInOut})},e.end=function(){TweenMax.to(e.screen.rotation,1,{x:de2ra(90),ease:Power4.easeInOut})},i.add(e),i.tween.push(TweenMax.to(e.position,3.5,{y:e.position.y-1,yoyo:!0,repeat:-1,ease:Power2.easeInOut,onComplete:function(){}})),scrollHandler(),i.kickstart&&i.children[0].begin()});return i.updateRotation=function(){if(Math.abs(this.proximity)<.1)for(this.video.play(),t=0;t<this.tween.length;t++)this.tween[t].play();else for(this.video.pause(),t=0;t<this.tween.length;t++)this.tween[t].pause();try{if(this.name,this.type,"Group"==this.children[0].children[0].type){var e=this.children[0].startRotationPoint+90*this.proximity;for(r=0;r<this.children[0].children.length;r++)this.children[0].children[r].rotation.x=de2ra(this.children[0].children[r].startRotationPoint+60*this.proximity)}else var e=this.children[0].startRotationPoint+10*this.proximity;this.children[0].rotation.y=de2ra(e)}catch(e){}},i.updatePosition=function(){this.position.x=this.count*screenWidthFromDistance(200)},i.start=function(){"undefined"==typeof i.children[0]?i.kickstart=!0:i.children[0].begin(),$("body").css("background",$(e).data("bg-dark")),$("body").css("color",$(e).data("text-color")),mainLight.color=rgbPercentage(hexToRgb($(e).data("bg-dark")));var t=colorIntensity(hexToRgb($(e).data("bg-light")));TweenMax.to(groundMaterial,1,{opacity:map_range(t,0,1,.3,.04),onComplete:function(){}})},i.end=function(){"object"==typeof i.children[0]&&i.children[0].end()},o.add(i),i.checkLoad=function(){i.loaded>.98?(animateText.register(i),$(".devices canvas").css("opacity",1),scrollHandler()):setTimeout(i.checkLoad,100)},i.checkLoad(),setTimeout(function(e){e.position.x=e.count*screenWidthFromDistance(200)},100,i),i}
var animateText=function(){function e(e){n(e)}function n(e){var n=$(e.headline);n.each(function(n,t){if(Math.abs(e.proximity<.15)){var o=map_range(Math.abs(e.proximity),0,.15,1,0);TweenMax.to(t.parentNode,.5,{opacity:o,onComplete:function(){}})}else{var o=0;TweenMax.to(t.parentNode,.5,{opacity:o,onComplete:function(){}})}TweenMax.to(t,5,{y:30*Math.abs(e.proximity),ease:Power4.easeOut,onComplete:function(){}})})}var t=this;return{register:function(n){t.obj=n,n.proximity=.25;var o=document.createElement("div");o.className="current_project",document.body.appendChild(o);var a=document.createElement("h2");a.innerHTML="<span>"+n.name+"</span>",o.appendChild(a),n.headline=a;var i=document.createElement("button");i.innerHTML="See more",$(".current_project h2").scalem(),$(".projects").bind("scroll",function(){e(n)}),e(n),setTimeout(e,1e3,n)},animateHeadline:function(e,n){var t=e.headline;n&&console.log(t)},render:function(){for(i=0;i<sections.length;i++)e(sections[i])}}}();
function init(){setEnvironment(),$("section").each(function(e,n){sections.push(addProject(n,stage)),sections[e].count=e}),setLights(),scrollHandler(),animate()}function getProximity(e){var n=$(".projects").scrollTop()/$(".projects")[0].scrollHeight;return e-n*sections.length}function scrollHandler(){if(scrollPercentage=$(".projects").scrollTop()/($(".projects")[0].scrollHeight-$(window).innerHeight()),progression=scrollPercentage*sections.length,activeSection=Math.floor(progression),activeSection==sections.length&&(activeSection-=1),activeSection!=prevActiveSection)for(i=0;i<sections.length;i++)i==activeSection?sections[activeSection].start():sections[i].end();for(i=0;i<sections.length;i++)sections[i].proximity=getProximity(i),sections[i].updateRotation(),sections[i].proximity>-.75&&sections[i].proximity<.75?sections[i].visible=!0:sections[i].visible=!1;prevActiveSection=activeSection;var e=0-scrollPercentage*(screenWidthFromDistance(200)*(sections.length-1));TweenMax.to(stage.position,.75,{ease:Power4.easeOut,x:e})}function setEnvironment(){var e=document.createElement("div");e.setAttribute("class","content"),document.getElementsByClassName("devices")[0].appendChild(e),camera=new THREE.PerspectiveCamera(setFOV(),window.innerWidth/window.innerHeight,1,5e3),camera.position.z=120,console.log(camera),scene=new THREE.Scene,stage=new THREE.Group,scene.add(stage),$(".projects").bind("scroll",scrollHandler);var n=!0;window.devicePixelRatio>1&&(n=!1),renderer=new THREE.WebGLRenderer({alpha:!0,antialias:n}),renderer.setClearColor(16711680,0),renderer.setPixelRatio(window.devicePixelRatio),renderer.setSize(window.innerWidth,window.innerHeight),renderer.shadowMap.enabled=!0,renderer.shadowMap.type=THREE.PCFSoftShadowMap,e.appendChild(renderer.domElement);var i=renderer.domElement;i.style.position="absolute",window.addEventListener("resize",onWindowResize,!1)}function onWindowResize(){for(windowHalfX=window.innerWidth/2,windowHalfY=window.innerHeight/2,camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight),camera.fov=setFOV(),scrollHandler(),i=0;i<sections.length;i++)sections[i].updatePosition()}function onDocumentMouseMove(e){mouseX=windowHalfX-e.clientX,mouseY=windowHalfY-e.clientY,prevMouseX=mouseX,TweenMax.to(mousePosition,2,{x:mouseX,y:mouseY,ease:Power1.easeOut})}function animate(){render()}function render(){"undefined"!=typeof camera&&(camera.position.x=0-.003*(mousePosition.x-camera.position.x),camera.position.y=4-.003*(-mousePosition.y-camera.position.y),renderer.render(scene,camera))}function de2ra(e){return e*(Math.PI/180)}function screenWidthFromDistance(e){var n=window.innerWidth/window.innerHeight,i=1.75*e*Math.tan(.5*camera.fov*(Math.PI/180)),o=i*n;return o}function setFOV(){return fov=40,window.innerWidth<600&&(fov=70),fov}$(function(){init()});var camera,scene,stage,renderer,mouseX=0,prevMouseX=0,mouseY=0,mouseDown=!1,mouseDirection,windowHalfX=window.innerWidth/2,windowHalfY=window.innerHeight/2,mouseDownCoord=new Object,sections=[],progression=0,activeSection=0,prevActiveSection=null,background={light:{r:0,g:0,b:0},dark:{r:0,g:0,b:0}},mousePosition={x:0,y:0};document.addEventListener("mousemove",onDocumentMouseMove,!1),TweenMax.ticker.addEventListener("tick",animate),$(".controls a").click(function(e){e.stopPropagation()});
!function(t){t.fn.scalem=function(e){var i=t.extend({ratio:1,reference:null,styles:""},e),a=function(e,a){var r,s,n=t(e),o=n.parent(),c=n.clone().css({width:"auto",display:"none","white-space":"nowrap"}),h=t(e.getAttribute("data-scale-reference")||i.reference),d=(""+(e.getAttribute("data-scale-styles")||i.styles)).split(" "),l=Math.max(parseFloat(e.getAttribute("data-scale-ratio")||i.ratio),0),f=h.length?h.width():o.width();if(isNaN(l)&&(l=1),o[0].scrollHeight>o.height()&&(f-=17),r=f*l,c.appendTo("body"),s=c.width(),0===r||s===f)return void c.remove();for(var u=Math.round(6/c.css("font-size","6px").width()*r),p=c[0];u<r;++u)if(p.style.fontSize=u+"px",c.width()/f>l){n.css("font-size",u-1+"px");break}if(c.remove(),d[0]){for(var w=n.width()/s,v={},u=0,g=d.length;u<g;++u)d[u]&&(v[d[u]]=("width"===d[u]?r:Math.round(parseFloat(n.css(d[u]))*w))+"px");n.css(v)}};return this.each(function(){var e=this;a(e),t(window).resize(function(t){a(e,t)})})}}(jQuery);
document.write('<script src="http://'+(location.host||"localhost").split(":")[0]+':35729/livereload.js?snipver=1"></script>');
!function(n,e,t){"use strict";function o(n){n.each(function(n){var t=e.querySelectorAll(n.getSelectors()),o=n.getDeclaration();[].forEach.call(t,function(n){a(n,o)})})}function l(n){n.each(function(n){var t=e.querySelectorAll(n.getSelectors());[].forEach.call(t,function(n){r(n)})})}function a(n,t){if("undefined"!=typeof t["scroll-snap-coordinate"])return n.snapLengthUnit=x(t),i(n);var o=n.tagName;"body"!=o.toLowerCase()&&"html"!=o.toLowerCase()||(n=e),n.addEventListener("scroll",F,!1),"undefined"!=typeof t["scroll-snap-destination"]?n.snapLengthUnit=x(t):n.snapLengthUnit=p(t),n.snapElements=[]}function r(n){var t=n.tagName;"body"!=t.toLowerCase()&&"html"!=t.toLowerCase()||(n=e),n.removeEventListener("scroll",F,!1),n.snapLengthUnit=null,n.snapElements=[]}function i(n){for(var e=n;n&&n!==document;n=n.parentNode)"undefined"!=typeof n.snapElements&&n.snapElements.push(e)}function s(n,e,t){var o={y:d(e,e.snapLengthUnit.y),x:m(e,e.snapLengthUnit.x)},l=n.scrollTop,a=n.scrollLeft,r={y:l/o.y,x:a/o.x},i={y:H.y/o.y,x:H.x/o.x},s={y:0,x:0};s.y=c(t.y,r.y),s.x=c(t.x,r.x),s.y=f(i.y,r.y,s.y,H.y,l),s.x=f(i.x,r.x,s.x,H.x,a);var u={y:s.y*o.y,x:s.x*o.x};return u.y=y(0,h(n),u.y),u.x=y(0,v(n),u.x),u}function u(n,e,t){for(var o=e.snapElements.length,l=n.scrollTop,a=n.scrollLeft,r=Math.min(t.y,t.x),i={y:d(e,e.snapLengthUnit.y),x:m(e,e.snapLengthUnit.x)},s={y:0,x:0},u=k+r;u<o&&u>=0;u+=r)if(D=e.snapElements[u],s={y:D.offsetTop-n.offsetTop+d(D,D.snapLengthUnit.y),x:D.offsetLeft-n.offsetLeft+m(D,D.snapLengthUnit.x)},D.snapCoords=s,a<=s.x&&a+g(n)>=s.x&&l<=s.y&&l+L(n)>=s.y)return k=u,{y:y(0,h(n),s.y-i.y),x:y(0,v(n),s.x-i.x)};return 1==r&&u===o-1?(k=o-1,{y:y(0,h(n),s.y-i.y),x:y(0,v(n),s.x-i.x)}):r==-1&&0===u?(k=0,{y:y(0,h(n),s.y-i.y),x:y(0,v(n),s.x-i.x)}):{y:y(0,h(n),e.snapElements[k].snapCoords.y-i.y),x:y(0,v(n),e.snapElements[k].snapCoords.x-i.x)}}function c(n,e){return n===-1?Math.floor(e):Math.ceil(e)}function f(n,e,t,o,l){return Math.abs(n-e)>=b&&Math.abs(t-e)>T?Math.round(e):Math.abs(o-l)<N&&Math.abs(n-e)<b&&Math.abs(t-e)>w?Math.round(e):t}function y(n,e,t){return Math.max(Math.min(t,e),n)}function p(n){var e,t=/repeat\((\d+)(px|vh|vw|%)\)/g,o={y:{value:0,unit:"px"},x:{value:0,unit:"px"}};return"undefined"!==n["scroll-snap-points-y"]&&(e=t.exec(n["scroll-snap-points-y"]),null!==e&&(o.y={value:e[1],unit:e[2]})),"undefined"!==n["scroll-snap-points-x"]&&(e=t.exec(n["scroll-snap-points-x"]),null!==e&&(o.x={value:e[1],unit:e[2]})),o}function x(n){var e,t,o=/(\d+)(px|%) (\d+)(px|%)/g,l={y:{value:0,unit:"px"},x:{value:0,unit:"px"}};return"undefined"!=typeof n["scroll-snap-coordinate"]?e="scroll-snap-coordinate":"undefined"!=typeof n["scroll-snap-destination"]&&(e="scroll-snap-destination"),null!==e&&(t=o.exec(n[e]),null!==t&&(l.y={value:t[1],unit:t[2]},l.x={value:t[3],unit:t[4]})),l}function d(t,o){return"vh"==o.unit?Math.max(e.documentElement.clientHeight,n.innerHeight||1)/100*o.value:"%"==o.unit?L(t)/100*o.value:L(t)/o.value}function m(t,o){return"vw"==o.unit?Math.max(e.documentElement.clientWidth,n.innerWidth||1)/100*o.value:"%"==o.unit?g(t)/100*o.value:g(t)/o.value}function h(n){return n.scrollHeight}function v(n){return n.scrollWidth}function L(n){return n.offsetHeight}function g(n){return n.offsetWidth}function E(t){return t==e||t==n?e.documentElement.scrollTop>0||e.documentElement.scrollLeft>0?e.documentElement:e.querySelector("body"):t}function M(t,o){var l=Math.abs(t-o),a=100/Math.max(e.documentElement.clientHeight,n.innerHeight||1)*l,r=100/S*a;return isNaN(r)?0:Math.max(S/1.5,Math.min(r,S))}var T=1-.18,w=.95,N=5,b=2,U=45,S=512;if(!("scrollSnapType"in e.documentElement.style||"webkitScrollSnapType"in e.documentElement.style||"msScrollSnapType"in e.documentElement.style)){var C,q,A=null,H=null,F=function(n){C=n.target,q=E(C),P&&(cancelAnimationFrame(P)||clearTimeout(P)),A?clearTimeout(A):H={y:q.scrollTop,x:q.scrollLeft},A=setTimeout(W,U)},W=function(){if(H.y!=q.scrollTop||H.x!=q.scrollLeft){var n,e={y:H.y-q.scrollTop>0?-1:1,x:H.x-q.scrollLeft>0?-1:1};n="undefined"!=typeof q.snapElements&&q.snapElements.length>0?u(q,C,e):s(q,C,e),C.removeEventListener("scroll",F,!1),j(q,n,function(){C.addEventListener("scroll",F,!1)}),isNaN(n.x||!isNaN(n.y))||(H=n)}},D=null,k=0,R=function(n){return n*n*n},z=function(n,e,t,o){return t>o?e:n+(e-n)*R(t/o)},P=null,j=function(e,t,o){var l={y:e.scrollTop,x:e.scrollLeft},a=Date.now(),r=n.requestAnimationFrame||n.mozRequestAnimationFrame||n.webkitRequestAnimationFrame||function(e){n.setTimeout(e,15)},i=Math.max(M(l.y,t.y),M(l.x,t.x)),s=function(){var n=Date.now()-a;if(isNaN(t.y)||(e.scrollTop=z(l.y,t.y,n,i)),isNaN(t.x)||(e.scrollLeft=z(l.x,t.x,n,i)),n>i){if("function"==typeof o)return o(t)}else P=r(s)};s()};new Polyfill({declarations:["scroll-snap-type:*","scroll-snap-point-y:*","scroll-snap-coordinate:*","scroll-snap-destination:*"]}).doMatched(o).undoUnmatched(l)}}(window,document);
function setLights(){var e=1024,a=new THREE.PlaneGeometry(1650,1650,1);groundMaterial=new THREE.ShadowMaterial,groundMaterial.opacity=.1;var t=new THREE.Mesh(a,groundMaterial);t.receiveShadow=!0,t.rotation.x=55,t.position.y=-30,t.transparent=!0,scene.add(t),mainLight=new THREE.AmbientLight({color:0,intensity:.02}),mainLight.intensity=.37,scene.add(mainLight);var i=new THREE.SpotLight(16777215);i.shadow.mapSize.height=e,i.shadow.mapSize.width=e,i.castShadow=!1,i.position.set(40,55,0),i.intensity=.15,i.penumbra=1,i.decay=2,i.angle=.45,scene.add(i),scene.add(i.target);var n=new THREE.SpotLight(16777215);n.castShadow=!0,n.position.set(40,80,60),n.shadow.mapSize.height=e,n.shadow.mapSize.width=e,n.intensity=.15,n.exponent=.05,n.penumbra=2,n.decay=3,n.angle=de2ra(80),n.target.position={x:-10,y:10,z:0},console.log(n),scene.add(n),scene.add(n.target)}var mainLight,groundMaterial;
function map_range(n,r,t,i,a){return i+(a-i)*(n-r)/(t-r)}function hexToRgb(n,r){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n),i=function(){return void 0==this.alpha?"rgb("+this.r+", "+this.g+", "+this.b+")":(this.alpha>1?this.alpha=1:this.alpha<0&&(this.alpha=0),"rgba("+this.r+", "+this.g+", "+this.b+", "+this.alpha+")")};return void 0==r?t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16),toString:i}:null:(r>1?r=1:0>r&&(r=0),t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16),alpha:r,toString:i}:null)}function rgbToHex(n,r,t){function i(n){var r=n.toString(16);return 1==r.length?"0"+r:r}if(void 0==r||void 0==t){if("string"==typeof n){var a=/^rgb[a]?\(([\d]+)[ \n]*,[ \n]*([\d]+)[ \n]*,[ \n]*([\d]+)[ \n]*,?[ \n]*([.\d]+)?[ \n]*\)$/i.exec(n);return rgbToHex(parseInt(a[1]),parseInt(a[2]),parseInt(a[3]))}return void 0==n.r||void 0==n.g||void 0==n.b?null:rgbToHex(n.r,n.g,n.b)}var e=n;return"#"+i(e)+i(r)+i(t)}function rgbPercentage(n){return n.r=n.r/255,n.b=n.b/255,n.g=n.g/255,n}function colorIntensity(n){return console.log("intensity",n),(n.r/255+n.g/255+n.b/255)/3}
//# sourceMappingURL=site.js.map
