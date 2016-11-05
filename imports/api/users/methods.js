import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {check} from 'meteor/check';
import {_} from 'lodash';

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

//export const remove = new ValidatedMethod({
//    name: 'user.remove',
//    mixins: [ValidatedMethod.mixins.isAdmin, ValidatedMethod.mixins.schema],
//    schema: {
//        digest: {
//            type: String
//        },
//        userId: {
//            type: String,
//            regEx: SimpleSchema.RegEx.Id
//        }
//    },
//    run({ digest, userId }) {
//        const result = Accounts._checkPassword(Meteor.user(), { digest: digest, algorithm: 'sha-256' });
//        if (result.error) {
//            throw new Meteor.Error(403, 'Wrong password');
//        }
//
//        Credentials.remove({
//            owner: userId
//        });
//        Meteor.users.remove(userId);
//    }
//});