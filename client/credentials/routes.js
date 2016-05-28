FlowRouter.route('/credentials', {
    name: 'credentials',
    subscriptions: function() {
        this.register('myCredentials', Meteor.subscribe('credentials'));
    },
    action: function() {
        BlazeLayout.render('layout', { page: 'credentials' });
    }
});

FlowRouter.route('/credentials/add', {
    name: 'credentials.add',
    action: function() {
        BlazeLayout.render('layout', { page: 'credentialsAdd' });
    }
});