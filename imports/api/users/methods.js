import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { check } from 'meteor/check';
import { _ } from 'lodash';

import { schema as RegistrationForm } from '../../startup/forms/accounts/RegistrationForm';

export const bootstrap = new ValidatedMethod({
    name: 'bootstrap',
    validate: new SimpleSchema({}).validator(),
    run() {
        if (!Meteor.users.find().count()) {
            return 'No user registered';
        }

        if (Roles.getUsersInRole('admin').count()) {
            return 'An admin user already exists';
        }

        const firstUser = Meteor.users.findOne({}, {
            sort: {
                createdAt: 1
            }
        });

        Roles.addUsersToRoles(firstUser._id, 'admin');

        return "First user set as admin !";
    }
});

export const register = new ValidatedMethod({
    name: 'users.register',
    mixins: [ValidatedMethod.mixins.schema],
    schema: [RegistrationForm, {
        keychain: {
            type: Object
        },
        "keychain.masterKey": {
            type: String
        },
        "keychain.salt" : {
            type: String
        },
        "keychain.passwordValidator": {
            type: String
        }
    }],
    run({ username, email, password, keychain }) {
        // Create new user
        const newUserId = Accounts.createUser({ username, email, password });

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
    run({ userId }) {
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
            type: String,
            regEx: SimpleSchema.RegEx.Id
        }
    },
    run({ digest, userId }) {
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