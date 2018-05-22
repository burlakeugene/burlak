export const Storage = function(){
	const localStorage = window.localStorage;
	this.set = function(name, value){
		localStorage.setItem(name, value);
		return this.get(name);
	}
	this.get = function(name){
		return localStorage.getItem(name) || null;
	};
	this.remove = function(name){
		localStorage.removeItem(name);
		return true;
	}
	this.clear = function(){
		localStorage.clear();
		return true;
	}
};