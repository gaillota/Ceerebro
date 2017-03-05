import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {FlowRouter} from 'meteor/kadira:flow-router';

import {NotificationService} from '../../../startup/services';
import {getDispatcherPath} from '../../../startup/utilities';
import {LoginForm} from '../../../startup/common/forms/auth/login.form';

import './login.html';

const templateName = 'public.auth.login';

Template[templateName].helpers({
    loginForm() {
        return LoginForm;
    }
});

AutoForm.addHooks('public.auth.login.form', {
    onSubmit(doc) {
        this.event.preventDefault();

        Meteor.loginWithPassword(doc.email, doc.password, this.done);
    },
    onSuccess() {
        if (Meteor.user()) {
            NotificationService.success("Welcome back " + Meteor.user().username + " ! :)");
        }
        FlowRouter.go(getDispatcherPath() || 'rea.index');
    }
});
