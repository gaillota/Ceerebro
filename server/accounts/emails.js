Accounts.urls.verifyEmail = function(token) {
    return Meteor.absoluteUrl('verify-email/' + token);
};

Accounts.urls.enrollAccount = function(token) {
    return Meteor.absoluteUrl('enroll/' + token);
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

// Enrollment email
Accounts.emailTemplates.enrollAccount = {
    subject: function() {
        return "Activate your Ceerebro account.";
    },
    text: function(user, url) {
        return "Hi,\n\n"
            + "Welcome on Ceerebro ! :)\n"
            + "Please follow this link in order to setup a password and complete your registration :\n\n"
            + url + ".\n\n"
            + "Have an amazing day !\n"
            + "The Ceerebro Team.";
    }
};


//Meteor.startup(function() {
//    // 1. Set up stmp
//    var username = 'xxx';
//    var password = 'xxx';
//    var server = 'smtp.mailgun.org';
//    var port = '25';
//
//    process.env.MAIL_URL = 'smtp://' +
//        encodeURIComponent(username) + ':' +
//        encodeURIComponent(password) + '@' +
//        encodeURIComponent(server) + ':' + port;
//});
