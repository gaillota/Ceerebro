import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Accounts.urls.verifyEmail = function(token) {
    return Meteor.absoluteUrl('verify-email/' + token);
};

/**
 * Emails settings
 */
Accounts.emailTemplates.from = "Ceerebro <no-reply@ceerebro.com>";

Accounts.emailTemplates.siteName = "Ceerebro";

// Email verifying email
Accounts.emailTemplates.verifyEmail = {
    subject: function() {
        return "Activate your Ceerebro account.";
    },
    text: function(user, url) {
        return "Hi " + user.username + ",\n\n"
            + "Welcome on Ceerebro ! :)\n\n"
            + "Before you can begin, we just need you to do one last thing...\n"
            + "Please follow this link in order to verify your e-mail address and complete your registration :\n\n"
            + url + ".\n\n"
            + "If you didn't register on Ceerebro, please ignore this e-mail.\n\n"
            + "Have an amazing day !\n"
            + "The Ceerebro Team.";
    }
};