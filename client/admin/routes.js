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