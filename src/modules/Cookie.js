export const Cookie = function(){
	this.set = function(name, value, days){
		var expires = '';
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + '=' + (value || '')  + expires + '; path=/';
	};

	this.get = function(name){
		var stateReq = name + '=',
			cookieArr = document.cookie.split(';');
		for(var i = 0; i < cookieArr.length; i++) {
			var cookie = cookieArr[i];
			while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
			if (cookie.indexOf(stateReq) == 0) return cookie.substring(stateReq.length, cookie.length);
		}
		return null;
	};

	this.remove = function(name){
		document.cookie = name +'=; Max-Age=-1; path=/';  
	};

	this.clear = function(){
		document.cookie.split(';').forEach(function(c) {
			document.cookie = c.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
		});
	};
};