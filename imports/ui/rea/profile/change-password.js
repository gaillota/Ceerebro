import {Accounts} from 'meteor/accounts-base';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {AutoForm} from 'meteor/aldeed:autoform';

import {ChangePasswordForm} from '../../../startup/forms/profile/ChangePasswordForm';
import {Notification} from '../../../startup/services/notification.service.js';

import './change-password.html';

Template["rea.profile.change-password"].helpers({
    changePasswordForm() {
        return ChangePasswordForm;
    }
});

AutoForm.addHooks('rea.profile.change-password', {
    onSubmit(doc) {
        this.event.preventDefault();

        Accounts.changePassword(doc.oldPassword, doc.newPassword, this.done);
    },
    onSuccess() {
        Notification.success('Password changed !');
        FlowRouter.go('public.index');
    }
});