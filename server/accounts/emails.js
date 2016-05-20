Accounts.urls.verifyEmail = function(token) {
    return Meteor.absoluteUrl('verify-email/' + token);
};

/**
 * Emails settings
 */
Accounts.emailTemplates.from = "Cerebro <no-reply@cerebro.com>";

Accounts.emailTemplates.siteName = "Cerebro";

// Email verifying email
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
//
// Apparently doesn't work yet !
//    // Send e-mail when account is created
//    Accounts.config({
//        sendVerificationEmail: true
//    });
//});
