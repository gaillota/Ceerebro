import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { AutoForm } from 'meteor/aldeed:autoform';
import { toastr } from 'meteor/chrismbeckett:toastr';

import './changePassword.html';

AutoForm.addHooks('changePasswordForm', {
    onSubmit: function(doc) {
        this.event.preventDefault();
        var self = this;

        Accounts.changePassword(doc.oldPassword, doc.newPassword, function(error) {
            self.done(error);
        });
    },
    onSuccess: function() {
        toastr.success('Password changed !', 'success', true);
        FlowRouter.go('index');
    }
});