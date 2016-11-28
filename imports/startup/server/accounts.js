import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {_} from 'lodash';

import {sleep} from '../../startup/utilities';

/**
 * Accounts urls
 */
Accounts.urls.verifyEmail = function (token) {
    return Meteor.absoluteUrl('verify-email/' + token);
};

/**
 * Accounts emails settings
 */
Accounts.emailTemplates.from = "Ceerebro <no-reply@ceerebro.com>";

Accounts.emailTemplates.siteName = "Ceerebro";

Accounts.emailTemplates.verifyEmail = {
    subject() {
        return "Activate your Ceerebro account.";
    },
    text(user, url) {
        return "Hi " + user.username + ",\n\n"
            + "Welcome on Ceerebro ! :)\n\n"
            + "Before you can begin, we just need you to verify one last thing...\n"
            + "Please follow this link in order to complete your registration :\n\n"
            + url + ".\n\n"
            + "If you didn't register on Ceerebro, please ignore this e-mail.\n\n"
            + "Have an amazing day !\n"
            + "The Ceerebro Team.";
    }
};

/**
 * Accounts login hook
 */
Accounts.validateLoginAttempt(function (obj) {
    if (!obj.user) {
        return false;
    }

    const user = obj.user;

    if (user.emails && !user.emails[0].verified) {
        throw new Meteor.Error(403, 'Your must activate your account before you can login. Please follow the instructions sent by e-mail');
    }

    if (user.disabled) {
        throw new Meteor.Error(403, 'Your account has been disabled.');
    }

    Meteor.users.update({
        _id: user._id
    }, {
        $set: {
            lastConnectionAt: new Date()
        }
    });

    return true;
});