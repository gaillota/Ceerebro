import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

import '../../../../ui/layout';

import '../../../../ui/rea/credentials/index';
import '../../../../ui/rea/credentials/upsert';

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
        BlazeLayout.render('layout', {page: 'rea.credentials.upsert'});
    }
});

credentialsRoutes.route('/edit/:credentialsId', {
    name: 'rea.credentials.edit',
    action() {
        BlazeLayout.render('layout', {page: 'rea.credentials.upsert'});
    }
});
