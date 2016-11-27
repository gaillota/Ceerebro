import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import {Credentials} from '../../../api/credentials/credentials';

import './show-credential.modal.html';

import {Notification} from '../../../startup/services/notification.service.js';
import {EncryptionService} from '../../../startup/services/encryption.service.js';
import {hideCredentialModal} from '../../../startup/utilities';

Template["showCredentialModal"].onCreated(function showCredentialCreated() {
    this.getCredentialId = () => Session.get('credential.modal');
});

Template["showCredentialModal"].helpers({
    isActive() {
        return Template.instance().getCredentialId() && 'is-active';
    },
    credentials() {
        const credentials = Credentials.findOne(Template.instance().getCredentialId());
        if (!credentials) {
            hideCredentialModal();
        }

        return credentials;
    },
    plainPassword() {
        const masterKey = Session.get('masterKey');
        if (!masterKey) {
            alert('Cannot decrypt password. Master key missing.');
            return "encrypted";
        }

        return EncryptionService.decrypt(this.password, masterKey, this.iv);
    }
});

Template["showCredentialModal"].events({
    'click .modal-background, click .modal-close'(event) {
        event.preventDefault();

        hideCredentialModal();
    }
});