function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
function hexToRgb(r,t){var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r),a=function(){return void 0==this.alpha?"rgb("+this.r+", "+this.g+", "+this.b+")":(this.alpha>1?this.alpha=1:this.alpha<0&&(this.alpha=0),"rgba("+this.r+", "+this.g+", "+this.b+", "+this.alpha+")")};return void 0==t?n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16),toString:a}:null:(t>1?t=1:0>t&&(t=0),n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16),alpha:t,toString:a}:null)}
function rgbToHex(r,t,n){function a(r){var t=r.toString(16);return 1==t.length?"0"+t:t}if(void 0==t||void 0==n){if("string"==typeof r){var i=/^rgb[a]?\(([\d]+)[ \n]*,[ \n]*([\d]+)[ \n]*,[ \n]*([\d]+)[ \n]*,?[ \n]*([.\d]+)?[ \n]*\)$/i.exec(r);return rgbToHex(parseInt(i[1]),parseInt(i[2]),parseInt(i[3]))}return void 0==r.r||void 0==r.g||void 0==r.b?null:rgbToHex(r.r,r.g,r.b)}var e=r;return"#"+a(e)+a(t)+a(n)}
function rgbPercentage(obj) {
	obj.r = obj.r/255;
	obj.b = obj.b/255;
	obj.g = obj.g/255;
	return obj;
}
function colorIntensity(obj) {
	return (obj.r/255+obj.g/255+obj.b/255)/3;
}
var fps = {	
	startTime : 0,	
	frameNumber : 0,
	average : 60,
	framesCounted : 60,
	secondsCounted : 1,
	getFPS : function(){
		this.frameNumber++;		
		var d = new Date().getTime(), currentTime = ( d - this.startTime ) / 1000, result = Math.floor( ( this.frameNumber / currentTime ) );
		
		if( currentTime > 1 ){
			this.framesCounted+=result
			this.secondsCounted++;
			this.startTime = new Date().getTime();
			this.frameNumber = 0;
			this.average = this.framesCounted/this.secondsCounted
			// $("span.fps").html(this.average);
		}
		
		return result;
	},
	reset : function() {
		this.framesCounted=0;
		this.secondsCounted=0;
	}
};
