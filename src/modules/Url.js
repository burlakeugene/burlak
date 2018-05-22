export const Url = function(){
	this.getParametr = function(name){
		if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search)){
			return decodeURIComponent(name[1]);
		}
		return null;
	};
};