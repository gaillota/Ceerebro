import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {Roles} from 'meteor/alanning:roles';

import {Notification} from '../../services/notification.service.js';
import {setDispatcherPath} from '../../utilities/functions';

FlowRouter.triggersFunctions = {
    isLoggedIn(context, redirect) {
        if (!Meteor.userId()) {
            setDispatcherPath(context.path);
            redirect(FlowRouter.path('public.auth.login'));
        }
    },
    isAdmin(context, redirect) {
        if (!Meteor.userId()) {
            setDispatcherPath(context.path);
            redirect(FlowRouter.path('public.auth.login'));
        } else {
            if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
                Notification.error('You must be admin to access this section !');
                redirect(FlowRouter.path('public.index'));
            }
        }
    }
};

const NON_AUTH_ROUTES = [
    'public.index',
    'public.about',
    'public.auth.register',
    'public.auth.login',
    'public.auth.verify-email'
];

// User must be logged in
FlowRouter.triggers.enter(FlowRouter.triggersFunctions.isLoggedIn, {
    except: NON_AUTH_ROUTES
});