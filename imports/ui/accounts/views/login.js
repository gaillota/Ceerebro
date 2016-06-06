import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { toastr } from 'meteor/chrismbeckett:toastr';

import './login.html';

import { LoginForm } from '../forms/LoginForm.js';

AutoForm.addHooks('loginForm', {
    onSubmit: function(doc) {
        this.event.preventDefault();
        var self = this;

        Meteor.loginWithPassword(doc.email, doc.password, function(error) {
            self.done(error);
        });
    },
    onSuccess: function() {
        if (Meteor.user()) {
            toastr.success("Welcome back " + Meteor.user().username + " ! :)");
        }
        FlowRouter.go('index');
    }
});

Template.login.helpers({
    loginForm: function() {
        return LoginForm;
    }
});