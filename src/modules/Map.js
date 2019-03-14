export const Map = function(){

	this.getDistance = function(coordOne, coordTwo){
        if(!coordOne || !coordTwo) return 0;
        let EarthRadius = 6371,
            dLat = ((coordTwo[0] - coordOne[0]) * Math.PI / 180),
            dLon = ((coordTwo[1] - coordOne[1]) * Math.PI / 180),
            a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(coordOne[0] * Math.PI / 180) * Math.cos(coordTwo[0] * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2),
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return Math.round((EarthRadius * c) * 1000);
    };

};