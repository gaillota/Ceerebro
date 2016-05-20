Router.map(function() {
    this.route('/', {
        name: 'index',
        waitOn: function() {
            return Meteor.subscribe('credentials');
        }
    });
    this.route('/add', {
        name: 'add'
    });
});