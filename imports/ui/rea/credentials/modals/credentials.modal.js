import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import {Credentials} from '../../../../api/credentials/credentials';
import {EncryptionService} from '../../../../startup/services';
import {getMasterKey} from '../../../../startup/utilities';

import './credentials.modal.html';

const templateName = 'credentialsModal';

Template[templateName].onCreated(function () {
    this.getCredentialId = () => Template.currentData();
});

Template[templateName].helpers({
    credentials() {
        return Credentials.findOne(Template.instance().getCredentialId());
    },
    plainPassword() {
        return EncryptionService.decryptPassword({encryptedPassword: this.password, iv: this.iv});
    }
});
