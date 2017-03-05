import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

import '../../../../../ui/layout';

import '../../../../../ui/admin';
import '../../../../../ui/admin/sections';

export const routes = [
    {
        path: '/users',
        name: 'admin.users',
        template: 'admin.users',
        friendlyName: 'Users',
        default: true
    }
];

const adminGroup = FlowRouter.group({
    prefix: '/admin',
    triggersEnter: [FlowRouter.triggersFunctions.isAdmin]
});

routes.forEach((route) => {
    if (route.default) {
        adminGroup.route('/', {
            name: 'admin.index',
            triggersEnter: [function(context, redirect) {
                redirect(FlowRouter.path(route.name));
            }],
            action() {
                throw new Meteor.Error(403, "this should not get called");
            }
        });
    }

    adminGroup.route(route.path, {
        name: route.name,
        action() {
            BlazeLayout.render('layout', {page: 'admin.index', tab: route.template});
        }
    });
});

