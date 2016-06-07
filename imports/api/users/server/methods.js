import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

Meteor.methods({
    registerUser: function(doc) {
        // Check integrity of keychain
        check(doc.keychain, {
            masterKey: String,
            salt: String,
            passwordValidator: String
        });

        // Gather round user's information
        var options = _.pick(doc, 'username email password'.split(' '));

        // Create new user
        var newUserId = Accounts.createUser(options);

        Meteor.users.update({
            _id: newUserId
        }, {
            $set: {
                "keychain.masterKey": doc.keychain.masterKey,
                "keychain.salt": doc.keychain.salt,
                "keychain.passwordValidator": doc.keychain.passwordValidator
            }
        });

        // Send verification e-mail
        Accounts.sendVerificationEmail(newUserId);
    }
});