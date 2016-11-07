import {Template} from "meteor/templating";

import './index.html';

import {adminRoutes} from '../../startup/client/router/routes/admin';

Template["admin.index"].onCreated(function adminIndexCreated() {
    this.subscribe('count.admin.users');
    this.getCurrentRoute = new ReactiveVar();

    this.autorun(() => {
        FlowRouter.watchPathChange();
        this.getCurrentRoute.set(FlowRouter.current().route);
    });
});

Template["admin.index"].helpers({
    tabs() {
        const countUsers = Counts.get('count.users');
        let routes = adminRoutes;
        if (routes.users) {
            routes.users.text += `(${countUsers})`;
        }

        return routes;
    },
    isActiveTab() {
        return Template.instance().getCurrentRoute.get().name === this.name && 'is-active';
    }
});

