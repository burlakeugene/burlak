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
};