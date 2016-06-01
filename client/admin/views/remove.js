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
        notify('User successfully removed !', 'success', true);
        FlowRouter.go('admin.accounts');
    }
});