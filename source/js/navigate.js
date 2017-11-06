function goToCaseStudy(e) {
	$headline = $activeSection.find("h2");

	$("article header").css("background-color",$activeSection.data("text-color"))
  	$("article header h1").html($headline.html()).css("color",$activeSection.data("bg-dark"));
  	$("article header h1").scalem({maxSize:175});
	$("article").addClass("on")

	$("article header").css("background-color",$activeSection.data("bg-dark"))
  	$("article header h1").html($headline.html()).css("color",$activeSection.data("text-color"));

  	TweenMax.to(sections[activeSection].rotation, 2, { y:-de2ra(360), ease:new Ease(BezierEasing(.8,0,.2,1)), onComplete:function() {
  		sections[activeSection].rotation.y=de2ra(0);
  	}});
  	TweenMax.to(camera.position, 1.7/2, { z:200, ease:new Ease(BezierEasing(.2,0,1,.8)), onComplete:function() {
  		TweenMax.to(camera.position, 1.7/2, { z:115, ease:new Ease(BezierEasing(0,.45,.3,1))});
  	}});
  	TweenMax.to(sections[activeSection].position, 1, { x:-70, ease:new Ease(BezierEasing(.45,0,1,.3)), onComplete:function() {
  		TweenMax.to(sections[activeSection].position, 1, { x:0, ease:new Ease(BezierEasing(0,.45,.1,1))});
  	}});
	e.stopPropagation();
	return false;
}