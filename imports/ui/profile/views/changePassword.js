import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { AutoForm } from 'meteor/aldeed:autoform';

import { schema as changePasswordForm } from '../../../startup/forms/profile/ChangePasswordForm';
import { NotificationService } from '../../../startup/services/notification.service.js';

import './changePassword.html';

Template.changePassword.helpers({
    changePasswordForm() {
        return changePasswordForm;
    }
});

AutoForm.addHooks('changePasswordForm', {
    onSubmit(doc) {
        this.event.preventDefault();
        var self = this;

        Accounts.changePassword(doc.oldPassword, doc.newPassword, function(error) {
            self.done(error);
        });
    },
    onSuccess() {
        NotificationService.success('Password changed !', 'success', true);
        FlowRouter.go('index');
    }
});