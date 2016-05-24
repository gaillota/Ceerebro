AutoForm.addHooks('registrationForm', {
    onSubmit: function(doc) {
        this.event.preventDefault();
        var self = this;

        doc.keychain = EncryptionService.setupUserEncryptionKeychain(doc.password);
        Meteor.call('registerUser', doc, function(error) {
            self.done(error);
        });
    },
    onSuccess: function() {
        throwAlert('Registration successful ! Check your e-mails', 'success');
    }
});