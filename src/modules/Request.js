const makeRequest = function(method, request){
	// start: function
	// end: function
	// clearData: boolean
	// url: string
	// data: object
	// headers: object
	return new Promise(function(resolve, reject){
        if(!request) reject('Empty request');
		request.start && request.start();
		let xhr = new XMLHttpRequest(),
			url = request.url ? request.url : '',
			async = request.async ? request.async : true,
			requestData = request.data,
			clearData = request.clearData ? true : false,
			getCount = 0;
		if(method === 'GET'){
			for(let data in requestData){
				if(!getCount){
					url += '?'+data+'='+requestData[data];
				}
				else{
					url += '&'+data+'='+requestData[data];
				}
				getCount++;
			}
		}

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