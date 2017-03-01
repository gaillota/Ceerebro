import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

import '../../../../ui/layout';
import '../../../../ui/public/index';

FlowRouter.route('/', {
    name: 'public.index',
    triggersEnter: [function (context, redirect) {
        if (Meteor.userId()) {
            redirect(FlowRouter.path('rea.credentials.index'));
        }
    }],
    action() {
        BlazeLayout.render('public.index');
    }
});
