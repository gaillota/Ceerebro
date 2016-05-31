var lastLocation;
var lastTime;
var interval;
var SPEED_MAX;

Template.speedometer.onRendered(function() {
    var self = this;

    self.autorun(function() {
        interval = Session.get('enabled') ? setInterval(computeSpeed, 1000) : clearInterval(interval);
    });
});

Template.speedometer.helpers({
    toggleButton: function() {
        return Session.get('enabled') ? {
            class: 'btn-danger',
            text: 'Stop'
        } : {
            class: 'btn-success',
            text: 'Start'
        }
    },
    speed: function() {
        return Session.get('speed') || '0.00';
    },
    degree: function() {
        return Session.get('degree') || -90;
    }
});

Template.speedometer.events({
    'click .js-toggle-measurements': function() {
        Session.set('enabled', !Session.get('enabled'));
    }
});

function computeSpeed() {
    var currentLocation = Geolocation.latLng();
    var currentTime = Date.now();

    if (!lastLocation || !lastTime) {
        lastLocation = currentLocation;
        lastTime = currentTime;

        return;
    }

    var speed = GeolocationService.computeSpeed(lastLocation, lastTime, currentLocation, currentTime);
    Session.set('speed', speed);
    Session.set('degree', GeolocationService.computeDegree(speed, SPEED_MAX));

    lastLocation = currentLocation;
    lastTime = currentTime;
}