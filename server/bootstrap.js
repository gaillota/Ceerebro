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

        if (!Meteor.settings.admin || !Meteor.settings.admin.emailAddress || !Meteor.settings.admin.username) {
            return 'Please complete the settings.json file';
        }

        var adminEmailAddress = Meteor.settings.admin.emailAddress;
        var username = Meteor.settings.admin.username;

        // Create first user
        var userId = Accounts.createUser({ username: username, email: adminEmailAddress });
        // Set newly created user as admin
        Roles.addUsersToRoles(userId, 'admin');

        // Send enrollment email
        Accounts.sendEnrollmentEmail(userId);

        return "First user successfully created !";
    }
});