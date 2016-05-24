Router.map(function() {
    this.route('/', {
        name: 'index',
        onBeforeAction: function() {
            this.redirect('credentials');
        }
    });
});