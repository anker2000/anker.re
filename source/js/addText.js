var animateText = function() {
	var _this = this;
	
	function setLetterPosition(obj) {
		var headline = $(obj.headline);
		headline.each(function(i,elm) {
			 if (Math.abs(obj.proximity<.15)) {
				var tOpacity=map_range(Math.abs(obj.proximity), 0, .15, 1, 0)
				if (tOpacity<0) tOpacity=0;
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
			// _this.elm = obj.elm;
			obj.proximity=.25;
			var container = document.createElement("div");
			container.className = "current_project";

			document.body.appendChild(container);

			// var cta = document.createElement("a");
			// cta.className="cta";
			// cta.innerHTML = "See more";
			// $("footer")[0].appendChild(cta);
			
			var name = document.createElement("h2");
			// var nameHTML="";
			// for (i=0;i<obj.name.length;i++) {
			// 	nameHTML+="<span>"+obj.name[i]+"</span>";
			// }
			name.innerHTML='<a href="#">'+obj.name+'</a>';
			container.appendChild(name);
			obj.headline = name;




			$(".current_project h2").scalem({maxSize:175});

			snapWrapper.bind("scroll",function() {
				setLetterPosition(obj);
			});
			
			container.ref= obj.ref;
			setLetterPosition(obj);
			setTimeout(setLetterPosition,1000,obj);
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
