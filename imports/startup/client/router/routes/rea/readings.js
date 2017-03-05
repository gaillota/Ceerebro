// import {Meteor} from 'meteor/meteor';
// import {FlowRouter} from 'meteor/kadira:flow-router';
// import {BlazeLayout} from 'meteor/kadira:blaze-layout';
//
// import '../../../../ui/layout';
//
// import '../../../../ui/rea/readings/index';
// import '../../../../ui/rea/readings/add';
// import '../../../../ui/rea/readings/edit';
//
// var readingsRoutes = FlowRouter.group({
//     prefix: '/readings',
//     name: 'readingsGroup'
// });
//
// readingsRoutes.route('/', {
//     name: 'readings.index',
//     action() {
//         BlazeLayout.render('layout', {page: 'rea.readings.index'});
//     }
// });
//
// readingsRoutes.route('/add', {
//     name: 'readings.add',
//     action() {
//         BlazeLayout.render('layout', {page: 'rea.readings.add'});
//     }
// });
//
// readingsRoutes.route('/edit/:readingsId', {
//     name: 'readings.edit',
//     subscriptions(params) {
//         this.register('readingsEdit', Meteor.subscribe('readings.edit', params.readingsId));
//     },
//     action() {
//         BlazeLayout.render('layout', {page: 'rea.readings.edit'});
//     }
// });