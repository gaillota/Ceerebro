import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';

import {NotificationService} from '../../startup/services';
import {showMasterPasswordModal, removeMasterKey} from '../../startup/utilities';

import './navbar.component.html';

const templateName = 'navbar';

Template[templateName].events({
    'click .js-set-master-key'(event) {
        event.preventDefault();

        showMasterPasswordModal();
    },
    'click .js-remove-master-key'(event) {
        event.preventDefault();

        removeMasterKey();
    },
    'click .js-logout'(event) {
        event.preventDefault();

        Meteor.logout(function (error) {
            if (error) {
                NotificationService.error(error.toString());
            } else {
                removeMasterKey();
                FlowRouter.go('public.index');
            }
        });
    }
});
