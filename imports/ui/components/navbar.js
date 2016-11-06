import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Notification } from '../../startup/services/notification.service.js';
import { removeMasterKey } from '../../startup/utilities/functions';

import './logo';

import './navbar.html';

Template.navbar.events({
    'click .js-logout'(event) {
        event.preventDefault();

        Meteor.logout(function(error) {
            if (error) {
                Notification.error(error.toString());
            } else {
                removeMasterKey();
                FlowRouter.go('public.index');
            }
        });
    }
});