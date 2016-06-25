import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../../../ui/global/views/layout';

import '../../../../ui/geolocation/views/index';
import '../../../../ui/geolocation/views/speedometer';

var geolocationGroup = FlowRouter.group({
    prefix: '/geolocation',
    name: 'geolocationGroup'
    //triggersEnter: [FlowRouter.triggersFunctions.isAdmin]
});

geolocationGroup.route('/', {
    name: 'geolocation',
    action() {
        BlazeLayout.render('layout', { page: 'geolocation' });
    }
});

geolocationGroup.route('/speedometer', {
    name: 'speedometer',
    action() {
        BlazeLayout.render('layout', { page: 'speedometer' });
    }
});

//geolocationGroup.route('/map', {
//    name: 'map',
//    action: function() {
//        GoogleMaps.load({
//            key: Meteor.settings.public.googleApiKey
//        });
//        Tracker.autorun(function() {
//            if (Session.get('fullScreenMap')) {
//                BlazeLayout.render('map');
//            } else {
//                BlazeLayout.render('layout', { page: 'map' });
//            }
//        });
//    }
//});