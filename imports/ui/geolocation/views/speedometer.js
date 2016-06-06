import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Geolocation } from 'meteor/mdg:geolocation';
import { GeolocationService } from '../services/GeolocationService.js';

import './speedometer.html';

var SPEED_MAX = 200;

Template.speedometer.hooks({
    created: function() {
        this.enabled = new ReactiveVar();
        this.lastLocation = new ReactiveVar(false);
        this.lastTime = new ReactiveVar(false);
        this.speed = new ReactiveVar(0.00);
        this.degree = new ReactiveVar(-90);
    },
    rendered: function() {
        var self = this;

        self.autorun(function() {
            var geolocation = Geolocation.latLng();
            var now = Date.now();

            if (!self.enabled.get()) {
                return;
            }

            // Set last record if there's no
            if (!self.lastLocation.get() || !self.lastTime.get()) {
                self.lastLocation.set(geolocation);
                self.lastTime.set(now);

                return;
            }

            // Limit to one computation every second top
            if (now - self.lastTime.get() < 1000) {
                return;
            }

            var speed = GeolocationService.computeSpeed(self.lastLocation.get(), self.lastTime.get(), geolocation, now);
            var degree = max(GeolocationService.computeDegree(speed, SPEED_MAX), SPEED_MAX);
            self.speed.set(speed);
            self.degree.set(degree);

            self.lastLocation.set(geolocation);
            self.lastTime.set(now);
        });
    }
});

Template.speedometer.helpers({
    toggleButton: function() {
        return Template.instance().enabled.get() ? {
            class: 'btn-danger',
            text: 'Stop'
        } : {
            class: 'btn-success',
            text: 'Start'
        }
    },
    speed: function() {
        return Template.instance().speed.get() || 0.00;
    },
    degree: function() {
        return Template.instance().degree.get() || -90;
    }
});

Template.speedometer.events({
    'click .js-toggle-measurements': function(event, template) {
        template.enabled.set(!template.enabled.get());
    }
});