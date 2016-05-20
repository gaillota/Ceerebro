Router.route('/boot', function() {
    this.response.end(Meteor.call('bootstrap'));
}, {
    where: 'server'
});

Meteor.methods({
    bootstrap: function() {
        if (Meteor.users.find().count()) {
            return 'Application already booted';
        }

        var adminEmailAddress = Meteor.settings.admin.emailAddress;

        if (!adminEmailAddress) {
            return 'Please fill the settings.json file';
        }

        // Create first user
        var userId = Accounts.createUser({ email: adminEmailAddress });
        // Set newly created user as admin
        Roles.addUsersToRoles(userId, 'admin');

        // Send enrollment email
        Accounts.sendEnrollmentEmail(userId);

        return "First user successfully created !";
    }
});