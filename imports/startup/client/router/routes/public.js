import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

import '../../../../ui/layout';
import '../../../../ui/public/about';

FlowRouter.route('/', {
    name: 'public.index',
    triggersEnter: [function(context, redirect) {
        redirect(FlowRouter.path('rea.credentials.index'));
    }],
    action() {
        throw new Meteor.Error(403, "this should not get called");
    }
});

FlowRouter.route('/about', {
    name: 'public.about',
    action() {
        BlazeLayout.render('layout', {page: 'public.about'});
    }
});