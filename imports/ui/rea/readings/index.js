import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {Highcharts} from 'highcharts/highstock';

import {NotificationService} from '../../../startup/services';
import {Readings} from '../../../api/readings/readings';
import {remove} from '../../../api/readings/methods';

import './index.html';

const templateName = 'rea.readings';
Template[templateName].onCreated(function readingsCreated() {
    this.subscribe('readings');
});

Template[templateName].helpers({
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

Template[templateName].events({
    'click .js-readings-remove'() {
        if (confirm('Are you sure ?')) {
            remove.call({readingsId: this._id}, (error) => {
                if (error) {
                    NotificationService.error(error.toString());
                } else {
                    NotificationService.success('Reading successfully removed !')
                }
            });
        }
    }
});
