class Request {
  constructor(props = {}) {
    this.config = {
      url: props.url || '',
      needAuthorization: props.hasOwnProperty('needAuthorization')
        ? props.needAuthorization
        : true,
      authorization: this.getAuthorization(),
      commonData: props.hasOwnProperty('commonData') ? props.commonData : {},
      middlewares: props.middlewares || [],
      headers: props.hasOwnProperty('headers')
        ? props.headers
        : { 'Content-Type': 'application/json' },
      clearResponse: props.hasOwnProperty('clearResponse')
        ? props.clearResponse
        : true,
    };
  }

  request(method, request) {
    let {
        commonData,
        headers,
        needAuthorization,
        url,
        middlewares = [],
        clearResponse,
      } = this.config,
      self = this;

    return new Promise((resolve, reject) => {
      request.start && request.start();
      let xhr = new XMLHttpRequest();
      let requestUrl = this.buildUrl(url, request.url);
      let async = request.async ? request.async : true;

      if (request.responseType) xhr.responseType = request.responseType;

      let requestData = request.data || {};
      let responseHeaders;
      requestData = {
        ...commonData,
        ...requestData,
      };
      headers = { ...headers, ...(request.headers || {}) };
      if (needAuthorization) {
        headers['authorization'] = self.getAuthorization();
      }
      if (!headers['Content-Type']) delete headers['Content-Type'];
      if (!headers['Content-Type']) {
        let formData = new FormData();
        Object.keys(requestData).forEach((key) => {
          formData.append(key, requestData[key]);
        });
        requestData = formData;
      }
      if (method === 'GET') {
        requestUrl += '?';
        for (let data in requestData) {
          requestUrl += data + '=' + requestData[data] + '&';
        }
      }

      xhr.open(method, requestUrl, async);
      if (needAuthorization) {
        headers['authorization'] = self.getAuthorization();
      }

      for (let header in headers) {
        xhr.setRequestHeader(header, headers[header]);
      }
      if(headers['Content-Type'] === 'application/json'){
        requestData = JSON.stringify(requestData);
      }
      xhr.send(requestData);

      xhr.onreadystatechange = function () {
        if (this.readyState === this.HEADERS_RECEIVED) {
          responseHeaders = xhr
            .getAllResponseHeaders()
            .trim()
            .split(/[\r\n]+/);
          let headersMap = {};
          responseHeaders.forEach(function (line) {
            let parts = line.split(': '),
              header = parts.shift(),
              value = parts.join(': ');
            headersMap[header] = value;

            if (
              (request.hasOwnProperty('needAuthorization')
                ? request.needAuthorization
                : needAuthorization) &&
              header.toLowerCase() === 'authorization'
            )
              self.setAuthorization(value);
          });
          responseHeaders = headersMap;
        }
        if (xhr.readyState !== 4) return;
        let response = clearResponse ? xhr.response : xhr;
        try {
          response = JSON.parse(response);
        } catch (e) {}
        request.end && request.end();

        // if (request.responseType === 'blob') {
        //   response = {
        //     responseType: 'blob',
        //     objectURL: URL.createObjectURL(xhr.response),
        //   };
        // }

        if (middlewares.length) {
          for (let i = 0; i <= middlewares.length - 1; i++) {
            response = middlewares[i](response);
          }
        }

        if (xhr.status < 200 || xhr.status > 300) reject(response);
        else resolve(response);
      };
    });
  }

  buildUrl(base = '', relative = '') {
    if (base[base.length - 1] === '/' && relative[0] === '/') {
      base = base.slice(0, base.length - 1);
    }
    return base + relative;
  }

  getAuthorization() {
    return localStorage.getItem('authorization') || '';
  }

  setAuthorization(key) {
    localStorage.setItem('authorization', key);
  }

  removeAuthorization() {
    localStorage.removeItem('authorization');
  }

  logout() {
    this.removeAuthorization();
  }

  post(query) {
    return this.request('POST', query);
  }

  get(query) {
    return this.request('GET', query);
  }

  put(query) {
    return this.request('PUT', query);
  }

  delete(query) {
    return this.request('DELETE', query);
  }

  patch(query) {
    return this.request('PATCH', query);
  }
}

export default Request;
