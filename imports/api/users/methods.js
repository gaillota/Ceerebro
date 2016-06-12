import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { _ } from 'meteor/stevezhu:lodash';

export const register = new ValidatedMethod({
    name: 'users.register',
    validate: new SimpleSchema({}).validator(),
    run({ username, email, password, keychain }) {
        // Check integrity of keychain
        check(keychain, {
            masterKey: String,
            salt: String,
            passwordValidator: String
        });

        // Create new user
        var newUserId = Accounts.createUser({ username, email, password });

        Meteor.users.update({
            _id: newUserId
        }, {
            $set: {
                "keychain.masterKey": keychain.masterKey,
                "keychain.salt": keychain.salt,
                "keychain.passwordValidator": keychain.passwordValidator
            }
        });

        // Send verification e-mail
        Accounts.sendVerificationEmail(newUserId);

        return newUserId;
    }
});

export const toggleStatus = new ValidatedMethod({
    name: 'users.toggleStatus',
    mixins: [ValidatedMethod.mixins.isAdmin, ValidatedMethod.mixins.schema],
    schema: {
        userId: {
            type: SimpleSchema.RegEx.Id
        }
    },
    run(userId) {
        const user = Meteor.users.findOne({
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
    }
});

export const remove = new ValidatedMethod({
    name: 'users.remove',
    mixins: [ValidatedMethod.mixins.isAdmin, ValidatedMethod.mixins.schema],
    schema: {
        digest: {
            type: String
        },
        userId: {
            type: SimpleSchema.RegEx.Id
        }
    },
    run(digest, userId) {
        const result = Accounts._checkPassword(Meteor.user(), { digest: digest, algorithm: 'sha-256' });
        if (result.error) {
            throw new Meteor.Error(403, 'Wrong password');
        }

        Credentials.remove({
            owner: userId
        });
        Meteor.users.remove(userId);
    }
});