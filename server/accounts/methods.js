Meteor.methods({
    registerUser: function(doc) {
        // Gather round user's information
        var options = _.pick(doc, 'username email password'.split(' '));

        // Create new user
        var newUserId = Accounts.createUser(options);

        // Send verification e-mail
        Accounts.sendVerificationEmail(newUserId);
    }
});