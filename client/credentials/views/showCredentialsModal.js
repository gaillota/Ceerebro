Template.showCredentialsModal.helpers({
    credentials: function() {
        var credentials = Credentials.findOne(Template.currentData());
        if (!credentials) {
            notify('Credentials not found');
            Modal.hide(this.template.view);
        }

        return credentials;
    },
    plainPassword: function() {
        var masterKey = Session.get('masterKey');
        if (!masterKey) {
            alert('Cannot decrypt password. Master key missing.');
            return "encrypted";
        }

        return EncryptionService.decrypt(this.password, masterKey, this.iv);
    }
});