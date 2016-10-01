import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../../../ui/layout';

import '../../../../ui/readings/index';
import '../../../../ui/readings/add';
import '../../../../ui/readings/edit';

var readingsRoutes = FlowRouter.group({
    prefix: '/readings',
    name: 'readingsGroup'
});

readingsRoutes.route('/', {
    name: 'readings',
    action() {
        BlazeLayout.render('layout', { page: 'readings' });
    }
});

readingsRoutes.route('/add', {
    name: 'readings.add',
    action() {
        BlazeLayout.render('layout', { page: 'readingsAdd' });
    }
});

readingsRoutes.route('/edit/:readingsId', {
    name: 'readings.edit',
    subscriptions(params) {
        this.register('readingsEdit', Meteor.subscribe('readings.edit', params.readingsId));
    },
    action() {
        BlazeLayout.render('layout', { page: 'readingsEdit' });
    }
});