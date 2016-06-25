import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Accounts } from 'meteor/accounts-base';

import { NotificationService } from '../../../services/notification.service.js';

import '../../../../ui/global/views/layout';

import '../../../../ui/accounts/views/register';
import '../../../../ui/accounts/views/login';


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
                NotificationService.error(error.toString());
            } else {
                NotificationService.success('Your account is now activated. Thanks !');
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
