import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';

import {Notification} from '../../startup/services/notification.service.js';
import {showMasterPasswordModal, removeMasterKey} from '../../startup/utilities';

import './logo';

import './navbar.html';

Template["navbar"].onCreated(function onCreatedFunction() {
    this.state = new ReactiveDict();
    this.state.set('navbar-toggle', false);
});

Template["navbar"].helpers({
    navbarToggle() {
        return Template.instance().state.get('navbar-toggle') && 'is-active';
    }
});

Template["navbar"].events({
    'click #nav-toggle'(event, instance) {
        event.preventDefault();

        instance.state.set('navbar-toggle', !instance.state.get('navbar-toggle'));
    },
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
                Notification.error(error.toString());
            } else {
                removeMasterKey();
                FlowRouter.go('public.index');
            }
        });
    }
});