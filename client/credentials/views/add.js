Template.credentialsAdd.events({
    'click .js-set-key': function(event) {
        if (!Session.get('masterKey')) {
            event.preventDefault();
            Modal.show('masterPasswordModal');
        }
    }
});

AutoForm.addHooks('addCredentials', {
    onSubmit: function(doc) {
        this.event.preventDefault();
        var self = this;

        var password = doc.password;
        var masterKey = Session.get('masterKey');

        if (!masterKey) {
            this.done(new Error('Cannot encrypt data. Master key missing'));
            return;
        }

        doc.iv = EncryptionService.generateKey(128);
        doc.password = EncryptionService.encrypt(password, masterKey, doc.iv);

        Meteor.call("insertCredentials", doc, function(error) {
            self.done(error);
        });
    },
    onSuccess: function() {
        toastr.success('Credentials successfully added', 'success', true);
        FlowRouter.go('credentials');
    }
});