import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { toastr } from 'meteor/chrismbeckett:toastr';
import { EncryptionService } from '../../global/services/EncryptionService.js';

import './showCredentialsModal.html';
import { Credentials } from '';

Template.showCredentialsModal.helpers({
    credentials: function() {
        var credentials = Credentials.findOne(Template.currentData());
        if (!credentials) {
            toastr.error('Credentials not found');
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