import {Meteor} from 'meteor/meteor';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Session} from 'meteor/session';
import {CryptoJS} from 'meteor/jparker:crypto-core';

import {MasterPasswordForm} from '../../../startup/common/forms/global/master-password.form';
import {EncryptionService} from '../../../startup/services';
import {
    setMasterKey,
    hideMasterPasswordModal,
    showCredentialModal,
    isMasterPasswordModalVisible,
    showPasswordError,
    hidePasswordError,
    hasPasswordError
} from '../../../startup/utilities';

import './master-password.modal.html';

const templateName  = 'master-password.modal';

Template[templateName].onRendered(function masterPasswordModalRendered() {
    // Add focus on input
});

Template[templateName].helpers({
    isActive() {
        return isMasterPasswordModalVisible() && 'is-active';
    },
    masterPasswordForm() {
        return MasterPasswordForm;
    },
    hasPasswordError() {
        return hasPasswordError();
    }
});

Template[templateName].events({
    'click .modal-background, click .modal-close'(event) {
        event.preventDefault();

        hideMasterPasswordModal();
    },
    'click .js-notification-delete'() {
        hidePasswordError();
    }
});

AutoForm.addHooks('masterPasswordForm', {
    onSubmit(doc) {
        this.event.preventDefault();

        const keychain = Meteor.user().keychain;
        const pbk = EncryptionService.generatePasswordBasedKey(doc.password, keychain.salt);
        const pvaek = EncryptionService.splitKeyInHalf(pbk);

        if (keychain.passwordValidator !== pvaek.passwordValidator) {
            this.done(new Error("Surprise madafaka !"));
            showPasswordError();
            return;
        }

        const masterKey = CryptoJS.AES.decrypt(keychain.masterKey, pvaek.key).toString(CryptoJS.enc.Utf8);

        setMasterKey(masterKey);
        hideMasterPasswordModal();
        hidePasswordError();

        this.done();

        if (Session.get('passwordOnHold')) {
            Meteor.setTimeout(function () {
                const credentialId = Session.get('passwordOnHold');

                showCredentialModal(credentialId);
                Session.set('passwordOnHold', undefined);
            }, 500);
        }
    }
});
