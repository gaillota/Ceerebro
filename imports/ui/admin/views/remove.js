import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { NotificationService } from '../../../startup/services/notification.service.js';

import './remove.html';

import { schema as AccountsRemoveForm } from '../../../startup/forms/admin/AccountsRemoveForm';

AutoForm.addHooks('accountsRemoveForm', {
    onSubmit(doc) {
        this.event.preventDefault();
        var self = this;
        var userId = FlowRouter.getParam('userId');
        var digest = Package.sha.SHA256(doc.password);

        Meteor.call('removeUser', digest, userId, function(error) {
            self.done(error);
        });
    },
    onSuccess() {
        NotificationService.success('User successfully removed !');
        FlowRouter.go('admin.accounts');
    }
});

Template.adminAccountsRemove.helpers({
    accountsRemoveForm() {
        return AccountsRemoveForm;
    }
});