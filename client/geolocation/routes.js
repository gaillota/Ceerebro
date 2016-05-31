var geolocationGroup = FlowRouter.group({
    prefix: '/geolocation',
    name: 'geolocationGroup'
    //triggersEnter: [FlowRouter.triggersFunctions.isAdmin]
});

geolocationGroup.route('/', {
    name: 'geolocation',
    action: function() {
        BlazeLayout.render('layout', { page: 'geolocation' });
    }
});

geolocationGroup.route('/speedometer', {
    name: 'speedometer',
    action: function() {
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