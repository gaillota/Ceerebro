GeolocationService = {
    /**
     * Compute speed from distance and time spent to travel said distance
     *
     * @param previousLocation
     * @param previousTime
     * @param currentLocation
     * @param currentTime
     * @returns {string}
     */
    computeSpeed: function(previousLocation, previousTime, currentLocation, currentTime) {
        var distance = GeolocationService.getDistanceBetweenTwoLocations(previousLocation.lat, previousLocation.lng, currentLocation.lat, currentLocation.lng); // in meters
        var interval = (currentTime - previousTime) / 1000; // in seconds

        return ((distance / interval) * 3.6).toFixed(2);
    },
    /**
     * Compute degree of needle from current speed and max speed
     *
     * @param speed
     * @param max
     * @returns {number}
     */
    computeDegree: function(speed, max) {
        var percent = ((speed / max) * 100) || 0;

        return (percent * 1.8) - 90;
    },
    /**
     * Haversine formula implementation
     *
     * @param lat1
     * @param lng1
     * @param lat2
     * @param lng2
     * @returns {number}
     */
    getDistanceBetweenTwoLocations: function(lat1, lng1, lat2, lng2) {
        var R = 6371;
        var dLat = GeolocationService.deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = GeolocationService.deg2rad(lng2 - lng1);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(GeolocationService.deg2rad(lat1)) * Math.cos(GeolocationService.deg2rad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c * 1000; // Distance in m
    },
    /**
     * Transform degree into radian
     *
     * @param deg
     * @returns {number}
     */
    deg2rad: function(deg) {
        return deg * (Math.PI/180);
    }
};