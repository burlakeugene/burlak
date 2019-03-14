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

console.log(_index.Detection);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Detection = exports.AjaxNavigation = exports.Money = exports.Map = exports.InView = exports.Hash = exports.DateTime = exports.Random = exports.Url = exports.Storage = exports.Cookie = exports.Dom = exports.Request = undefined;

var _Request = __webpack_require__(3);

var _Dom = __webpack_require__(4);

var _Cookie = __webpack_require__(5);

var _Storage = __webpack_require__(6);

var _Url = __webpack_require__(7);

var _Random = __webpack_require__(8);

var _DateTime = __webpack_require__(9);

var _Hash = __webpack_require__(10);

var _InView = __webpack_require__(11);

var _Map = __webpack_require__(12);

var _Money = __webpack_require__(13);

var _AjaxNavigation = __webpack_require__(14);

var _Detection = __webpack_require__(15);

var Request = exports.Request = _Request.Request;
var Dom = exports.Dom = _Dom.Dom;
var Cookie = exports.Cookie = _Cookie.Cookie;
var Storage = exports.Storage = _Storage.Storage;
var Url = exports.Url = _Url.Url;
var Random = exports.Random = _Random.Random;
var DateTime = exports.DateTime = _DateTime.DateTime;
var Hash = exports.Hash = _Hash.Hash;
var InView = exports.InView = _InView.InView;
var Map = exports.Map = _Map.Map;
var Money = exports.Money = _Money.Money;
var AjaxNavigation = exports.AjaxNavigation = _AjaxNavigation.AjaxNavigation;
var Detection = exports.Detection = _Detection.Detection;

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
		    clearData = request.clearData ? true : false,
		    getCount = 0;

		if (method === 'GET') {
			for (var data in requestData) {
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

	this.removeElem = function (elem) {
		if (Element.prototype.remove) {
			elem.remove();
		} else {
			var parent = elem.parentNode;
			parent.removeChild(elem);
		}
	};

	this.getStyle = function (elem, rule) {
		var result = '';
		if (document.defaultView && document.defaultView.getComputedStyle) {
			result = document.defaultView.getComputedStyle(elem, '').getPropertyValue(rule);
		} else if (elem.currentStyle) {
			rule = rule.replace(/\-(\w)/g, function (strMatch, p1) {
				return p1.toUpperCase();
			});
			result = elem.currentStyle[rule];
		}
		return result;
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

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Url = exports.Url = function Url() {
	var _this = this;

	this.getParams = function () {
		var query = window.location.search;
		if (!query) {
			return {};
		}

		return (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce(function (params, param) {
			var _param$split = param.split('='),
			    _param$split2 = _slicedToArray(_param$split, 2),
			    key = _param$split2[0],
			    value = _param$split2[1];

			params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
			return params;
		}, {});
	};

	this.getParam = function (name) {
		return _this.getParams()[name] || null;
	};

	this.getParamSingle = function (name) {
		if (name = new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)').exec(location.search)) {
			return decodeURIComponent(name[1]);
		}
		return null;
	};

	this.updateQueryString = function (name, value) {
		var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

		if (!url) url = window.location.href;
		var re = new RegExp("([?&])" + name + "=.*?(&|#|$)(.*)", "gi"),
		    hash;

		if (re.test(url)) {
			if (typeof value !== 'undefined' && value !== null) return url.replace(re, '$1' + name + "=" + value + '$2$3');else {
				hash = url.split('#');
				url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
				if (typeof hash[1] !== 'undefined' && hash[1] !== null) url += '#' + hash[1];
				return url;
			}
		} else {
			if (typeof value !== 'undefined' && value !== null) {
				var separator = url.indexOf('?') !== -1 ? '&' : '?';
				hash = url.split('#');
				url = hash[0] + separator + name + '=' + value;
				if (typeof hash[1] !== 'undefined' && hash[1] !== null) url += '#' + hash[1];
				return url;
			} else return url;
		}
	};

	this.setParam = function (name, value) {
		var url = _this.updateQueryString(name, value);
		window.history.pushState({ path: url }, '', url);
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
var DateTime = exports.DateTime = function DateTime() {

	this.timeAgo = function (previous) {
		var labels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		var postfix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

		labels['sec'] = labels && labels['sec'] ? labels['sec'] : 'sec.';
		labels['min'] = labels && labels['min'] ? labels['min'] : 'min.';
		labels['h'] = labels && labels['h'] ? labels['h'] : 'h.';
		labels['d'] = labels && labels['d'] ? labels['d'] : 'd.';
		labels['m'] = labels && labels['m'] ? labels['m'] : 'm.';
		labels['y'] = labels && labels['y'] ? labels['y'] : 'y.';
		if (!previous) return null;
		var current = +new Date(),
		    msPerMinute = 60 * 1000,
		    msPerHour = msPerMinute * 60,
		    msPerDay = msPerHour * 24,
		    msPerMonth = msPerDay * 30,
		    msPerYear = msPerDay * 365,
		    elapsed = current - previous,
		    result = '';
		console.log(new Date());
		if (elapsed < msPerMinute) {
			result = Math.round(elapsed / 1000) + ' ' + labels['sec'] + ' ' + postfix;
		} else if (elapsed < msPerHour) {
			result = Math.round(elapsed / msPerMinute) + ' ' + labels['min'] + ' ' + Math.round(elapsed % msPerMinute / 1000) + ' ' + labels['sec'] + ' ' + postfix;
		} else if (elapsed < msPerDay) {
			result = Math.round(elapsed / msPerHour) + ' ' + labels['h'] + ' ' + Math.round(elapsed % msPerHour / msPerMinute) + ' ' + labels['min'] + ' ' + postfix;
		} else if (elapsed < msPerMonth) {
			result = Math.round(elapsed / msPerDay) + ' ' + labels['d'] + ' ' + Math.round(elapsed % msPerDay / msPerHour) + ' ' + labels['h'] + ' ' + postfix;
		} else if (elapsed < msPerYear) {
			result = Math.round(elapsed / msPerMonth) + ' ' + labels['m'] + ' ' + Math.round(elapsed % msPerMonth / msPerDay) + ' ' + labels['d'] + ' ' + postfix;
		} else {
			result = Math.round(elapsed / msPerYear) + ' ' + labels['y'] + ' ' + Math.round(elapsed % msPerYear / msPerMonth) + ' ' + labels['m'] + ' ' + postfix;
		}
		return result;
	};
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Hash = exports.Hash = function Hash() {
	this.sha256 = function (s) {
		var chrsz = 8;
		var hexcase = 0;
		function safe_add(x, y) {
			var lsw = (x & 0xFFFF) + (y & 0xFFFF);
			var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
			return msw << 16 | lsw & 0xFFFF;
		}

		function S(X, n) {
			return X >>> n | X << 32 - n;
		}
		function R(X, n) {
			return X >>> n;
		}
		function Ch(x, y, z) {
			return x & y ^ ~x & z;
		}
		function Maj(x, y, z) {
			return x & y ^ x & z ^ y & z;
		}
		function Sigma0256(x) {
			return S(x, 2) ^ S(x, 13) ^ S(x, 22);
		}
		function Sigma1256(x) {
			return S(x, 6) ^ S(x, 11) ^ S(x, 25);
		}
		function Gamma0256(x) {
			return S(x, 7) ^ S(x, 18) ^ R(x, 3);
		}
		function Gamma1256(x) {
			return S(x, 17) ^ S(x, 19) ^ R(x, 10);
		}

		function core_sha256(m, l) {
			var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
			var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
			var W = new Array(64);
			var a, b, c, d, e, f, g, h, i, j;
			var T1, T2;

			m[l >> 5] |= 0x80 << 24 - l % 32;
			m[(l + 64 >> 9 << 4) + 15] = l;

			for (var i = 0; i < m.length; i += 16) {
				a = HASH[0];
				b = HASH[1];
				c = HASH[2];
				d = HASH[3];
				e = HASH[4];
				f = HASH[5];
				g = HASH[6];
				h = HASH[7];

				for (var j = 0; j < 64; j++) {
					if (j < 16) W[j] = m[j + i];else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

					T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
					T2 = safe_add(Sigma0256(a), Maj(a, b, c));

					h = g;
					g = f;
					f = e;
					e = safe_add(d, T1);
					d = c;
					c = b;
					b = a;
					a = safe_add(T1, T2);
				}

				HASH[0] = safe_add(a, HASH[0]);
				HASH[1] = safe_add(b, HASH[1]);
				HASH[2] = safe_add(c, HASH[2]);
				HASH[3] = safe_add(d, HASH[3]);
				HASH[4] = safe_add(e, HASH[4]);
				HASH[5] = safe_add(f, HASH[5]);
				HASH[6] = safe_add(g, HASH[6]);
				HASH[7] = safe_add(h, HASH[7]);
			}
			return HASH;
		}

		function str2binb(str) {
			var bin = Array();
			var mask = (1 << chrsz) - 1;
			for (var i = 0; i < str.length * chrsz; i += chrsz) {
				bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << 24 - i % 32;
			}
			return bin;
		}

		function Utf8Encode(string) {
			string = string.replace(/\r\n/g, "\n");
			var utftext = "";

			for (var n = 0; n < string.length; n++) {

				var c = string.charCodeAt(n);

				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if (c > 127 && c < 2048) {
					utftext += String.fromCharCode(c >> 6 | 192);
					utftext += String.fromCharCode(c & 63 | 128);
				} else {
					utftext += String.fromCharCode(c >> 12 | 224);
					utftext += String.fromCharCode(c >> 6 & 63 | 128);
					utftext += String.fromCharCode(c & 63 | 128);
				}
			}

			return utftext;
		}

		function binb2hex(binarray) {
			var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
			var str = "";
			for (var i = 0; i < binarray.length * 4; i++) {
				str += hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 & 0xF);
			}
			return str;
		}

		s = Utf8Encode(s);
		return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
	};
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var InView = exports.InView = function InView(selector, options) {
    this.items = document.querySelectorAll(selector);
    this.in = options.in ? options.in : false;
    this.out = options.out ? options.out : false;
    this.scrollTop = 0;
    this.offset = options.offset ? options.offset : 0;

    this.setScrollTop = function (top) {
        this.scrollTop = top;
    };

    this.checkItem = function (e) {
        var elem = e.getBoundingClientRect(),
            offset = this.offset,
            windowHeight = window.innerHeight;
        if (elem.top + offset + windowHeight <= windowHeight * 2 && elem.top - offset + elem.height >= 0) {
            return true;
        }
        return false;
    };

    this.checkItems = function () {
        var _this = this;

        if (!this.items) return false;
        this.items.forEach(function (e, i) {
            var boolCheck = _this.checkItem(e);
            if (boolCheck && _this.in) _this.in(e);
            if (!boolCheck && _this.out) _this.out(e);
        });
    };

    this.watch = function () {
        var _this2 = this;

        this.setScrollTop(window.pageYOffset);
        this.checkItems();
        window.addEventListener('scroll', function () {
            _this2.setScrollTop(window.pageYOffset);
            _this2.checkItems();
        });
        window.addEventListener('resize', function () {
            _this2.setScrollTop(window.pageYOffset);
            _this2.checkItems();
        });
    };

    this.watch();
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Map = exports.Map = function Map() {

    this.getDistance = function (coordOne, coordTwo) {
        if (!coordOne || !coordTwo) return 0;
        var EarthRadius = 6371,
            dLat = (coordTwo[0] - coordOne[0]) * Math.PI / 180,
            dLon = (coordTwo[1] - coordOne[1]) * Math.PI / 180,
            a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(coordOne[0] * Math.PI / 180) * Math.cos(coordTwo[0] * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2),
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return Math.round(EarthRadius * c * 1000);
    };
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Money = exports.Money = function Money() {

    this.format = function (string) {
        var deliver = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';

        if (!string) return 0;
        string = parseFloat(string);
        string = string.toString().replace(/\./.test(string) ? /(\d)(?=(?:\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g, '$1' + deliver);
        return string;
    };
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var AjaxNavigation = exports.AjaxNavigation = function AjaxNavigation(options) {

    this.options = options;
    this.options.container = this.options.container ? this.options.container : '#app';
    this.options.navItems = this.options.navItems ? this.options.navItems : '.ajax';
    this.options.preloader = this.options.preloader ? true : false;
    this.beforeInit = this.options.beforeInit ? this.options.beforeInit : false;
    this.afterInit = this.options.afterInit ? this.options.afterInit : false;
    this.beforeRendered = this.options.beforeRendered ? this.options.beforeRendered : false;
    this.afterRendered = this.options.afterRendered ? this.options.afterRendered : false;
    this.app = document.querySelector(this.options.container);
    this.isLoadProcess = false;
    this.exact = this.options.exact ? true : false;

    this.get = function (url, method, data, callbackSuccess, callbackError) {
        var res,
            xhr = new XMLHttpRequest(),
            param,
            body = '',
            self = this;
        for (param in data) {
            body += encodeURIComponent(param) + '=' + encodeURIComponent(data[param]) + '&';
        }
        if (method === 'GET' && body) {
            url = url + '?' + body;
        }
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        method === 'GET' ? xhr.setRequestHeader('X-REQUESTED-WITH', 'XMLHttpRequest') : '';
        xhr.send(body);
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
                callbackError(xhr);
            } else {
                res = xhr.responseText;
                callbackSuccess(res);
            }
        };
    };

    this.createPreloader = function () {
        var preloader = document.createElement('div'),
            preloaderSpinner = document.createElement('div');
        preloader.classList.add('preloader');
        preloaderSpinner.classList.add('preloader-spinner');
        preloader.appendChild(preloaderSpinner);
        return preloader;
    };

    this.appendPreloader = function () {
        var self = this;
        this.preloader = this.createPreloader();
        document.body.appendChild(this.preloader);
        setTimeout(function () {
            self.preloader.classList.add('preloader__visible');
        }, 0);
    };

    this.removePreloader = function () {
        var self = this;
        self.preloader.classList.remove('preloader__visible');
        setTimeout(function () {
            self.preloader.parentNode.removeChild(self.preloader);
        }, 400);
    };

    this.loadStart = function () {
        this.isLoadProcess = true;
        this.options.preloader ? this.appendPreloader() : '';
    };

    this.loadEnd = function () {
        this.isLoadProcess = false;
        this.options.preloader ? this.removePreloader() : '';
    };

    this.parseAndReplace = function (DOMString, href, addToHistory) {
        var self = this,
            parser = new DOMParser(),
            dom = parser.parseFromString(DOMString, 'text/html'),
            replaced = document.querySelector(self.options.container),
            replacement = dom.querySelector(self.options.container),
            newTitle = dom.head.querySelector('title').innerHTML,
            newBodyClass = dom.body.className;
        document.body.className = newBodyClass;
        document.querySelector('head title').innerHTML = newTitle;
        if (!replacement || !replaced) {
            window.location = href;
            return;
        }
        replaced.parentNode.replaceChild(replacement, replaced);
        if (addToHistory) history.pushState(null, null, href);
        self.addLinksEvent(self.options.navItems);
        if (self.afterRendered) self.afterRendered(replacement);
        self.loadEnd();
    };

    this.getContent = function (href, addToHistory) {
        var self = this;
        if (self.beforeRendered) self.beforeRendered();
        if (self.exact && this.href === location.href || self.isLoadProcess) return;

        self.loadStart();
        self.get(href, 'POST', {}, function (DOMString) {
            self.parseAndReplace(DOMString, href, addToHistory);
        }, function (error) {
            if (error.status === 404) {
                self.parseAndReplace(error.responseText, href, addToHistory);
            } else {
                self.loadEnd();
            }
            if (error.status === 0) {
                window.open(href);
            }
        });
    };

    this.addLinksEvent = function (selector) {
        var self = this,
            selector = selector ? selector : this.options.navItems,
            links = document.querySelectorAll(selector);
        for (var i = 0; i < links.length; i++) {
            if (links[i] instanceof Element && links[i].tagName.toLowerCase() === 'a') {
                links[i].addEventListener('click', function (e) {
                    e.preventDefault();
                    var href = this.href;
                    self.getContent(href, true);
                });
            }
        }
    };

    this.popStateListener = function () {
        var self = this;
        window.addEventListener("popstate", function (e) {
            self.getContent(location.pathname + location.search, false);
        });
    };

    this.goTo = function (url) {
        this.getContent(url, true);
    };

    this.init = function () {
        var _this = this;

        this.loadStart();
        window.addEventListener('load', function () {
            _this.loadEnd();
        });
        if (this.beforeInit) this.beforeInit();
        this.addLinksEvent(this.options.navItems);
        this.popStateListener();
        if (this.afterRendered) this.afterRendered(document.querySelector(this.options.container));
        if (this.afterInit) this.afterInit();
        return this;
    };

    return this.init();
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Detection = exports.Detection = function Detection() {
    this.isMobile = function () {
        return (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        );
    };
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map