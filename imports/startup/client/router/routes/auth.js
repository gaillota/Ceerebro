import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {Accounts} from 'meteor/accounts-base';

import {Notification} from '../../../services/notification.service.js';

import '../../../../ui/layout';

import '../../../../ui/public/auth/register';
import '../../../../ui/public/auth/login';


FlowRouter.route('/register', {
    name: 'public.auth.register',
    action() {
        BlazeLayout.render('layout', {page: 'public.auth.register'});
    }
});

FlowRouter.route('/verify-email/:token', {
    name: 'public.auth.verify-email',
    action(params) {
        Accounts.verifyEmail(params.token, function (error) {
            if (error) {
                Notification.error(error.toString());
            } else {
                Notification.success('Your account is now activated. Thanks !');
            }
            FlowRouter.go('public.index');
        });
    }
});

FlowRouter.route('/login', {
    name: 'public.auth.login',
    action() {
        BlazeLayout.render('public.auth.login');
    }
});
