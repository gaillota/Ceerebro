Accounts.validateLoginAttempt(function(obj) {
    if (!obj.user)
        return false;

    if (obj.user.emails && !obj.user.emails[0].verified) {
        throw new Meteor.Error(403, 'Your must activate your account before you can login. Please follow the instructions sent by e-mail');
    }

    if (obj.user.disabled) {
        throw new Meteor.Error(403, 'Your account has been disabled.');
    }

    Meteor.users.update({
        _id: obj.user._id
    }, {
        $set: {
            lastConnectionAt: new Date()
        }
    });

    return true;
});