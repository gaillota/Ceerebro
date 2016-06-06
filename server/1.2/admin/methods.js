Meteor.methods({
    changeUserStatus: function(userId) {
        checkAdmin();

        var user = Meteor.users.findOne({
            _id: userId
        });

        if (!user) {
            throw new Meteor.Error(403, 'User not found');
        }

        Meteor.users.update({
            _id: userId
        }, {
            $set: {
                disabled: !user.disabled
            }
        });
    },
    removeUser: function(digest, userId) {
        checkAdmin();
        check(digest, String);
        check(userId, String);

        var result = Accounts._checkPassword(Meteor.user(), { digest: digest, algorithm: 'sha-256' });
        if (result.error) {
            throw new Meteor.Error(403, 'Wrong password');
        }

        Credentials.remove({
            owner: userId
        });
        Meteor.users.remove(userId);
    }
});