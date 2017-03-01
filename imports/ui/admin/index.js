import {Template} from "meteor/templating";
import {_} from 'lodash';

import {adminRoutes} from '../../startup/client/router/routes/admin';

import './index.html';

const templateName = 'admin.index';
Template[templateName].onCreated(function adminIndexCreated() {
    this.subscribe('count.admin.users');
    this.getCurrentRoute = new ReactiveVar();

    this.autorun(() => {
        FlowRouter.watchPathChange();
        this.getCurrentRoute.set(FlowRouter.current().route);
    });
});

Template[templateName].helpers({
    tabs() {
        return adminRoutes;
    },
    isActiveTab() {
        return Template.instance().getCurrentRoute.get().name === this.name && 'is-active';
    },
    count() {
        if (this.name == 'admin.users') {
            const countUsers = Counts.get('count.admin.users');
            return ` (${countUsers})`;
        }
    }
});

