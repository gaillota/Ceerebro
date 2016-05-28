var credentialsRoutes = FlowRouter.group({
    prefix: '/credentials',
    name: 'credentialsGroup'
});

credentialsRoutes.route('/', {
    name: 'credentials',
    subscriptions: function() {
        this.register('myCredentials', Meteor.subscribe('credentials'));
    },
    action: function() {
        BlazeLayout.render('layout', { page: 'credentials' });
    }
});

credentialsRoutes.route('/add', {
    name: 'credentials.add',
    action: function() {
        BlazeLayout.render('layout', { page: 'credentialsAdd' });
    }
});

credentialsRoutes.route('/edit/:credentialsId', {
    name: 'credentials.edit',
    subscriptions: function(params) {
        this.register('credentialsEdit', Meteor.subscribe('credentials.edit', params.credentialsId));
    },
    triggersEnter: function(context, redirect) {
        if (!Session.get('masterKey')) {
            throwAlert('You must set your master key to be able to edit any credentials !');
            redirect('credentials');
        }
    },
    action: function() {
        BlazeLayout.render('layout', { page: 'credentialsEdit' });
    }
});