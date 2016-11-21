import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {FlowRouter} from 'meteor/kadira:flow-router';

import {Notification} from '../../../startup/services/notification.service.js';

import './login.html';

import {LoginForm} from '../../../startup/forms/auth/LoginForm';

Template["public.auth.login"].helpers({
    loginForm() {
        return LoginForm;
    }
});

AutoForm.addHooks('public.auth.login', {
    onSubmit(doc) {
        this.event.preventDefault();

        Meteor.loginWithPassword(doc.email, doc.password, this.done);
    },
    onSuccess() {
        if (Meteor.user()) {
            Notification.success("Welcome back " + Meteor.user().username + " ! :)");
        }
        const next = Session.get('context') ? Session.get('context').path : 'public.index';
        FlowRouter.go(next);
    }
});