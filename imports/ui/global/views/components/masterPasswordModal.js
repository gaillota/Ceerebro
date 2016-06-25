import { Meteor } from 'meteor/meteor';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Session } from 'meteor/session';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { CryptoJS } from 'meteor/jparker:crypto-aes';

import './masterPasswordModal.html';

import { schema as masterPasswordForm } from '../../../../startup/forms/global/MasterPasswordForm';
import { EncryptionService } from '../../../../startup/services/encryption.service';

Template.masterPasswordModal.helpers({
    masterPasswordForm() {
        return masterPasswordForm;
    }
});

AutoForm.addHooks('masterPasswordForm', {
    onSubmit(doc) {
        this.event.preventDefault();

        var keychain = Meteor.user().keychain;
        var pbk = EncryptionService.generatePasswordBasedKey(doc.password, keychain.salt);
        var pvaek = EncryptionService.splitKeyInHalf(pbk);

        if (keychain.passwordValidator !== pvaek.passwordValidator) {
            this.done(new Meteor.Error('Wrong password !'));
            return;
        }

        var masterKey = CryptoJS.AES.decrypt(keychain.masterKey, pvaek.key).toString(CryptoJS.enc.Utf8);
        Session.set('masterKey', masterKey);
        Modal.hide(this.template.view);
        if (Session.get('passwordOnHold')) {
            Meteor.setTimeout(function() {
                Modal.show('showCredentialsModal', Session.get('passwordOnHold'));
                Session.set('passwordOnHold', undefined);
            }, 500);
        }
    }
});