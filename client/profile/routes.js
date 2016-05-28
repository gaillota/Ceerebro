FlowRouter.route('/profile', {
    name: 'profile',
    action: function() {
        BlazeLayout.render('layout', { page: 'profile' });
    }
});