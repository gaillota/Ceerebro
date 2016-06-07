import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { toastr } from 'meteor/chrismbeckett:toastr';

import './navbar.html';

import { removeMasterKey } from '../../helpers/functions.js';

Template.navbar.events({
    'click .js-logout': function(event) {
        event.preventDefault();

        Meteor.logout(function(error) {
            if (error) {
                toastr.error(error.toString());
            } else {
                removeMasterKey();
                FlowRouter.go('index');
            }
        });
    }
});