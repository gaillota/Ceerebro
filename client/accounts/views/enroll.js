AutoForm.addHooks('enrollmentForm', {
    onSubmit: function(doc) {
        this.event.preventDefault();
        var self = this;

        Accounts.resetPassword(Router.current().params.token, doc.newPassword, function(error) {
            self.done(error);
        });
    },
    onSuccess: function() {
        throwAlert('Your password is now set. Welcome on board :)', 'success');
        Router.go('index');
    }
});