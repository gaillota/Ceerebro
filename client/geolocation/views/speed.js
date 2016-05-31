var lastLocation;
var lastTime;
var interval;

Template.speed.onRendered(function() {
    var self = this;

    self.autorun(function() {
        if (Session.get('enabled')) {
            interval = setInterval(computeSpeed, 1000);
        } else {
            clearInterval(interval);
        }
    });
});

Template.speed.helpers({
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
    }
});

Template.speed.events({
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

    var speed = SpeedService.computeSpeed(lastLocation, lastTime, currentLocation, currentTime);
    Session.set('speed', speed);

    lastLocation = currentLocation;
    lastTime = currentTime;
}