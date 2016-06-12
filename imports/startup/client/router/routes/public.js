import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../../../ui/global/views/layout.js';

import '../../../../ui/public/views/index.js';
import '../../../../ui/public/views/about.js';

FlowRouter.route('/', {
    name: 'index',
    action() {
        FlowRouter.go('credentials');
    }
});

FlowRouter.route('/about', {
    name: 'about',
    action() {
        BlazeLayout.render('layout', { page: 'about' });
    }
});