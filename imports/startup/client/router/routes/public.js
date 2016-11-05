import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

import '../../../../ui/layout';

import '../../../../ui/public/index';
import '../../../../ui/public/about';

FlowRouter.route('/', {
    name: 'public.index',
    action() {
        FlowRouter.go('rea.credentials.index');
    }
});

FlowRouter.route('/about', {
    name: 'public.about',
    action() {
        BlazeLayout.render('layout', {page: 'public.about'});
    }
});