export const Dom = function(){
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

	this.removeElem = function(elem){
		if(Element.prototype.remove) {
			elem.remove();
		}
		else{
			var parent = elem.parentNode;
			parent.removeChild(elem);
		}
	};

	this.getStyle = function (elem, rule){
		var result = '';
		if(document.defaultView && document.defaultView.getComputedStyle){
			result = document.defaultView.getComputedStyle(elem, '').getPropertyValue(rule);
		}
		else if(elem.currentStyle){
			rule = rule.replace(/\-(\w)/g, function (strMatch, p1){
				return p1.toUpperCase();
			});
			result = elem.currentStyle[rule];
		}
		return result;
	}

};