import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {Session} from 'meteor/session';

import {Notification} from '../../../services/notification.service.js';

import '../../../../ui/layout';

import '../../../../ui/rea/credentials/index';
import '../../../../ui/rea/credentials/add';
import '../../../../ui/rea/credentials/edit';

const credentialsRoutes = FlowRouter.group({
    prefix: '/credentials',
});

credentialsRoutes.route('/', {
    name: 'rea.credentials.index',
    action() {
        BlazeLayout.render('layout', {page: 'rea.credentials.index'});
    }
});

credentialsRoutes.route('/add', {
    name: 'rea.credentials.add',
    action() {
        BlazeLayout.render('layout', {page: 'rea.credentials.add'});
    }
});

credentialsRoutes.route('/edit/:credentialsId', {
    name: 'rea.credentials.edit',
    triggersEnter(context, redirect) {
        if (!Session.get('masterKey')) {
            Notification.error('You must set your master key to be able to edit any credentials !');
            redirect('rea.credentials');
        }
    },
    action() {
        BlazeLayout.render('layout', {page: 'rea.credentials.edit'});
    }
});