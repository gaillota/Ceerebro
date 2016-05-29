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
        throwAlert('User successfully removed !', 'success');
        FlowRouter.go('admin.accounts');
    }
});