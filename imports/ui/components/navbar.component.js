import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';

import {NotificationService} from '../../startup/services';
import {LoginForm} from '../../startup/common/forms/auth/login.form';
import {showMasterPasswordModal, setMasterKey} from '../../startup/utilities';

import './navbar.component.html';

const templateName = 'navbar';

Template[templateName].helpers({
    loginForm() {
        return LoginForm;
    }
});

Template[templateName].events({
    'click .js-set-master-key'(event) {
        event.preventDefault();

        showMasterPasswordModal();
    },
    'click .js-remove-master-key'(event) {
        event.preventDefault();

        setMasterKey(undefined);
    },
    'click .js-logout'(event) {
        event.preventDefault();

        Meteor.logout(function (error) {
            if (error) {
                NotificationService.error(error.toString());
            } else {
                setMasterKey(undefined);
                FlowRouter.go('public.index');
            }
        });
    }
});
