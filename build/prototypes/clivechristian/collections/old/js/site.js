var collection=function(){function t(t){clearTimeout(g),g=setTimeout(e,1200),w=p.getBoundingClientRect(),b=$(window).scrollTop(),v=b-E,E=b,w.top<=0&&w.bottom>=T.height?y&&Math.abs(v)>x&&r(t):w.top<T.height/2&&w.top>5?v>0?(c(0),s($(".productshots .product:first-child",$(p)).offset().top,1e3,t)):0>v&&c(-1):w.bottom<T.height/2&&w.bottom>5&&(0>v?(c(j-1),s($(".productshots .product:last-child",$(p)).offset().top,1e3,t)):v>0&&c(-1))}function e(){y=!0}function o(t){t=t||window.event,t.preventDefault&&t.preventDefault(),t.returnValue=!1}function n(){window.addEventListener&&window.addEventListener("DOMMouseScroll",o,!1),window.onwheel=o,window.onmousewheel=document.onmousewheel=o,window.ontouchmove=o}function i(){window.removeEventListener&&window.removeEventListener("DOMMouseScroll",o,!1),window.onmousewheel=document.onmousewheel=null,window.onwheel=null,window.ontouchmove=null}function r(t){var e=l(document.elementFromPoint(0,T.height/2)),o=$(e).index();v>0?(objectTarget=o+1,objectTarget<j?s($(e).next().offset().top,1e3,t):(s(b+3*T.height/4,1e3,t),c(-1))):(objectTarget=o-1,objectTarget>=0?s($(e).prev().offset().top,1e3,t):(s(b-3*T.height/4,1e3,t),c(-1))),c(objectTarget)}function c(t){$(".cta .product",$(p)).removeClass("active"),$(".cta .product:nth-child("+(t+1)+")",$(p)).addClass("active"),$("header nav a",$(p)).removeClass("active"),$("header nav a:nth-child("+(t+1)+")",$(p)).addClass("active")}function s(t,e,o){n(),y=!1,$("html, body").stop().scrollTo(t,{duration:e,easing:"easeOutExpo"},function(){y=!0,i()})}function l(t){return $(t).hasClass("product")?t:t==document.body?!1:l(t.parentNode)}function a(t){w=p.getBoundingClientRect(),T.height=$(window).height(),T.width=$(window).width()}function u(){var e=(b-m)/(j*T.height),o=e*$(".overlay",$(p)).height(),n=-1*o;n>2*T.height/5&&(n=2*T.height/5),$(".collection .overlay .fg .left").css("transform","translate3d(0,"+1.1*n+"px,50px)"),$(".collection .overlay .fg .right").css("transform","translate3d(0,"+1.1*n+"px,50px)"),$(".collection .overlay .bg .left").css("transform","translate3d(0,"+n+"px,0px)"),$(".collection .overlay .bg .right").css("transform","translate3d(-0,"+n+"px,0px)"),setTimeout(function(){window.requestAnimationFrame(u),window.requestAnimationFrame(t)},16)}function d(t){b=$(window).scrollTop(),m=$(p).offset().top}function h(t){p=t,j=$(".productshots",$(t)).children().length,$(".collection").css("height",100*j+"vh"),$(".overlay").css("height",133*j+"vh"),u()}function f(){$(".collection header a").bind("click",function(t){var e=$(this).index();s($(".productshots .product:nth-child("+(e+1)+")",$(p)).offset().top,1e3,t),c(e),t.preventDefault()})}var w,p,g,v,m,T=new Object,b=$(window).scrollTop(),x=8,y=!0,E=b,j=0;return{Init:function(e){h(e),f(),window.addEventListener("resize",a),window.addEventListener("wheel",t),window.addEventListener("scroll",d),a(),t()}}}();$(function(){$(".collection").each(function(){collection.Init(this)})}),$.fn.scrollTo=function(t,e,o){"function"==typeof e&&2==arguments.length&&(o=e,e=t);var n=$.extend({scrollTarget:t,offsetTop:50,duration:500,easing:"easeOutQuad"},e);return this.each(function(){var t=$(this),e="number"==typeof n.scrollTarget?n.scrollTarget:$(n.scrollTarget),i="number"==typeof e?e:e.offset().top+t.scrollTop()-parseInt(n.offsetTop);t.animate({scrollTop:i},parseInt(n.duration),n.easing,function(){"function"==typeof o&&o.call(this)})})},jQuery.extend(jQuery.easing,{def:"easeOutQuad",easeOutExpo:function(t,e,o,n,i){return e==i?o+n:n*(-Math.pow(2,-10*e/i)+1)+o}});
function mapRange(e,t,n,i,c){return i+(c-i)*(e-t)/(n-t)}var scentWheel=function(){function e(){t();var e=document.querySelector(".progress").getAttribute("r"),n=Math.PI*(2*e);document.querySelector(".progress").style.strokeDasharray=n;var i=mapRange(a.pct,0,1,1,0);document.querySelector(".progress").style.strokeDashoffset=i*n}function t(e){var t=document.querySelector("svg.progress_container").getBoundingClientRect().width,n=1e3/t;$(".scent_wheel svg circle.progress")[0].style.strokeWidth=5*n,$(".scent_wheel svg circle.background")[0].style.strokeWidth=1*n,$(".scent_wheel svg circle.point").each(function(){$(this)[0].setAttribute("r",6*n)}),console.log(n,"from",t)}function n(){$currentText=$(".descriptions .section_container section:nth-child("+mapRange(s+1,0,4,4,0)+") .text");var e=0;return $currentText.children().each(function(){e+=$(this).html().length}),mapRange(Math.ceil(50*e),3e3,15e3,8e3,17e3)}function i(){$("g.section .point").bind("click",function(e){e.preventDefault(),scentWheel.noteSkipTo($(this).attr("data-section")),$("g.section circle.point").attr("class","point"),$(this).attr("class","point active")}),$(".scent_wheel a.discover").bind("click",function(e){e.preventDefault(),scentWheel.noteNavigate(1,o)}),$(".navigation a.forward").bind("click",function(e){scentWheel.nextNote(),e.preventDefault()}),$(".navigation a.back").bind("click",function(e){scentWheel.prevNote(),e.preventDefault()}),$(".navigation ul li").bind("click",function(e){var t=$(this).index()+1;0==t?scentWheel.noteNavigate(t,0):scentWheel.noteSkipTo(t)})}var c,a={pct:0},s=0,o=1e4;return{Init:function(){i(),window.addEventListener("resize",t),TweenLite.ticker.addEventListener("tick",e),$(".backgrounds .section_container section:first-child img").addClass("active")},nextNote:function(){targetStep=s+1,4==targetStep&&(targetStep=0),scentWheel.noteSkipTo(targetStep)},prevNote:function(){return targetStep=s-1,-1==targetStep?!1:void scentWheel.noteSkipTo(targetStep)},noteNavigate:function(e){duration=n(),(4==e||0==e)&&(e=0,i=1e3,$("circle.progress").css("opacity",0),setTimeout(function(){$("circle.progress").css("opacity",1)},i+20),duration=0),e>0?$(".scent_wheel").addClass("running"):$(".scent_wheel").removeClass("running");var t=e/3,i=0,o=-100*e,r=mapRange(e,0,3,3,0),l=-100*r;TweenLite.to(a,duration/1e3,{pct:t,delay:i,ease:Power0.easeOut});e>0?c=setTimeout(function(){scentWheel.noteNavigate(e+1)},duration):clearTimeout(c),$(".navigation ul li").removeClass("active"),$(".navigation ul li:nth-child("+e+")").addClass("active"),$(".backgrounds .section_container img").removeClass("active"),$(".backgrounds .section_container section:nth-child("+(e+1)+") img").addClass("active"),$(".descriptions .section_container .text").removeClass("active"),$(".descriptions .section_container section:nth-child("+(r+1)+") .text").addClass("active"),$("g.section circle.point").attr("class","point"),$("g.section circle.point:nth-child("+e+")").attr("class","point active"),$(".backgrounds .section_container").css("transform","translateY("+o+"%)"),$(".descriptions .section_container").css("transform","translateY("+l+"%)"),s=e},noteSkipTo:function(e){if(e=parseFloat(e),e==s)return!1;var t=mapRange(e,0,4,4,0);targetPct=(e-1)/3,targetPct<0&&(targetPct=0),targetBackground=-100*e,targetDescription=-100*(t-1),clearTimeout(c);TweenLite.to(a,.3,{pct:targetPct});e>0?$(".scent_wheel").addClass("running"):$(".scent_wheel").removeClass("running"),$(".navigation ul li").removeClass("active"),$(".navigation ul li:nth-child("+e+")").addClass("active"),$(".backgrounds .section_container img").removeClass("active"),$(".backgrounds .section_container section:nth-child("+(e+1)+") img").addClass("active"),$(".descriptions .section_container .text").removeClass("active"),$(".descriptions .section_container section:nth-child("+t+") .text").addClass("active"),$("g.section circle.point").attr("class","point"),$("g.section circle.point:nth-child("+e+")").attr("class","point active"),$(".backgrounds .section_container").css("transform","translateY("+targetBackground+"%)"),$(".descriptions .section_container").css("transform","translateY("+targetDescription+"%)"),o=n(),0==e?clearTimeout(c):c=setTimeout(function(){scentWheel.noteNavigate(e,o)},1e3),s=e}}}();$(function(){null!=document.querySelector(".scent_wheel")&&scentWheel.Init()});
//# sourceMappingURL=site.js.map
