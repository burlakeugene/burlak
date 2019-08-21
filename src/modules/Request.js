const makeRequest = function(method, request) {
  // start: function
  // end: function
  // clearData: boolean
  // responseHeaders: boolean
  // url: string
  // data: object
  // headers: object
  return new Promise(function(resolve, reject) {
    if (!request) reject('Empty request');
    request.start && request.start();
    let xhr = new XMLHttpRequest(),
      url = request.url ? request.url : '',
      async = request.async ? request.async : true,
      requestData = request.data,
      clearData = request.clearData ? true : false,
      responseHeaders = request.responseHeaders ? true : false,
      getCount = 0;
    if (method === 'GET') {
      for (let data in requestData) {
        if (!getCount) {
          url += '?' + data + '=' + requestData[data];
        } else {
          url += '&' + data + '=' + requestData[data];
        }
        getCount++;
      }
    }

    xhr.open(method, url, async);
    if (request.headers) {
      for (let header in request.headers) {
        xhr.setRequestHeader(header, request.headers[header]);
      }
    }
    xhr.send(JSON.stringify(requestData));
    xhr.onreadystatechange = function() {
      if (responseHeaders && this.readyState == this.HEADERS_RECEIVED) {
        responseHeaders = xhr
          .getAllResponseHeaders()
          .trim()
          .split(/[\r\n]+/);
        let headersMap = {};
        responseHeaders.forEach(function(line) {
          let parts = line.split(': '),
            header = parts.shift(),
            value = parts.join(': ');
          headersMap[header] = value;
        });
        responseHeaders = headersMap;
      }
      if (xhr.readyState != 4) return;
      if (xhr.status < 200 || xhr.status > 300) {
				request.end && request.end();
				let response = clearData ? JSON.parse(xhr.response) : xhr;
        reject(response);
      } else {
        request.end && request.end();
        let response = clearData ? JSON.parse(xhr.response) : xhr;
        if (responseHeaders) response['headers'] = responseHeaders;
        resolve(response);
      }
    };
  });
};

export const Request = function() {
  this.post = function(request) {
    return makeRequest('POST', request);
  };
  this.get = function(request) {
    return makeRequest('GET', request);
  };
  this.put = function(request) {
    return makeRequest('PUT', request);
  };
  this.delete = function(request) {
    return makeRequest('DELETE', request);
  };
};
