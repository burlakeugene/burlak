/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _burlak = __webpack_require__(2);

var Burlak = _interopRequireWildcard(_burlak);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var request = new Burlak.Request();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var makeRequest = function makeRequest(method, request) {
	// start: function
	// end: function
	// clearData: boolean
	// url: string
	// data: object
	// headers: object
	return new Promise(function (resolve, reject) {
		request.start && request.start();
		var xhr = new XMLHttpRequest(),
		    url = request.url ? request.url : '',
		    async = request.async ? request.async : true,
		    requestData = request.data,
		    clearData = request.clearData ? true : false;

		xhr.open(method, url, async);
		if (request.headers) {
			for (var header in request.headers) {
				xhr.setRequestHeader(header, request.headers[header]);
			}
		}
		xhr.send(JSON.stringify(requestData));
		xhr.onreadystatechange = function () {
			if (xhr.readyState != 4) return;
			if (xhr.status < 200 || xhr.status > 300) {
				request.end && request.end();
				reject(xhr);
			} else {
				request.end && request.end();
				var response = clearData ? JSON.parse(xhr.response) : xhr;
				resolve(response);
			}
		};
	});
};

var Request = exports.Request = function Request() {
	this.post = function (request) {
		return makeRequest('POST', request);
	};
	this.get = function (request) {
		return makeRequest('GET', request);
	};
	this.put = function (request) {
		return makeRequest('PUT', request);
	};
	this.delete = function (request) {
		return makeRequest('DELETE', request);
	};
};

var DOM = exports.DOM = function DOM() {
	this.createElem = function (tag, props, html, children) {
		var element = document.createElement(tag);
		for (var prop in props) {
			element.setAttribute(prop, props[prop]);
		}
		if (html) element.innerHTML = html;
		if (children) {
			if (children instanceof Element) {
				element.appendChild(children);
			}
			if (children instanceof Array) {
				children.forEach(function (elem, index) {
					elem instanceof Element && element.appendChild(elem);
				});
			}
		}
		return element;
	};
};

var Cookie = exports.Cookie = function Cookie() {
	this.set = function (name, value, days) {
		var expires = '';
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + '=' + (value || '') + expires + '; path=/';
	};

	this.get = function (name) {
		var stateReq = name + '=',
		    cookieArr = document.cookie.split(';');
		for (var i = 0; i < cookieArr.length; i++) {
			var cookie = cookieArr[i];
			while (cookie.charAt(0) == ' ') {
				cookie = cookie.substring(1, cookie.length);
			}if (cookie.indexOf(stateReq) == 0) return cookie.substring(stateReq.length, cookie.length);
		}
		return null;
	};

	this.remove = function (name) {
		document.cookie = name + '=; Max-Age=-1; path=/';
	};
};

var Url = exports.Url = function Url() {
	this.getParametr = function (name) {
		if (name = new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)').exec(location.search)) {
			return decodeURIComponent(name[1]);
		}
		return null;
	};
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map