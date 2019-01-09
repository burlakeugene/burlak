export const Url = function(){

	this.getParams = () => {
		let query = window.location.search;
		if (!query) {
			return { };
		}
	
		return (/^[?#]/.test(query) ? query.slice(1) : query)
			.split('&')
			.reduce((params, param) => {
				let [ key, value ] = param.split('=');
				params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
				return params;
			}, 
		{});
	};

	this.getParam = (name) => {
		return this.getParams()[name] || null
	};

	this.getParamSingle = function(name){
		if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search)){
			return decodeURIComponent(name[1]);
		}
		return null;
	};

	this.updateQueryString = (name, value, url = false) => {
		if (!url) url = window.location.href;
		var re = new RegExp("([?&])" + name + "=.*?(&|#|$)(.*)", "gi"),
			hash;

		if (re.test(url)) {
			if (typeof value !== 'undefined' && value !== null)
				return url.replace(re, '$1' + name + "=" + value + '$2$3');
			else {
				hash = url.split('#');
				url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
				if (typeof hash[1] !== 'undefined' && hash[1] !== null)
					url += '#' + hash[1];
				return url;
			}
		}
		else {
			if (typeof value !== 'undefined' && value !== null) {
				var separator = url.indexOf('?') !== -1 ? '&' : '?';
				hash = url.split('#');
				url = hash[0] + separator + name + '=' + value;
				if (typeof hash[1] !== 'undefined' && hash[1] !== null)
					url += '#' + hash[1];
				return url;
			}
			else
				return url;
		}
	};

	this.setParam = (name, value) => {
		let url = this.updateQueryString(name, value);
		window.history.pushState({path:url},'',url);
	};
	
};