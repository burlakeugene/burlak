!function(t){var e={};function i(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(o,n,function(e){return t[e]}.bind(null,n));return o},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){t.exports=i(1)},function(t,e,i){"use strict";i.r(e);var o=function(t,e){this.getItems=function(t){return t instanceof NodeList?t:t instanceof Node?[t]:document.querySelectorAll(t)},this.items=this.getItems(t),this.in=!!e.in&&e.in,this.out=!!e.out&&e.out,this.activeList=!!e.activeList&&e.activeList,this.scrollTop=0,this.offset=e.offset?e.offset:0,this.dynamicDom=!!e.dynamicDom&&e.dynamicDom,this.intervalChecking=!!e.intervalChecking&&e.intervalChecking,this.setScrollTop=function(t){this.scrollTop=t},this.checkItem=function(t){var e=t.getBoundingClientRect(),i=parseFloat(this.offset)||0,o=parseFloat(this.offset)||0,n=window.innerHeight;window.getComputedStyle(t);return this.offset&&this.offset.top&&parseFloat(this.offset.top)&&(i=parseFloat(this.offset.top)),this.offset&&this.offset.bottom&&parseFloat(this.offset.bottom)&&(o=parseFloat(this.offset.bottom)),e.top-i+e.height>=0&&e.top+o+n<=2*n?{bool:!0}:e.top+o+n>2*n?{bool:!1,direction:"bottom"}:e.top-i+e.height<0?{bool:!1,direction:"top"}:void 0},this.checkItems=function(){var e=this;if(this.items=this.dynamicDom?this.getItems(t):this.items,!this.items)return!1;var i=[];this.items.forEach((function(t,o){var n=e.checkItem(t);n.bool&&e.in&&e.in(t),n.bool&&e.activeList&&i.push(t),!n.bool&&e.out&&e.out(t,n.direction)})),this.activeList&&this.activeList(i)},this.watch=function(){var t=this;new MutationObserver((function(t){t.forEach((function(t){console.log(t)}))})).observe(document.documentElement,{attributes:!0,characterData:!0,childList:!0,subtree:!0,attributeOldValue:!0,characterDataOldValue:!0}),this.setScrollTop(window.pageYOffset),this.checkItems(),this.intervalChecking&&setInterval((function(){t.setScrollTop(window.pageYOffset),t.checkItems()}),this.intervalChecking),window.addEventListener("scroll",(function(){t.setScrollTop(window.pageYOffset),t.checkItems()})),window.addEventListener("resize",(function(){t.setScrollTop(window.pageYOffset),t.checkItems()}))},this.watch()};var n=document.querySelectorAll(".list__toggle");n.length&&n.forEach((function(t){t.addEventListener("click",(function(t){t.target.closest(".list").querySelector(".list__inner").classList.toggle("active")}))})),new o("[data-animate]",{offset:40,intervalChecking:50,in:function(t){t.hasAttribute("data-animated")||t.setAttribute("data-animated","")},out:function(t,e){t.removeAttribute("data-animated")},activeList:function(t){}})}]);
//# sourceMappingURL=bundle.js.map