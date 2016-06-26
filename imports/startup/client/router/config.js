import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../../ui/notFound';

FlowRouter.notFound = {
    action() {
        BlazeLayout.render('notFound');
    }
};