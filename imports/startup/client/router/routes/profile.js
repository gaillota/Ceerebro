import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../../../ui/layout';

import '../../../../ui/profile/index';

FlowRouter.route('/profile', {
    name: 'profile',
    action() {
        BlazeLayout.render('layout', { page: 'profile' });
    }
});