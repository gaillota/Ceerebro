import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import {Notification} from '../../../startup/services/notification.service.js';

import {Credentials} from '../../../api/credentials/credentials';

import './show-credential.modal.html';

import {EncryptionService} from '../../../startup/services/encryption.service.js';

Template["show-credential.modal"].onCreated(function showCredentialCreated() {
    this.getCredentialsId = () => Session.get('showCredential');
});

Template["show-credential.modal"].helpers({
    isActive() {
        return Session.get('showCredential') && 'is-active';
    },
    credentials() {
        var credentials = Credentials.findOne(Template.instance()).getCredentialsId();
        if (!credentials) {
            Notification.error('Credentials not found');
            Session.set('showCredential', undefined);
        }

        return credentials;
    },
    plainPassword() {
        var masterKey = Session.get('masterKey');
        if (!masterKey) {
            alert('Cannot decrypt password. Master key missing.');
            return "encrypted";
        }

        return EncryptionService.decrypt(this.password, masterKey, this.iv);
    }
});