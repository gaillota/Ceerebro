import { Meteor } from 'meteor/meteor';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Session } from 'meteor/session';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { CryptoJS } from 'meteor/jparker:crypto-aes';

import './masterPasswordModal.html';

import { EncryptionService } from '../../services/EncryptionService.js';

AutoForm.addHooks('masterPasswordForm', {
    onSubmit: function(doc) {
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

//Template.showCredentialsModal.hooks({
//    rendered: function() {
//
//    }
//});