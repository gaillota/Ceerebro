SpeedService = {
    computeSpeed: function(previousPoint, previousTime, currentPoint, currentTime) {
        var distance = SpeedService.getDistanceBetweenTwoLocations(previousPoint.lat, previousPoint.lng, currentPoint.lat, currentPoint.lng);
        var interval = (currentTime - previousTime) / 1000; // in seconds

        return ((distance / interval) * 3.6).toFixed(2);
    },
    getDistanceBetweenTwoLocations: function(lat1, lng1, lat2, lng2) {
        var radius = 6371;
        var dLat = SpeedService.deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = SpeedService.deg2rad(lng2 - lng1);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(SpeedService.deg2rad(lat1)) * Math.cos(SpeedService.deg2rad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return radius * c * 1000; // Distance in m
    },
    deg2rad: function(deg) {
        return deg * (Math.PI/180);
    }
};