import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Accounts } from 'meteor/accounts-base';

import { Notification } from '../../../services/notification.service.js';

import '../../../../ui/layout';

import '../../../../ui/accounts/register';
import '../../../../ui/accounts/login';


FlowRouter.route('/register', {
    name: 'register',
    action() {
        BlazeLayout.render('layout', { page: 'register' });
    }
});

FlowRouter.route('/verify-email/:token', {
    name: 'verify.email',
    action(params) {
        Accounts.verifyEmail(params.token, function(error) {
            if (error) {
                Notification.error(error.toString());
            } else {
                Notification.success('Your account is now activated. Thanks !');
            }
            FlowRouter.go('index');
        });
    }
});

FlowRouter.route('/login', {
    name: 'login',
    action() {
        BlazeLayout.render('layout', { page: 'login' });
    }
});
