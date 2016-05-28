var credentials = FlowRouter.group({
    prefix: '/credentials',
    name: 'credentialsGroup'
});

credentials.route('/', {
    name: 'credentials',
    subscriptions: function() {
        this.register('myCredentials', Meteor.subscribe('credentials'));
    },
    action: function() {
        BlazeLayout.render('layout', { page: 'credentials' });
    }
});

credentials.route('/add', {
    name: 'credentials.add',
    action: function() {
        BlazeLayout.render('layout', { page: 'credentialsAdd' });
    }
});