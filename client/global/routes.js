FlowRouter.route('/', {
    name: 'index',
    action: function() {
        FlowRouter.go('credentials');
    }
});