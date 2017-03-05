import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

import '../../../../../ui/layout';
import '../../../../../ui/rea/map/index';

FlowRouter.route('/map', {
    name: 'rea.map.index',
    action() {
        BlazeLayout.render('layout', {page: 'rea.map.index'});
    }
});
