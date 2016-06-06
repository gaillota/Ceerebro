import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { toastr } from 'meteor/chrismbeckett:toastr';

import './remove.html';

import { AccountsRemoveForm } from '../forms/AccountsRemoveForm.js';

AutoForm.addHooks('accountsRemoveForm', {
    onSubmit: function(doc) {
        this.event.preventDefault();
        var self = this;
        var userId = FlowRouter.getParam('userId');
        var digest = Package.sha.SHA256(doc.password);

        Meteor.call('removeUser', digest, userId, function(error) {
            self.done(error);
        });
    },
    onSuccess: function() {
        toastr.success('User successfully removed !');
        FlowRouter.go('admin.accounts');
    }
});

Template.adminAccountsRemove.helpers({
    accountsRemoveForm: function() {
        return AccountsRemoveForm;
    }
});