$(function() {
	$("a").each(function(i,elm) {
		if (elm.href!='#') {
			console.log("link",elm.href);
			$(elm).data("link",$(elm).attr("href"));
		}
	});
});