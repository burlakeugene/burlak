!function(e,r){if("object"==typeof exports&&"object"==typeof module)module.exports=r();else if("function"==typeof define&&define.amd)define([],r);else{var n=r();for(var t in n)("object"==typeof exports?exports:e)[t]=n[t]}}(self,(()=>(()=>{"use strict";var e,r,n={7:(e,r,n)=>{n.r(r),n(977);var t=function(e,r){return r?e:0===e?6:e-1};const o=function(e){void 0===e&&(e={});for(var r=e.year,n=void 0===r?(new Date).getFullYear():r,o=e.month,a=void 0===o?(new Date).getMonth():o,i=e.weekStartFromSunday,c=void 0!==i&&i,d={date:new Date(n,a),count:new Date(n,a+1,0).getDate(),firstWeekDay:t(new Date(n,a).getDay(),c),lastWeekDay:t(new Date(new Date(n,a).setDate(new Date(n,a+1,0).getDate())).getDay(),c)},u={date:new Date(n,a,0),count:new Date(n,a,0).getDate()},s={date:new Date(n,a+1)},l=[],f=d.firstWeekDay-1;f>=0;f--)l.push({day:u.count-f,month:u.date.getMonth(),year:u.date.getFullYear(),prev:!0});for(f=1;f<=d.count;f++)l.push({day:f,month:d.date.getMonth(),year:d.date.getFullYear(),current:!0});for(f=1;f<=6-d.lastWeekDay;f++)l.push({day:f,month:s.date.getMonth(),year:s.date.getFullYear(),next:!0});var p=new Date;return l.forEach((function(e){e.day===p.getDate()&&e.year===p.getFullYear()&&e.month===p.getMonth()&&(e.today=!0)})),l}(),a=document.createElement("div");a.classList.add("calendar"),o.forEach((e=>{const r=document.createElement("div");r.classList.add("day"),e.current&&r.classList.add("current"),e.today&&r.classList.add("today"),r.textContent=e.day,a.appendChild(r)})),document.body.appendChild(a)},458:(e,r,n)=>{n.r(r),n.d(r,{default:()=>c});var t=n(354),o=n.n(t),a=n(314),i=n.n(a)()(o());i.push([e.id,"*{box-sizing:border-box}.calendar{display:flex;flex-wrap:wrap}.day{flex-shrink:0;width:14.2857142857%;padding:10px;display:flex;align-items:center;justify-content:center;opacity:.2}.day.current{opacity:1}.day.today{color:red}","",{version:3,sources:["webpack://./src/app/style.scss"],names:[],mappings:"AAAA,EACE,qBAAA,CAEF,UACE,YAAA,CACA,cAAA,CAGF,KACE,aAAA,CACA,oBAAA,CACA,YAAA,CACA,YAAA,CACA,kBAAA,CACA,sBAAA,CACA,UAAA,CACA,aACE,SAAA,CAEF,WACE,SAAA",sourcesContent:["*{\n  box-sizing: border-box;\n}\n.calendar{\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.day{\n  flex-shrink: 0;\n  width: calc(100% / 7);\n  padding: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0.2;\n  &.current{\n    opacity: 1;\n  }\n  &.today{\n    color:red;\n  }\n}"],sourceRoot:""}]);const c=i},314:e=>{e.exports=function(e){var r=[];return r.toString=function(){return this.map((function(r){var n="",t=void 0!==r[5];return r[4]&&(n+="@supports (".concat(r[4],") {")),r[2]&&(n+="@media ".concat(r[2]," {")),t&&(n+="@layer".concat(r[5].length>0?" ".concat(r[5]):""," {")),n+=e(r),t&&(n+="}"),r[2]&&(n+="}"),r[4]&&(n+="}"),n})).join("")},r.i=function(e,n,t,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(t)for(var c=0;c<this.length;c++){var d=this[c][0];null!=d&&(i[d]=!0)}for(var u=0;u<e.length;u++){var s=[].concat(e[u]);t&&i[s[0]]||(void 0!==a&&(void 0===s[5]||(s[1]="@layer".concat(s[5].length>0?" ".concat(s[5]):""," {").concat(s[1],"}")),s[5]=a),n&&(s[2]?(s[1]="@media ".concat(s[2]," {").concat(s[1],"}"),s[2]=n):s[2]=n),o&&(s[4]?(s[1]="@supports (".concat(s[4],") {").concat(s[1],"}"),s[4]=o):s[4]="".concat(o)),r.push(s))}},r}},354:e=>{e.exports=function(e){var r=e[1],n=e[3];if(!n)return r;if("function"==typeof btoa){var t=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(t),a="/*# ".concat(o," */");return[r].concat([a]).join("\n")}return[r].join("\n")}},977:(e,r,n)=>{var t=n(72),o=n.n(t),a=n(825),i=n.n(a),c=n(659),d=n.n(c),u=n(56),s=n.n(u),l=n(540),f=n.n(l),p=n(113),h=n.n(p),v=n(458),m={};m.styleTagTransform=h(),m.setAttributes=s(),m.insert=d().bind(null,"head"),m.domAPI=i(),m.insertStyleElement=f();var y=o()(v.default,m);if(!v.default.locals||e.hot.invalidate){var g=!v.default.locals,A=g?v:v.default.locals;e.hot.accept(458,(r=>{v=n(458),function(e,r,n){if(!e&&r||e&&!r)return!1;var t;for(t in e)if((!n||"default"!==t)&&e[t]!==r[t])return!1;for(t in r)if(!(n&&"default"===t||e[t]))return!1;return!0}(A,g?v:v.default.locals,g)?(A=g?v:v.default.locals,y(v.default)):e.hot.invalidate()}))}e.hot.dispose((function(){y()})),v.default&&v.default.locals&&v.default.locals},72:e=>{var r=[];function n(e){for(var n=-1,t=0;t<r.length;t++)if(r[t].identifier===e){n=t;break}return n}function t(e,t){for(var a={},i=[],c=0;c<e.length;c++){var d=e[c],u=t.base?d[0]+t.base:d[0],s=a[u]||0,l="".concat(u," ").concat(s);a[u]=s+1;var f=n(l),p={css:d[1],media:d[2],sourceMap:d[3],supports:d[4],layer:d[5]};if(-1!==f)r[f].references++,r[f].updater(p);else{var h=o(p,t);t.byIndex=c,r.splice(c,0,{identifier:l,updater:h,references:1})}i.push(l)}return i}function o(e,r){var n=r.domAPI(r);return n.update(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap&&r.supports===e.supports&&r.layer===e.layer)return;n.update(e=r)}else n.remove()}}e.exports=function(e,o){var a=t(e=e||[],o=o||{});return function(e){e=e||[];for(var i=0;i<a.length;i++){var c=n(a[i]);r[c].references--}for(var d=t(e,o),u=0;u<a.length;u++){var s=n(a[u]);0===r[s].references&&(r[s].updater(),r.splice(s,1))}a=d}}},659:e=>{var r={};e.exports=function(e,n){var t=function(e){if(void 0===r[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}r[e]=n}return r[e]}(e);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");t.appendChild(n)}},540:e=>{e.exports=function(e){var r=document.createElement("style");return e.setAttributes(r,e.attributes),e.insert(r,e.options),r}},56:(e,r,n)=>{e.exports=function(e){var r=n.nc;r&&e.setAttribute("nonce",r)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var r=e.insertStyleElement(e);return{update:function(n){!function(e,r,n){var t="";n.supports&&(t+="@supports (".concat(n.supports,") {")),n.media&&(t+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(t+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),t+=n.css,o&&(t+="}"),n.media&&(t+="}"),n.supports&&(t+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),r.styleTagTransform(t,e,r.options)}(r,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(r)}}}},113:e=>{e.exports=function(e,r){if(r.styleSheet)r.styleSheet.cssText=e;else{for(;r.firstChild;)r.removeChild(r.firstChild);r.appendChild(document.createTextNode(e))}}}},t={};function o(e){var r=t[e];if(void 0!==r){if(void 0!==r.error)throw r.error;return r.exports}var a=t[e]={id:e,exports:{}};try{var i={id:e,module:a,factory:n[e],require:o};o.i.forEach((function(e){e(i)})),a=i.module,i.factory.call(a.exports,a,a.exports,i.require)}catch(e){throw a.error=e,e}return a.exports}return o.m=n,o.c=t,o.i=[],o.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return o.d(r,{a:r}),r},o.d=(e,r)=>{for(var n in r)o.o(r,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},o.hu=e=>e+"."+o.h()+".hot-update.js",o.hmrF=()=>"main."+o.h()+".hot-update.json",o.h=()=>"e707604666ef900f924f",o.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),e={},r="burlak:",o.l=(n,t,a,i)=>{if(e[n])e[n].push(t);else{var c,d;if(void 0!==a)for(var u=document.getElementsByTagName("script"),s=0;s<u.length;s++){var l=u[s];if(l.getAttribute("src")==n||l.getAttribute("data-webpack")==r+a){c=l;break}}c||(d=!0,(c=document.createElement("script")).charset="utf-8",c.timeout=120,o.nc&&c.setAttribute("nonce",o.nc),c.setAttribute("data-webpack",r+a),c.src=n),e[n]=[t];var f=(r,t)=>{c.onerror=c.onload=null,clearTimeout(p);var o=e[n];if(delete e[n],c.parentNode&&c.parentNode.removeChild(c),o&&o.forEach((e=>e(t))),r)return r(t)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=f.bind(null,c.onerror),c.onload=f.bind(null,c.onload),d&&document.head.appendChild(c)}},o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e,r,n,t={},a=o.c,i=[],c=[],d="idle",u=0,s=[];function l(e){d=e;for(var r=[],n=0;n<c.length;n++)r[n]=c[n].call(null,e);return Promise.all(r).then((function(){}))}function f(){0==--u&&l("ready").then((function(){if(0===u){var e=s;s=[];for(var r=0;r<e.length;r++)e[r]()}}))}function p(e){if("idle"!==d)throw new Error("check() is only allowed in idle status");return l("check").then(o.hmrM).then((function(n){return n?l("prepare").then((function(){var t=[];return r=[],Promise.all(Object.keys(o.hmrC).reduce((function(e,a){return o.hmrC[a](n.c,n.r,n.m,e,r,t),e}),[])).then((function(){return r=function(){return e?v(e):l("ready").then((function(){return t}))},0===u?r():new Promise((function(e){s.push((function(){e(r())}))}));var r}))})):l(m()?"ready":"idle").then((function(){return null}))}))}function h(e){return"ready"!==d?Promise.resolve().then((function(){throw new Error("apply() is only allowed in ready status (state: "+d+")")})):v(e)}function v(e){e=e||{},m();var t=r.map((function(r){return r(e)}));r=void 0;var o=t.map((function(e){return e.error})).filter(Boolean);if(o.length>0)return l("abort").then((function(){throw o[0]}));var a=l("dispose");t.forEach((function(e){e.dispose&&e.dispose()}));var i,c=l("apply"),d=function(e){i||(i=e)},u=[];return t.forEach((function(e){if(e.apply){var r=e.apply(d);if(r)for(var n=0;n<r.length;n++)u.push(r[n])}})),Promise.all([a,c]).then((function(){return i?l("fail").then((function(){throw i})):n?v(e).then((function(e){return u.forEach((function(r){e.indexOf(r)<0&&e.push(r)})),e})):l("idle").then((function(){return u}))}))}function m(){if(n)return r||(r=[]),Object.keys(o.hmrI).forEach((function(e){n.forEach((function(n){o.hmrI[e](n,r)}))})),n=void 0,!0}o.hmrD=t,o.i.push((function(s){var v,m,y,g,A=s.module,b=function(r,n){var t=a[n];if(!t)return r;var o=function(o){if(t.hot.active){if(a[o]){var c=a[o].parents;-1===c.indexOf(n)&&c.push(n)}else i=[n],e=o;-1===t.children.indexOf(o)&&t.children.push(o)}else console.warn("[HMR] unexpected require("+o+") from disposed module "+n),i=[];return r(o)},c=function(e){return{configurable:!0,enumerable:!0,get:function(){return r[e]},set:function(n){r[e]=n}}};for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&"e"!==s&&Object.defineProperty(o,s,c(s));return o.e=function(e,n){return function(e){switch(d){case"ready":l("prepare");case"prepare":return u++,e.then(f,f),e;default:return e}}(r.e(e,n))},o}(s.require,s.id);A.hot=(v=s.id,m=A,g={_acceptedDependencies:{},_acceptedErrorHandlers:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:y=e!==v,_requireSelf:function(){i=m.parents.slice(),e=y?void 0:v,o(v)},active:!0,accept:function(e,r,n){if(void 0===e)g._selfAccepted=!0;else if("function"==typeof e)g._selfAccepted=e;else if("object"==typeof e&&null!==e)for(var t=0;t<e.length;t++)g._acceptedDependencies[e[t]]=r||function(){},g._acceptedErrorHandlers[e[t]]=n;else g._acceptedDependencies[e]=r||function(){},g._acceptedErrorHandlers[e]=n},decline:function(e){if(void 0===e)g._selfDeclined=!0;else if("object"==typeof e&&null!==e)for(var r=0;r<e.length;r++)g._declinedDependencies[e[r]]=!0;else g._declinedDependencies[e]=!0},dispose:function(e){g._disposeHandlers.push(e)},addDisposeHandler:function(e){g._disposeHandlers.push(e)},removeDisposeHandler:function(e){var r=g._disposeHandlers.indexOf(e);r>=0&&g._disposeHandlers.splice(r,1)},invalidate:function(){switch(this._selfInvalidated=!0,d){case"idle":r=[],Object.keys(o.hmrI).forEach((function(e){o.hmrI[e](v,r)})),l("ready");break;case"ready":Object.keys(o.hmrI).forEach((function(e){o.hmrI[e](v,r)}));break;case"prepare":case"check":case"dispose":case"apply":(n=n||[]).push(v)}},check:p,apply:h,status:function(e){if(!e)return d;c.push(e)},addStatusHandler:function(e){c.push(e)},removeStatusHandler:function(e){var r=c.indexOf(e);r>=0&&c.splice(r,1)},data:t[v]},e=void 0,g),A.parents=i,A.children=[],i=[],s.require=b})),o.hmrC={},o.hmrI={}})(),o.p="./",(()=>{var e,r,n,t,a,i=o.hmrS_jsonp=o.hmrS_jsonp||{792:0},c={};function d(r,n){return e=n,new Promise(((e,n)=>{c[r]=e;var t=o.p+o.hu(r),a=new Error;o.l(t,(e=>{if(c[r]){c[r]=void 0;var t=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;a.message="Loading hot update chunk "+r+" failed.\n("+t+": "+o+")",a.name="ChunkLoadError",a.type=t,a.request=o,n(a)}}))}))}function u(e){function c(e){for(var r=[e],n={},t=r.map((function(e){return{chain:[e],id:e}}));t.length>0;){var a=t.pop(),i=a.id,c=a.chain,u=o.c[i];if(u&&(!u.hot._selfAccepted||u.hot._selfInvalidated)){if(u.hot._selfDeclined)return{type:"self-declined",chain:c,moduleId:i};if(u.hot._main)return{type:"unaccepted",chain:c,moduleId:i};for(var s=0;s<u.parents.length;s++){var l=u.parents[s],f=o.c[l];if(f){if(f.hot._declinedDependencies[i])return{type:"declined",chain:c.concat([l]),moduleId:i,parentId:l};-1===r.indexOf(l)&&(f.hot._acceptedDependencies[i]?(n[l]||(n[l]=[]),d(n[l],[i])):(delete n[l],r.push(l),t.push({chain:c.concat([l]),id:l})))}}}}return{type:"accepted",moduleId:e,outdatedModules:r,outdatedDependencies:n}}function d(e,r){for(var n=0;n<r.length;n++){var t=r[n];-1===e.indexOf(t)&&e.push(t)}}o.f&&delete o.f.jsonpHmr,r=void 0;var u={},s=[],l={},f=function(e){console.warn("[HMR] unexpected require("+e.id+") to disposed module")};for(var p in n)if(o.o(n,p)){var h,v=n[p],m=!1,y=!1,g=!1,A="";switch((h=v?c(p):{type:"disposed",moduleId:p}).chain&&(A="\nUpdate propagation: "+h.chain.join(" -> ")),h.type){case"self-declined":e.onDeclined&&e.onDeclined(h),e.ignoreDeclined||(m=new Error("Aborted because of self decline: "+h.moduleId+A));break;case"declined":e.onDeclined&&e.onDeclined(h),e.ignoreDeclined||(m=new Error("Aborted because of declined dependency: "+h.moduleId+" in "+h.parentId+A));break;case"unaccepted":e.onUnaccepted&&e.onUnaccepted(h),e.ignoreUnaccepted||(m=new Error("Aborted because "+p+" is not accepted"+A));break;case"accepted":e.onAccepted&&e.onAccepted(h),y=!0;break;case"disposed":e.onDisposed&&e.onDisposed(h),g=!0;break;default:throw new Error("Unexception type "+h.type)}if(m)return{error:m};if(y)for(p in l[p]=v,d(s,h.outdatedModules),h.outdatedDependencies)o.o(h.outdatedDependencies,p)&&(u[p]||(u[p]=[]),d(u[p],h.outdatedDependencies[p]));g&&(d(s,[h.moduleId]),l[p]=f)}n=void 0;for(var b,w=[],E=0;E<s.length;E++){var D=s[E],x=o.c[D];x&&(x.hot._selfAccepted||x.hot._main)&&l[D]!==f&&!x.hot._selfInvalidated&&w.push({module:D,require:x.hot._requireSelf,errorHandler:x.hot._selfAccepted})}return{dispose:function(){var e;t.forEach((function(e){delete i[e]})),t=void 0;for(var r,n=s.slice();n.length>0;){var a=n.pop(),c=o.c[a];if(c){var d={},l=c.hot._disposeHandlers;for(E=0;E<l.length;E++)l[E].call(null,d);for(o.hmrD[a]=d,c.hot.active=!1,delete o.c[a],delete u[a],E=0;E<c.children.length;E++){var f=o.c[c.children[E]];f&&(e=f.parents.indexOf(a))>=0&&f.parents.splice(e,1)}}}for(var p in u)if(o.o(u,p)&&(c=o.c[p]))for(b=u[p],E=0;E<b.length;E++)r=b[E],(e=c.children.indexOf(r))>=0&&c.children.splice(e,1)},apply:function(r){for(var n in l)o.o(l,n)&&(o.m[n]=l[n]);for(var t=0;t<a.length;t++)a[t](o);for(var i in u)if(o.o(u,i)){var c=o.c[i];if(c){b=u[i];for(var d=[],f=[],p=[],h=0;h<b.length;h++){var v=b[h],m=c.hot._acceptedDependencies[v],y=c.hot._acceptedErrorHandlers[v];if(m){if(-1!==d.indexOf(m))continue;d.push(m),f.push(y),p.push(v)}}for(var g=0;g<d.length;g++)try{d[g].call(null,b)}catch(n){if("function"==typeof f[g])try{f[g](n,{moduleId:i,dependencyId:p[g]})}catch(t){e.onErrored&&e.onErrored({type:"accept-error-handler-errored",moduleId:i,dependencyId:p[g],error:t,originalError:n}),e.ignoreErrored||(r(t),r(n))}else e.onErrored&&e.onErrored({type:"accept-errored",moduleId:i,dependencyId:p[g],error:n}),e.ignoreErrored||r(n)}}}for(var A=0;A<w.length;A++){var E=w[A],D=E.module;try{E.require(D)}catch(n){if("function"==typeof E.errorHandler)try{E.errorHandler(n,{moduleId:D,module:o.c[D]})}catch(t){e.onErrored&&e.onErrored({type:"self-accept-error-handler-errored",moduleId:D,error:t,originalError:n}),e.ignoreErrored||(r(t),r(n))}else e.onErrored&&e.onErrored({type:"self-accept-errored",moduleId:D,error:n}),e.ignoreErrored||r(n)}}return s}}}self.webpackHotUpdateburlak=(r,t,i)=>{for(var d in t)o.o(t,d)&&(n[d]=t[d],e&&e.push(d));i&&a.push(i),c[r]&&(c[r](),c[r]=void 0)},o.hmrI.jsonp=function(e,r){n||(n={},a=[],t=[],r.push(u)),o.o(n,e)||(n[e]=o.m[e])},o.hmrC.jsonp=function(e,c,s,l,f,p){f.push(u),r={},t=c,n=s.reduce((function(e,r){return e[r]=!1,e}),{}),a=[],e.forEach((function(e){o.o(i,e)&&void 0!==i[e]?(l.push(d(e,p)),r[e]=!0):r[e]=!1})),o.f&&(o.f.jsonpHmr=function(e,n){r&&o.o(r,e)&&!r[e]&&(n.push(d(e)),r[e]=!0)})},o.hmrM=()=>{if("undefined"==typeof fetch)throw new Error("No browser support: need fetch API");return fetch(o.p+o.hmrF()).then((e=>{if(404!==e.status){if(!e.ok)throw new Error("Failed to fetch update manifest "+e.statusText);return e.json()}}))}})(),o.nc=void 0,o(7)})()));
//# sourceMappingURL=bundle.js.map