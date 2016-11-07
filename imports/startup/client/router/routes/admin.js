import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {_} from 'lodash';

import '../../../../ui/layout';

import '../../../../ui/admin/index';
import '../../../../ui/admin/tabs/index';

export const adminRoutes = [
    {
        path: '/users',
        name: 'admin.users',
        template: 'admin.users',
        text: 'Users'
    }
];

const adminGroup = FlowRouter.group({
    prefix: '/admin',
    triggersEnter: [FlowRouter.triggersFunctions.isAdmin]
});

adminGroup.route('/', {
    name: 'admin.index',
    triggersEnter: [function(context, redirect) {
        redirect(FlowRouter.path('admin.users'));
    }],
    action() {
        throw new Meteor.Error(403, "this should not get called");
    }
});

adminRoutes.forEach((route) => {
    adminGroup.route(route.path, {
        name: route.name,
        action() {
            BlazeLayout.render('layout', {page: 'admin.index', tab: route.template});
        }
    });
});

