import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Accounts } from 'meteor/accounts-base';
import { toastr } from 'meteor/chrismbeckett:toastr';

import '../../../../ui/global/views/layout.js';

import '../../../../ui/accounts/views/register.js';
import '../../../../ui/accounts/views/login.js';
import '../../../../ui/public/views/index.js';


FlowRouter.route('/register', {
    name: 'register',
    action: function() {
        BlazeLayout.render('layout', { page: 'register' });
    }
});

FlowRouter.route('/verify-email/:token', {
    name: 'verify.email',
    action: function(params) {
        Accounts.verifyEmail(params.token, function(error) {
            if (error) {
                toastr.error(error.toString());
            } else {
                toastr.success('Your account is now activated. Thanks !');
            }
            FlowRouter.go('index');
        });
    }
});

FlowRouter.route('/login', {
    name: 'login',
    action: function() {
        BlazeLayout.render('layout', { page: 'login' });
    }
});
