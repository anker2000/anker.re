var animateText = function() {
	var _this = this;
	function scrollHandler(obj) {
		console.log(obj.name, obj.proximity);
		setLetterPosition(obj);
	}
	function setLetterPosition(obj) {
		var headline = $(obj.headline);
		headline.find("span").each(function(i,elm) {
			 if (Math.abs(obj.proximity<.15)) {
				var tOpacity=map_range(Math.abs(obj.proximity), 0, .15, 1, 0)
				TweenMax.to(elm.parentNode.parentNode, 0.7, { opacity:tOpacity, delay:0.3, onComplete:function() {}})
			} else {
				var tOpacity=0;
				TweenMax.to(elm.parentNode.parentNode, 0.7, { opacity:tOpacity, delay:0.3, onComplete:function() {}})
			}
			if (i/2!=Math.floor(i/2)) {
				TweenMax.to(elm, 0.7, { y:obj.proximity*20, onComplete:function() {}})
			} else {
				TweenMax.to(elm, 0.7, { y:obj.proximity*-20, onComplete:function() {}})
			}
			
		});
		// if (obj.proximity==0) {
		// 	animateIn(obj.headline);
		// }
	}
	function animateIn(headline) {

		$(headline).find("span").each(function(i,elm) {
			TweenMax.to(elm, 1,{ y:0, opacity:1, ease:Power4.easeOut, onComplete:function() {}})
		});
	}
	function animateOut(headline) {
		$(headline).find("span").each(function(i,elm) {
			if (i/2!=Math.floor(i/2)) {
				TweenMax.to(elm, 0.6,{ y:30, opacity:0, onComplete:function() {}})
			} else {
				TweenMax.to(elm, 0.6,{ y:-30, opacity:0, onComplete:function() {}})
			}
		});
	}
	return {
		register: function(obj) {
			_this.obj = obj;
			// _this.elm = obj.elm;
			obj.proximity=.25;
			var container = document.createElement("div");
			container.className = "current_project";

			document.body.appendChild(container);
			var name = document.createElement("h2");
			container.appendChild(name);

			for (i=0;i<obj.name.length;i++) {
				name.innerHTML+='<span data-random="'+Math.random()*100+'">'+obj.name[i].replace(" ","&nbsp;")+'</span>';
			}
			obj.headline = name;

			var cta = document.createElement("button");
			cta.innerHTML = "See more";
			container.appendChild(cta);

			$(".projects").bind("scroll",function() {
				scrollHandler(obj);
			});
			scrollHandler(obj);
			setTimeout(scrollHandler,1000,obj);
		},
		animateHeadline: function(obj, animatesIn) {
			var headline = obj.headline;
			// console.log("headline",$(headline));
			if (animatesIn) {
				console.log(headline);
				// animateIn(headline);
			} else {
				// animateOut(headline);
			}
		},
		render: function() {
			for (i=0;i<sections.length;i++) {
				scrollHandler(sections[i]);
			}
		}
	}
}();
