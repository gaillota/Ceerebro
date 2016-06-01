Template.credentialsEdit.helpers({
    credentials: function() {
        var credentialsId = FlowRouter.getParam('credentialsId');
        var credentials = Credentials.findOne(credentialsId);
        if (!credentials) {
            return;
        }
        var masterKey = Session.get('masterKey');
        var plainPassword = EncryptionService.decrypt(credentials.password, masterKey, credentials.iv);

        return {
            domain: credentials.domain,
            identifier: credentials.identifier,
            password: plainPassword
        }
    }
});

AutoForm.addHooks('editCredentials', {
    onSubmit: function(doc) {
        this.event.preventDefault();
        var self = this;

        var masterKey = Session.get('masterKey');

        if (!masterKey) {
            this.done(new Error('Cannot encrypt data. Master key missing'));
            return;
        }

        var credentialsId = FlowRouter.getParam('credentialsId');
        var credential = Credentials.findOne(credentialsId);

        if (!credential) {
            this.done(new Error('Credentials not found, could not save'));
            return;
        }

        doc.password = EncryptionService.encrypt(doc.password, masterKey, credential.iv);

        Meteor.call("editCredentials", credentialsId, doc, function(error) {
            self.done(error);
        });
    },
    onSuccess: function() {
        notify('Credentials edited', 'success', true);
        FlowRouter.go('credentials');
    }
});