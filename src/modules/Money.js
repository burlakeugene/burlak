export const Money = function(){
    
	this.format = function(string, deliver = ' '){
        if(!string) return 0;
        string = parseFloat(string);        
        string = string.toString().replace((
            /\./.test(string)
                ? /(\d)(?=(?:\d{3})+\.)/g
                : /(\d)(?=(?:\d{3})+$)/g
            ), '$1'+deliver);
        return string; 
    };

};