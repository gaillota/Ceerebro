import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../../../ui/global/views/layout.js';

import '../../../../ui/profile/views/index.js';

FlowRouter.route('/profile', {
    name: 'profile',
    action: function() {
        BlazeLayout.render('layout', { page: 'profile' });
    }
});