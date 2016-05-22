Router.map(function() {
    this.route('/credentials', {
        name: 'credentials',
        waitOn: function() {
            return Meteor.subscribe('credentials');
        }
    });
    this.route('/credentials/add', {
        name: 'credentials.add'
    });
});