var animateText = function() {
	var _this = this;
	function scrollHandler(obj) {
		// console.log(obj.name, obj.proximity);
		setLetterPosition(obj);
	}
	function setLetterPosition(obj) {
		var headline = $(obj.headline);
		headline.each(function(i,elm) {
			 if (Math.abs(obj.proximity<.15)) {
				var tOpacity=map_range(Math.abs(obj.proximity), 0, .15, 1, 0)
				TweenMax.to(elm.parentNode, .5, { opacity:tOpacity, onComplete:function() {}})
			} else {
				var tOpacity=0;
				TweenMax.to(elm.parentNode, .5, { opacity:tOpacity, onComplete:function() {}})
			}
			
			TweenMax.to(elm, 5, { y:Math.abs(obj.proximity)*30, ease:Power4.easeOut, onComplete:function() {}})
			
			
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
			name.innerHTML="<span>"+obj.name+"</span>";
			container.appendChild(name);
			obj.headline = name;


			var cta = document.createElement("button");
			cta.innerHTML = "See more";
			// container.appendChild(cta);

			$(".current_project h2").scalem();

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
