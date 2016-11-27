import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {Accounts} from 'meteor/accounts-base';

import {Notification} from '../../../services/notification.service.js';
import {resetDispatcher} from '../../../utilities';

import '../../../../ui/layout';
import '../../../../ui/public/auth/register';
import '../../../../ui/public/auth/login';


FlowRouter.route('/login', {
    name: 'public.auth.login',
    action() {
        if (Meteor.loggingIn()) {
            console.log('action - logging in progress...');
        }
        BlazeLayout.render('public.auth.login');
    },
    triggersExit: [resetDispatcher]
});

FlowRouter.route('/register', {
    name: 'public.auth.register',
    action() {
        BlazeLayout.render('public.auth.register');
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
