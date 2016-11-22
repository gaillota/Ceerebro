import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {Roles} from 'meteor/alanning:roles';

import {RegistrationForm} from '../../startup/forms/auth/RegistrationForm';
import {EncryptionService} from '../../startup/services/encryption.service';

export const bootstrap = new ValidatedMethod({
    name: 'user.bootstrap',
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
    name: 'user.register',
    mixins: [ValidatedMethod.mixins.schema],
    schema: [RegistrationForm],
    run(doc) {
        // Create new user
        const newUserId = Accounts.createUser(doc);

        // Send verification e-mail
        Accounts.sendVerificationEmail(newUserId);

        EncryptionService.setupUserKeychain(doc.password, (keychain) => {
            // Set the user's keychain
            Meteor.users.update({
                _id: newUserId
            }, {
                $set: {
                    keychain: keychain
                }
            });
        });

        return newUserId;
    }
});

export const harakiri = new ValidatedMethod({
    name: 'user.harakiri',
    mixins: [ValidatedMethod.mixins.isLoggedIn, ValidatedMethod.mixins.schema],
    schema: {
        digest: {
            type: String
        }
    },
    run({ digest }) {
        const result = Accounts._checkPassword(this.userId, { digest: digest, algorithm: 'sha-256' });
        if (result.error) {
            throw new Meteor.Error(403, 'Wrong password');
        }

        throw new Meteor.Error(404, 'This function is not available yet...');

        // Credentials.remove({
        //     owner: userId
        // }, {
        //     multi: true
        // });
        // Meteor.users.remove(userId);
    }
});

/**
 * Admin methods
 */
export const toggleStatus = new ValidatedMethod({
    name: 'user.toggleStatus',
    mixins: [ValidatedMethod.mixins.isAdmin, ValidatedMethod.mixins.schema],
    schema: {
        userId: {
            type: SimpleSchema.RegEx.Id
        }
    },
    run({userId}) {
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

export const activate = new ValidatedMethod({
    name: 'user.activate',
    mixins: [ValidatedMethod.mixins.isAdmin, ValidatedMethod.mixins.schema],
    schema: {
        userId: {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        }
    },
    run({userId}) {
        return Meteor.users.update({
            _id: userId
        }, {
            $set: {
                "emails.0.verified": true
            }
        });
    }
});

export const makeAdmin = new ValidatedMethod({
    name: 'user.makeAdmin',
    mixins: [ValidatedMethod.mixins.isAdmin, ValidatedMethod.mixins.schema],
    schema: {
        userId: {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        }
    },
    run({userId}) {
        return Roles.setUserRoles(userId, 'admin');
    }
});