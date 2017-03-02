import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import {Credentials} from '../../../../api/credentials/credentials';
import {EncryptionService} from '../../../../startup/services';
import {hideCredentialModal} from '../../../../startup/utilities';

import './show-credential.modal.html';

const templateName = 'show-credentials.modal';

Template[templateName].onCreated(function showCredentialCreated() {
    this.getCredentialId = () => Session.get('credential.modal');
});

Template[templateName].helpers({
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

Template[templateName].events({
    'click .modal-background, click .modal-close'(event) {
        event.preventDefault();

        hideCredentialModal();
    }
});
