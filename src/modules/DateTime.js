export const DateTime = function(){

	this.timeAgo = function(previous, labels = {}, postfix=''){
		labels['sec'] = labels && labels['sec'] ? labels['sec'] : 'sec.';
		labels['min'] = labels && labels['min'] ? labels['min'] : 'min.';
		labels['h'] = labels && labels['h'] ? labels['h'] : 'h.';
		labels['d'] = labels && labels['d'] ? labels['d'] : 'd.';
		labels['m'] = labels && labels['m'] ? labels['m'] : 'm.';
		labels['y'] = labels && labels['y'] ? labels['y'] : 'y.';
		if(!previous) return null;
		let current = +new Date(),
			msPerMinute = 60 * 1000,
			msPerHour = msPerMinute * 60,
			msPerDay = msPerHour * 24,
			msPerMonth = msPerDay * 30,
			msPerYear = msPerDay * 365,
			elapsed = current - previous,
			result = '';
		console.log(new Date());
		if (elapsed < msPerMinute) {
			result = Math.round(elapsed/1000) + ' '+labels['sec']+' '+postfix;   
		}	
		else if (elapsed < msPerHour) {
			result = Math.round(elapsed/msPerMinute) + ' '+labels['min']+' '+Math.round((elapsed%msPerMinute)/1000) + ' '+labels['sec']+' '+postfix;   
		}	
		else if (elapsed < msPerDay ) {
			result = Math.round(elapsed/msPerHour) + ' '+labels['h']+' '+Math.round((elapsed%msPerHour) / msPerMinute) + ' '+labels['min']+' '+postfix;
		}	
		else if (elapsed < msPerMonth) {
			result = Math.round(elapsed/msPerDay) + ' '+labels['d']+' '+Math.round((elapsed%msPerDay) / msPerHour) + ' '+labels['h']+' '+postfix;
		}	
		else if (elapsed < msPerYear) {
			result = Math.round(elapsed/msPerMonth) + ' '+labels['m']+' '+Math.round((elapsed%msPerMonth) / msPerDay) + ' '+labels['d']+' '+postfix;
		}	
		else {
			result = Math.round(elapsed/msPerYear ) + ' '+labels['y']+' '+Math.round((elapsed%msPerYear) / msPerMonth) + ' '+labels['m']+' '+postfix;
		}
		return result;
	};
	
};