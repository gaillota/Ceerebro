import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {Highcharts} from 'highcharts/highstock';

import {Notification} from '../../../startup/services/notification.service.js';
import {Readings} from '../../../api/readings/readings';
import {remove} from '../../../api/readings/methods';

import './index.html';

Template["rea.readings"].onCreated(function readingsCreated() {
    this.subscribe('readings');
});

Template["rea.readings"].helpers({
    countReadings() {
        return Counts.get('totalReadings');
    },
    readings() {
        return Readings.find({}, {
            sort: {
                createdAt: -1
            }
        });
    },
    createChart() {
        const readings = Readings.find().fetch();

        Highcharts.chart('chart', {});
    }
});

Template["rea.readings"].events({
    'click .js-readings-remove'() {
        if (confirm('Are you sure ?')) {
            remove.call({readingsId: this._id}, (error) => {
                if (error) {
                    Notification.error(error.toString());
                } else {
                    Notification.success('Reading successfully removed !')
                }
            });
        }
    }
});