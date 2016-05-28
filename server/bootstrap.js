Picker.route('/boot', function(params, req, res) {
    res.end(Meteor.call('bootstrap'));
});

Meteor.methods({
    bootstrap: function() {
        if (!Meteor.users.find().count()) {
            return 'No user registered';
        }

        if (Roles.getUsersInRole('admin').count()) {
            return 'An admin user already exists';
        }

        var firstUser = Meteor.users.findOne({}, {
            sort: {
                createdAt: 1
            }
        });

        Roles.addUsersToRoles(firstUser._id, 'admin');

        return "First user set as admin !";
    }
});