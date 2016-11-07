import {Meteor} from 'meteor/meteor';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Session} from 'meteor/session';
import {CryptoJS} from 'meteor/jparker:crypto-core';

import './master-password.modal.html';

import {MasterPasswordForm} from '../../../startup/forms/global/MasterPasswordForm';
import {EncryptionService} from '../../../startup/services/encryption.service';

Template.masterPasswordModal.helpers({
    isActive() {
        return Session.get('master-password.modal') && 'is-active';
    },
    masterPasswordForm() {
        return MasterPasswordForm;
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
        Session.set('master-password.modal', undefined);
        if (Session.get('passwordOnHold')) {
            Meteor.setTimeout(function () {
                const toShow = Session.get('passwordOnHold');

                Session.set('showCredential', toShow);
                Session.set('passwordOnHold', undefined);
            }, 500);
        }
    }
});