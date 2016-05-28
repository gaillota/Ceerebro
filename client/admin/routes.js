var adminRoutes = FlowRouter.group({
    prefix: '/admin',
    name: 'adminGroup'
});

adminRoutes.route('/', {
    name: 'admin',
    action: function() {
        BlazeLayout.render('layout', { page: 'admin' });
    }
});

adminRoutes.route('/accounts', {
    name: 'admin.accounts',
    subscriptions: function() {
        this.register('adminAccounts', Meteor.subscribe('admin.accounts'));
    },
    action: function() {
        BlazeLayout.render('layout', { page: 'adminAccounts '});
    }
});