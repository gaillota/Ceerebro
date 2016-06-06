import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../../ui/global/views/notFound.js';

FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render('notFound');
    }
};