import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../../../ui/global/views/layout.js';

import '../../../../ui/admin/views/index.js';
import '../../../../ui/admin/views/accounts.js';
import '../../../../ui/admin/views/remove.js';

var adminRoutes = FlowRouter.group({
    prefix: '/admin',
    name: 'adminGroup',
    triggersEnter: [FlowRouter.triggersFunctions.isAdmin]
});

adminRoutes.route('/', {
    name: 'admin',
    action: function() {
        BlazeLayout.render('layout', { page: 'admin' });
    }
});

adminRoutes.route('/accounts', {
    name: 'admin.accounts',
    action: function() {
        BlazeLayout.render('layout', { page: 'adminAccounts' });
    }
});

adminRoutes.route('/accounts/:userId/remove', {
    name: 'admin.accounts.remove',
    action: function() {
        BlazeLayout.render('layout', { page: 'adminAccountsRemove' });
    }
});