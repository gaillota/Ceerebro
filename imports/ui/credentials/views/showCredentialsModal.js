import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';

import { NotificationService } from '../../../startup/services/notification.service.js';

import { Credentials } from '../../../api/credentials/credentials';

import './showCredentialsModal.html';

import { EncryptionService } from '../../../startup/services/encryption.service';

Template.showCredentialsModal.helpers({
    credentials() {
        var credentials = Credentials.findOne(Template.currentData());
        if (!credentials) {
            NotificationService.error('Credentials not found');
            Modal.hide(this.template.view);
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