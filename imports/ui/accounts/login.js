import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Notification } from '../../startup/services/notification.service.js';

import './login.html';

import { schema as LoginForm } from '../../startup/forms/accounts/LoginForm';

AutoForm.addHooks('loginForm', {
    onSubmit(doc) {
        this.event.preventDefault();
        var self = this;

        Meteor.loginWithPassword(doc.email, doc.password, function(error) {
            self.done(error);
        });
    },
    onSuccess() {
        if (Meteor.user()) {
            Notification.success("Welcome back " + Meteor.user().username + " ! :)");
        }
        FlowRouter.go('index');
    }
});

Template.login.helpers({
    loginForm() {
        return LoginForm;
    }
});