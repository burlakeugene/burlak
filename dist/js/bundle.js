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


var _index = __webpack_require__(2);

var Burlak = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Date = exports.Random = exports.Url = exports.Storage = exports.Cookie = exports.Dom = exports.Request = undefined;

var _Request = __webpack_require__(3);

var _Dom = __webpack_require__(4);

var _Cookie = __webpack_require__(5);

var _Storage = __webpack_require__(6);

var _Url = __webpack_require__(7);

var _Random = __webpack_require__(8);

var _Date = __webpack_require__(9);

var Request = exports.Request = _Request.Request;
var Dom = exports.Dom = _Dom.Dom;
var Cookie = exports.Cookie = _Cookie.Cookie;
var Storage = exports.Storage = _Storage.Storage;
var Url = exports.Url = _Url.Url;
var Random = exports.Random = _Random.Random;
var Date = exports.Date = _Date.Date;

/***/ }),
/* 3 */
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
		if (!request) reject('Empty request');
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Dom = exports.Dom = function Dom() {
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
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

	this.clear = function () {
		document.cookie.split(';').forEach(function (c) {
			document.cookie = c.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
		});
	};
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Storage = exports.Storage = function Storage() {
	var localStorage = window.localStorage;
	this.set = function (name, value) {
		localStorage.setItem(name, value);
		return this.get(name);
	};
	this.get = function (name) {
		return localStorage.getItem(name) || null;
	};
	this.remove = function (name) {
		localStorage.removeItem(name);
		return true;
	};
	this.clear = function () {
		localStorage.clear();
		return true;
	};
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Url = exports.Url = function Url() {
	this.getParametr = function (name) {
		if (name = new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)').exec(location.search)) {
			return decodeURIComponent(name[1]);
		}
		return null;
	};
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Random = exports.Random = function Random() {
	this.defaultSystem = 10;
	this.defaultLength = 13;
	this.defaultUIdCount = 4;
	this.maxLength = this.defaultLength;

	this.single = function () {
		var system = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.defaultSystem;
		var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultLength;

		if (length > this.maxLength) {
			length = this.maxLength;
			console.warn('Max length of random number is ' + this.maxLength);
		}
		var rand = window.Math.floor(window.Math.random() * 0x10000000000000),
		    result = void 0;
		rand = rand.toString(system).substring(1), result = rand.split('').splice(0, length).join('');
		return result;
	};

	this.multy = function () {
		var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.defaultUIdCount;
		var system = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultSystem;
		var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.defaultLength;

		var result = '';
		for (var i = 0; i < count; i++) {
			result += this.single(system, length) + '-';
			if (i == count - 1) result = result.substring(0, result.length - 1);
		}
		return result;
	};
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Date = exports.Date = function Date() {
	var Date = window.Date;
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map