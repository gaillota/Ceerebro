AutoForm.addHooks('masterPasswordForm', {
    onSubmit: function(doc) {
        this.event.preventDefault();

        var encryptionKeychain = Meteor.user().keychain;
        var pbk = EncryptionService.generatePasswordBasedKey(doc.password, encryptionKeychain.salt);
        var pvaek = EncryptionService.splitKeyInHalf(pbk);

        if (encryptionKeychain.passwordValidator !== pvaek.passwordValidator) {
            this.done(new Error('Wrong password !'));
            return;
        }

        var masterKey = CryptoJS.AES.decrypt(encryptionKeychain.masterKey, pvaek.key).toString(CryptoJS.enc.Utf8);
        Session.set('masterKey', masterKey);
        Modal.hide(this.template.view);
        if (Session.get('passwordOnHold')) {
            Meteor.setTimeout(function() {
                Modal.show('showCredentialsModal', Session.get('passwordOnHold'));
                Session.set('passwordOnHold', undefined);
            }, 500);
        }
    },
    onError: function(doc) {

    }
});