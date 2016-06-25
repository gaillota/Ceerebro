import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../../../ui/global/views/layout';

import '../../../../ui/public/views/index';
import '../../../../ui/public/views/about';

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