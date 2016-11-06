import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

import '../../../../ui/layout';

import '../../../../ui/admin/index';
import '../../../../ui/admin/tabs/users';

const adminRoutes = FlowRouter.group({
    prefix: '/admin',
    triggersEnter: [FlowRouter.triggersFunctions.isAdmin]
});

adminRoutes.route('/', {
    name: 'admin.index',
    triggersEnter: [function(context, redirect) {
        redirect(FlowRouter.path('admin.users'));
    }],
    action() {
        throw new Meteor.Error(403, "this should not get called");
    }
});

adminRoutes.route('/users', {
    name: 'admin.users',
    action() {
        BlazeLayout.render('layout', {page: 'admin.index', tab: 'admin.users'});
    }
});
