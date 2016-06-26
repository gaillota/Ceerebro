import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Session } from 'meteor/session';

import { NotificationService } from '../../../services/notification.service.js';

import '../../../../ui/layout';

import '../../../../ui/credentials/views/index';
import '../../../../ui/credentials/views/add';
import '../../../../ui/credentials/views/edit';

var credentialsRoutes = FlowRouter.group({
    prefix: '/credentials',
    name: 'credentialsGroup'
});

credentialsRoutes.route('/', {
    name: 'credentials',
    action() {
        BlazeLayout.render('layout', { page: 'credentials' });
    }
});

credentialsRoutes.route('/add', {
    name: 'credentials.add',
    action() {
        BlazeLayout.render('layout', { page: 'credentialsAdd' });
    }
});

credentialsRoutes.route('/edit/:credentialsId', {
    name: 'credentials.edit',
    subscriptions(params) {
        this.register('credentialsEdit', Meteor.subscribe('credentials.edit', params.credentialsId));
    },
    triggersEnter(context, redirect) {
        if (!Session.get('masterKey')) {
            NotificationService.error('You must set your master key to be able to edit any credentials !', 'Missing master key');
            redirect('credentials');
        }
    },
    action() {
        BlazeLayout.render('layout', { page: 'credentialsEdit' });
    }
});