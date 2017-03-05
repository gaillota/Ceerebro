import {Meteor} from 'meteor/meteor';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Modal} from 'meteor/peppelg:bootstrap-3-modal';

import {MasterPasswordForm} from '../../../startup/common/forms/global/master-password.form';
import {EncryptionService} from '../../../startup/services';
import {
    setMasterKey,
    getCredentialsOnHold,
    setCredentialsOnHold,
    showCredentialModalFor
} from '../../../startup/utilities';

import './master-password.modal.html';

const templateName  = 'masterPasswordModal';

Template[templateName].helpers({
    modalId() {
        return templateName;
    },
    masterPasswordForm() {
        return MasterPasswordForm;
    }
});

// Template[templateName].events({
//     'click .modal-background, click .modal-close'(event) {
//         event.preventDefault();
//
//         hideMasterPasswordModal();
//     }
// });

AutoForm.addHooks('masterPasswordForm', {
    onSubmit({password}) {
        this.event.preventDefault();

        EncryptionService.decryptMasterPassword({password}, this.done);
    },
    onSuccess(formType, {masterKey}) {
        setMasterKey(masterKey);
        Modal.hide(templateName);

        if (getCredentialsOnHold()) {
            Meteor.setTimeout(() => {
                showCredentialModalFor(getCredentialsOnHold());
                setCredentialsOnHold(undefined);
            }, 500);
        }
    }
});
