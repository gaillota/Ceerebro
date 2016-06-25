import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../../../ui/global/views/layout';

import '../../../../ui/admin/views/index';
import '../../../../ui/admin/views/accounts';
import '../../../../ui/admin/views/remove';

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

adminRoutes.route('/accounts/:userId/remove', {
    name: 'admin.accounts.remove',
    action() {
        BlazeLayout.render('layout', { page: 'adminAccountsRemove' });
    }
});