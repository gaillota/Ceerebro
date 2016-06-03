FlowRouter.route('/', {
    name: 'index',
    action: function() {
        FlowRouter.go('credentials');
    }
});

FlowRouter.route('/about', {
    name: 'about',
    action: function() {
        BlazeLayout.render('layout', { page: 'about' });
    }
});