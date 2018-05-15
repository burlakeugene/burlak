const makeRequest = function(method, request){
	// start: function
	// end: function
	// clearData: boolean
	// url: string
	// data: object
	// headers: object
	return new Promise(function(resolve, reject){
		request.start && request.start();
		let xhr = new XMLHttpRequest(),
			url = request.url ? request.url : '',
			async = request.async ? request.async : true,
			requestData = request.data,
			clearData = request.clearData ? true : false;

		xhr.open(method, url, async);
		if(request.headers){
			for(let header in request.headers){
				xhr.setRequestHeader(header, request.headers[header]);
			}
		}
		xhr.send(JSON.stringify(requestData));
		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) return;			
			if (xhr.status < 200 || xhr.status > 300) {
				request.end && request.end();
				reject(xhr);
			}
			else{
				request.end && request.end();
				let response = clearData ? JSON.parse(xhr.response) : xhr;
				resolve(response);				
			}
		}
	});
};

export const Request = function(){
	this.post = function(request){
		return makeRequest('POST', request);
	};
	this.get = function(request){
		return makeRequest('GET', request);
	};
	this.put = function(request){
		return makeRequest('PUT', request);
	};
	this.delete = function(request){
		return makeRequest('DELETE', request);
	};
};

export const DOM = function(){
	this.createElem = function(tag, props, html, children){
		let element = document.createElement(tag);
		for(let prop in props){
			element.setAttribute(prop,props[prop]);
		}
		if(html) element.innerHTML = html;		
		if(children){
			if(children instanceof Element){
				element.appendChild(children);
			}
			if(children instanceof Array){
				children.forEach(function(elem,index){
					elem instanceof Element && element.appendChild(elem);
				});
			}
		}
		return element;
	};
};

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
};

export const Url = function(){
	this.getParametr = function(name){
		if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search)){
			return decodeURIComponent(name[1]);
		}
		return null;
	};
};
