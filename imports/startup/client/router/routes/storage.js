import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

import '../../../../ui/layout';
import '../../../../ui/rea/storage/storage';

const storageRoutes = FlowRouter.group({
    prefix: '/storage'
});

storageRoutes.route('/', {
    name: 'storage.root',
    action() {
        BlazeLayout.render('layout', {page: 'rea.storage'});
    }
});

storageRoutes.route('/folder/:folderId', {
    name: 'storage.folder',
    action() {
        BlazeLayout.render('layout', {page: 'rea.storage'});
    }
});
