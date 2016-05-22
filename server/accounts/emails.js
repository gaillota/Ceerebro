Accounts.urls.verifyEmail = function(token) {
    return Meteor.absoluteUrl('verify-email/' + token);
};

Accounts.urls.enrollAccount = function(token) {
    return Meteor.absoluteUrl('enroll/' + token);
};

/**
 * Emails settings
 */
Accounts.emailTemplates.from = "Cerebro <no-reply@cerebro.com>";

Accounts.emailTemplates.siteName = "Cerebro";

// Email verifying email
Accounts.emailTemplates.verifyEmail = {
    subject: function() {
        return "Activate your Cerebro account.";
    },
    text: function(user, url) {
        return "Hi " + user.username + ",\n\n"
            + "Welcome on Cerebro ! :)\n\n"
            + "Before you can begin, we just need you to do one last thing...\n"
            + "Please follow this link in order to verify your e-mail address and complete your registration :\n\n"
            + url + ".\n\n"
            + "If you didn't register on PenBudies, please ignore this e-mail.\n\n"
            + "Have an amazing day !\n"
            + "The PenBudies Team.";
    }
};

// Enrollment email
Accounts.emailTemplates.enrollAccount = {
    subject: function() {
        return "Activate your Cerebro account.";
    },
    text: function(user, url) {
        return "Hi,\n\n"
            + "Welcome on Cerebro ! :)\n"
            + "Please follow this link in order to setup a password and complete your registration :\n\n"
            + url + ".\n\n"
            + "Have an amazing day !\n"
            + "The Cerebro Team.";
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
