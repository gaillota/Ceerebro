import {Template} from "meteor/templating";
import {FlowRouter} from 'meteor/kadira:flow-router';

import {routes} from '../../../startup/client/router/routes/admin/admin';

import './menu.component.html';

const templateName = 'admin.component.menu';

Template[templateName].onCreated(function () {
    this.getCurrentRoute = new ReactiveVar();

    this.autorun(() => {
        FlowRouter.watchPathChange();
        this.getCurrentRoute.set(FlowRouter.current().route);
    });
});

Template[templateName].helpers({
    tabs() {
        return routes;
    },
    activeTab() {
        return Template.instance().getCurrentRoute.get().name === this.name && 'active';
    }
});
