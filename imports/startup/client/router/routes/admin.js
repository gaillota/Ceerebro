import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../../../ui/layout';

import '../../../../ui/admin/index';
import '../../../../ui/admin/accounts';

const adminRoutes = FlowRouter.group({
    prefix: '/admin',
    name: 'adminGroup',
    triggersEnter: [FlowRouter.triggersFunctions.isAdmin]
});

adminRoutes.route('/', {
    name: 'admin',
    action() {
        BlazeLayout.render('layout', { page: 'admin' });
    }
});

adminRoutes.route('/accounts', {
    name: 'admin.accounts',
    action() {
        BlazeLayout.render('layout', { page: 'adminAccounts' });
    }
});
