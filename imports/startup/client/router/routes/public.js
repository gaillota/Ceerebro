import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../../../ui/layout';

import '../../../../ui/public/index';
import '../../../../ui/public/about';

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