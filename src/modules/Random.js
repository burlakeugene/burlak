export const Random = function(){
	this.defaultSystem = 10;
	this.defaultLength = 13;
	this.defaultUIdCount = 4;
	this.maxLength = this.defaultLength;

	this.single = function(system = this.defaultSystem, length = this.defaultLength){
		if(length > this.maxLength){
			length = this.maxLength;
			console.warn('Max length of random number is '+ this.maxLength);
		}
		let rand = window.Math.floor((window.Math.random()) * 0x10000000000000),
			result;
		rand = rand.toString(system).substring(1),
		result = rand.split('').splice(0, length).join('');
		return result;
	};

	this.multy = function(count = this.defaultUIdCount, system = this.defaultSystem, length = this.defaultLength){
		let result = '';
		for(let i = 0; i < count; i++){
			result += this.single(system, length)+'-';
			if(i == count-1) result = result.substring(0, result.length-1);
		}
		return result;
	}

	this.between = function(min = 0, max = 100){
		min = parseInt(min);
		max = parseInt(max);
		if(!isNaN(min) && !isNaN(max)){
			if(min > max){
				return Math.floor(Math.random()*(min-max+1)+max);
			}
			else{
				return Math.floor(Math.random()*(max-min+1)+min);
			}
		}
		return false;
	}
};